import * as bcrypt from 'bcryptjs';
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

const passions = [
  { key: 'mecanique', label: 'Mécanique', icon: '🔧' },
  { key: 'dessin', label: 'Dessin', icon: '🎨' },
  { key: 'musique', label: 'Musique', icon: '🎸' },
  { key: 'skate', label: 'Skate', icon: '🛹' },
];

const skills = [
  { key: 'thales', label: 'Théorème de Thalès', subject: 'Mathématiques' },
  { key: 'ondes', label: 'Fréquence et ondes', subject: 'Physique' },
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

async function seed() {
  await AppDataSource.initialize();

  const passionRepo = AppDataSource.getRepository(PassionOrmEntity);
  const skillRepo = AppDataSource.getRepository(SkillOrmEntity);
  const badgeRepo = AppDataSource.getRepository(BadgeOrmEntity);
  const challengeRepo = AppDataSource.getRepository(ChallengeOrmEntity);
  const userRepo = AppDataSource.getRepository(UserOrmEntity);

  const savedPassions = await Promise.all(
    passions.map((p) => passionRepo.save(passionRepo.create(p))),
  );
  const savedSkills = await Promise.all(
    skills.map((s) => skillRepo.save(skillRepo.create(s))),
  );
  await Promise.all(badges.map((b) => badgeRepo.save(badgeRepo.create(b))));

  const skate = savedPassions.find((p) => p.key === 'skate')!;
  const musique = savedPassions.find((p) => p.key === 'musique')!;
  const thales = savedSkills.find((s) => s.key === 'thales')!;
  const ondes = savedSkills.find((s) => s.key === 'ondes')!;

  await challengeRepo.save(
    challengeRepo.create({
      title: "L'Héritage de Khéops",
      description:
        "Mesure la hauteur d'un obstacle de ton skatepark en appliquant le théorème de Thalès, comme les bâtisseurs égyptiens.",
      schoolLevel: SchoolLevel.TROISIEME,
      durationMinutes: 45,
      xpReward: 150,
      passion: skate,
      skill: thales,
      narrativeIntro:
        "Il y a 4500 ans, les bâtisseurs de la pyramide de Khéops n'avaient ni laser ni drone. Pour connaître la hauteur d'un monument, ils comparaient l'ombre portée d'un bâton planté verticalement à celle de l'édifice. Aujourd'hui, c'est à toi de reproduire cette technique sur un obstacle de ton skatepark.",
      theoryExplanation:
        "Le théorème de Thalès dit que deux triangles formés par un objet et son ombre, au même moment de la journée, sont semblables : le rapport entre la hauteur et la longueur d'ombre est constant. En mesurant la hauteur d'un bâton de référence et son ombre, tu peux en déduire la hauteur d'un obstacle à partir de la longueur de son ombre.",
      calculatorSchema: {
        formula: THALES_SHADOW_RATIO_FORMULA,
        resultLabel: "Hauteur estimée de l'obstacle",
        fields: [
          {
            key: 'stickHeightM',
            label: 'Hauteur du bâton',
            unit: 'm',
            min: 0.1,
            max: 3,
          },
          {
            key: 'stickShadowM',
            label: "Longueur de l'ombre du bâton",
            unit: 'm',
            min: 0.05,
            max: 10,
          },
          {
            key: 'targetShadowM',
            label: "Longueur de l'ombre de l'obstacle",
            unit: 'm',
            min: 0.05,
            max: 30,
          },
        ],
      },
    }),
  );

  await challengeRepo.save(
    challengeRepo.create({
      title: 'Fréquence & Ondes',
      description:
        'Analyse la fréquence des cordes de ta guitare pour comprendre la propagation des ondes sonores.',
      schoolLevel: SchoolLevel.SECONDE,
      durationMinutes: 30,
      xpReward: 100,
      passion: musique,
      skill: ondes,
      narrativeIntro:
        "Chaque corde de guitare vibre à une fréquence précise qui détermine la note que tu entends. Avant les accordeurs électroniques, les musiciens réglaient leurs instruments à l'oreille en comparant des fréquences entre elles.",
      theoryExplanation:
        "La fréquence d'une onde sonore correspond au nombre d'oscillations par seconde, mesurée en Hertz (Hz). Plus la fréquence est élevée, plus le son est aigu.",
      calculatorSchema: {
        formula: 'wave-frequency-comparison',
        resultLabel: 'Écart de fréquence (Hz)',
        fields: [
          {
            key: 'referenceFrequencyHz',
            label: 'Fréquence de référence',
            unit: 'Hz',
            min: 20,
            max: 2000,
          },
          {
            key: 'measuredFrequencyHz',
            label: 'Fréquence mesurée',
            unit: 'Hz',
            min: 20,
            max: 2000,
          },
        ],
      },
    }),
  );

  const demoExists = await userRepo.findOne({ where: { id: DEMO_USER_ID } });
  if (!demoExists) {
    const demoPasswordHash = await bcrypt.hash(
      'demo-no-login-account',
      10,
    );
    await userRepo.save(
      userRepo.create({
        id: DEMO_USER_ID,
        email: DEMO_USER_EMAIL,
        passwordHash: demoPasswordHash,
        firstName: 'Invité',
        schoolLevel: SchoolLevel.TROISIEME,
        passions: [skate],
        xpPoints: 0,
      }),
    );
  }

  await AppDataSource.destroy();
  console.log('Seed terminé.');
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
