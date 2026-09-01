import { AppDataSource } from '../data-source.js';
import {
  PassionOrmEntity,
  SkillOrmEntity,
  ChallengeOrmEntity,
  BadgeOrmEntity,
} from '../orm-entities/index.js';
import { SchoolLevel } from '../../../domain/entities/school-level.js';

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
      passion: skate,
      skill: thales,
    }),
  );

  await challengeRepo.save(
    challengeRepo.create({
      title: 'Fréquence & Ondes',
      description:
        'Analyse la fréquence des cordes de ta guitare pour comprendre la propagation des ondes sonores.',
      schoolLevel: SchoolLevel.SECONDE,
      durationMinutes: 30,
      passion: musique,
      skill: ondes,
    }),
  );

  await AppDataSource.destroy();
  console.log('Seed terminé.');
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
