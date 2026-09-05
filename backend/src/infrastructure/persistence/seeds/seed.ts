import * as bcrypt from 'bcryptjs';
import type {
  DeepPartial,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
} from 'typeorm';
import { AppDataSource } from '../data-source.js';
import {
  PassionOrmEntity,
  SkillOrmEntity,
  ChallengeOrmEntity,
  BadgeOrmEntity,
  UserOrmEntity,
} from '../orm-entities/index.js';
import { SchoolLevel } from '../../../domain/entities/school-level.js';
import { THALES_SHADOW_RATIO_FORMULA } from '../../../domain/entities/calculator-schema.js';
import {
  DEMO_USER_ID,
  DEMO_USER_EMAIL,
} from '../../auth/demo-user.constant.js';
import {
  HISTORY_OF_SCIENCE_MISSIONS,
  type MissionSubject,
} from './history-of-science-missions.data.js';

/**
 * Insère la ligne si aucune n'existe déjà pour la clé unique donnée, sinon
 * met à jour ses champs. Rend le seed rejouable (`npm run seed` idempotent).
 */
async function upsert<T extends ObjectLiteral>(
  repo: Repository<T>,
  match: FindOptionsWhere<T>,
  data: DeepPartial<T>,
): Promise<T> {
  const existing = await repo.findOne({ where: match });
  if (existing) {
    repo.merge(existing, data);
    return repo.save(existing);
  }
  return repo.save(
    repo.create({ ...match, ...data } as DeepPartial<T>),
  );
}

const passions = [
  { key: 'mecanique', label: 'Mécanique', icon: '🔧' },
  { key: 'dessin', label: 'Dessin', icon: '🎨' },
  { key: 'musique', label: 'Musique', icon: '🎸' },
  { key: 'skate', label: 'Skate', icon: '🛹' },
  { key: 'histoire-sciences', label: 'Histoire des sciences', icon: '🔭' },
];

const skills = [
  { key: 'thales', label: 'Théorème de Thalès', subject: 'Mathématiques' },
  { key: 'ondes', label: 'Fréquence et ondes', subject: 'Physique' },
  { key: 'sciences-maths', label: 'Mathématiques — du problème historique à la notion', subject: 'Mathématiques' },
  { key: 'sciences-physique', label: 'Physique — du problème historique à la notion', subject: 'Physique' },
  { key: 'sciences-chimie', label: 'Chimie — du problème historique à la notion', subject: 'Chimie' },
  { key: 'sciences-svt', label: 'SVT — du problème historique à la notion', subject: 'SVT' },
];

const badges = [
  {
    key: 'scribe-kheops',
    label: 'Scribe de Khéops',
    description: 'A validé sa première mission de géométrie sur le terrain.',
    iconUrl: '/badges/scribe-kheops.png',
  },
  {
    key: 'chef-atelier',
    label: "Chef d'atelier",
    description: 'A validé 5 missions liées à la mécanique.',
    iconUrl: '/badges/chef-atelier.png',
  },
];

const SUBJECT_SKILL_KEY: Record<MissionSubject, string> = {
  Mathématiques: 'sciences-maths',
  Physique: 'sciences-physique',
  Chimie: 'sciences-chimie',
  SVT: 'sciences-svt',
};

const XP_BY_LEVEL: Record<string, number> = {
  [SchoolLevel.SIXIEME]: 80,
  [SchoolLevel.CINQUIEME]: 100,
  [SchoolLevel.QUATRIEME]: 120,
  [SchoolLevel.TROISIEME]: 150,
};

async function seed() {
  await AppDataSource.initialize();

  const passionRepo = AppDataSource.getRepository(PassionOrmEntity);
  const skillRepo = AppDataSource.getRepository(SkillOrmEntity);
  const badgeRepo = AppDataSource.getRepository(BadgeOrmEntity);
  const challengeRepo = AppDataSource.getRepository(ChallengeOrmEntity);
  const userRepo = AppDataSource.getRepository(UserOrmEntity);

  for (const passion of passions) {
    await upsert(passionRepo, { key: passion.key }, passion);
  }
  for (const skill of skills) {
    await upsert(skillRepo, { key: skill.key }, skill);
  }
  for (const badge of badges) {
    await upsert(badgeRepo, { key: badge.key }, badge);
  }

  const skateP = await passionRepo.findOneByOrFail({ key: 'skate' });
  const musiqueP = await passionRepo.findOneByOrFail({ key: 'musique' });
  const historyP = await passionRepo.findOneByOrFail({
    key: 'histoire-sciences',
  });
  const thalesSkill = await skillRepo.findOneByOrFail({ key: 'thales' });
  const ondesSkill = await skillRepo.findOneByOrFail({ key: 'ondes' });

  await upsert(
    challengeRepo,
    { title: "L'Héritage de Khéops" },
    {
      description:
        "Mesure la hauteur d'un obstacle de ton skatepark en appliquant le théorème de Thalès, comme les bâtisseurs égyptiens.",
      schoolLevel: SchoolLevel.TROISIEME,
      durationMinutes: 45,
      xpReward: 150,
      passion: skateP,
      skill: thalesSkill,
      narrativeIntro:
        "Il y a 4500 ans, les bâtisseurs de la pyramide de Khéops n'avaient ni laser ni drone. Pour connaître la hauteur d'un monument, ils comparaient l'ombre portée d'un bâton planté verticalement à celle de l'édifice. Aujourd'hui, c'est à toi de reproduire cette technique sur un obstacle de ton skatepark.",
      theoryExplanation:
        "Le théorème de Thalès dit que deux triangles formés par un objet et son ombre, au même moment de la journée, sont semblables : le rapport entre la hauteur et la longueur d'ombre est constant. En mesurant la hauteur d'un bâton de référence et son ombre, tu peux en déduire la hauteur d'un obstacle à partir de la longueur de son ombre.",
      calculatorSchema: {
        formula: THALES_SHADOW_RATIO_FORMULA,
        resultLabel: "Hauteur estimée de l'obstacle",
        fields: [
          { key: 'stickHeightM', label: 'Hauteur du bâton', unit: 'm', min: 0.1, max: 3 },
          { key: 'stickShadowM', label: "Longueur de l'ombre du bâton", unit: 'm', min: 0.05, max: 10 },
          { key: 'targetShadowM', label: "Longueur de l'ombre de l'obstacle", unit: 'm', min: 0.05, max: 30 },
        ],
      },
    },
  );

  await upsert(
    challengeRepo,
    { title: 'Fréquence & Ondes' },
    {
      description:
        'Analyse la fréquence des cordes de ta guitare pour comprendre la propagation des ondes sonores.',
      schoolLevel: SchoolLevel.SECONDE,
      durationMinutes: 30,
      xpReward: 100,
      passion: musiqueP,
      skill: ondesSkill,
      narrativeIntro:
        "Chaque corde de guitare vibre à une fréquence précise qui détermine la note que tu entends. Avant les accordeurs électroniques, les musiciens réglaient leurs instruments à l'oreille en comparant des fréquences entre elles.",
      theoryExplanation:
        "La fréquence d'une onde sonore correspond au nombre d'oscillations par seconde, mesurée en Hertz (Hz). Plus la fréquence est élevée, plus le son est aigu.",
      calculatorSchema: {
        formula: 'wave-frequency-comparison',
        resultLabel: 'Écart de fréquence (Hz)',
        fields: [
          { key: 'referenceFrequencyHz', label: 'Fréquence de référence', unit: 'Hz', min: 20, max: 2000 },
          { key: 'measuredFrequencyHz', label: 'Fréquence mesurée', unit: 'Hz', min: 20, max: 2000 },
        ],
      },
    },
  );

  const subjectSkills = new Map<MissionSubject, SkillOrmEntity>();
  for (const [subject, key] of Object.entries(SUBJECT_SKILL_KEY) as [
    MissionSubject,
    string,
  ][]) {
    subjectSkills.set(subject, await skillRepo.findOneByOrFail({ key }));
  }

  for (const mission of HISTORY_OF_SCIENCE_MISSIONS) {
    await upsert(
      challengeRepo,
      { title: mission.title },
      {
        description: mission.theoryExplanation,
        schoolLevel: mission.level,
        durationMinutes: mission.durationMinutes,
        xpReward: XP_BY_LEVEL[mission.level] ?? 100,
        passion: historyP,
        skill: subjectSkills.get(mission.subject)!,
        narrativeIntro: mission.narrativeIntro,
        theoryExplanation: mission.theoryExplanation,
        calculatorSchema: mission.calculatorSchema,
        notionKey: mission.notionKey,
        guidedExperiment: mission.guidedExperiment,
        autonomousChallenge: mission.autonomousChallenge,
      },
    );
  }

  const demoExists = await userRepo.findOne({ where: { id: DEMO_USER_ID } });
  if (!demoExists) {
    const demoPasswordHash = await bcrypt.hash('demo-no-login-account', 10);
    await userRepo.save(
      userRepo.create({
        id: DEMO_USER_ID,
        email: DEMO_USER_EMAIL,
        passwordHash: demoPasswordHash,
        firstName: 'Invité',
        schoolLevel: SchoolLevel.TROISIEME,
        passions: [skateP],
        xpPoints: 0,
      }),
    );
  }

  await AppDataSource.destroy();
  console.log(
    `Seed terminé : ${HISTORY_OF_SCIENCE_MISSIONS.length + 2} missions.`,
  );
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
