import { SchoolLevel } from '../../../domain/entities/school-level.js';
import type {
  CalculatorField,
  CalculatorSchema,
} from '../../../domain/entities/calculator-schema.js';
import type {
  GuidedExperiment,
  AutonomousChallenge,
} from '../../../domain/entities/challenge.js';

export type MissionSubject =
  | 'Mathématiques'
  | 'Physique'
  | 'Chimie'
  | 'SVT';

/** Parcours expérimental d'une mission pilote (nouveau format guidé + défi). */
export interface MissionExperiment {
  notionKey: string;
  guidedExperiment: GuidedExperiment;
  autonomousChallenge: AutonomousChallenge;
}

export interface HistoryOfScienceMission {
  /** Code de l'issue d'origine, ex. "1.1". */
  code: string;
  subject: MissionSubject;
  level: SchoolLevel;
  title: string;
  durationMinutes: number;
  narrativeIntro: string;
  theoryExplanation: string;
  calculatorSchema: CalculatorSchema;
  notionKey: string | null;
  guidedExperiment: GuidedExperiment | null;
  autonomousChallenge: AutonomousChallenge | null;
}

/**
 * Métadonnées de chaque grandeur mesurable, partagées par toutes les missions.
 * La clé correspond à celle attendue par le calculateur côté application mobile
 * (`mobile/src/application/calculators/*`).
 */
const FIELD_META: Record<string, Omit<CalculatorField, 'key'>> = {
  // Mathématiques
  perimeterM: { label: 'Périmètre mesuré', unit: 'm', min: 0.05, max: 60 },
  diameterM: { label: 'Diamètre', unit: 'm', min: 0.01, max: 20 },
  lengthM: { label: 'Longueur', unit: 'm', min: 0.1, max: 50 },
  widthM: { label: 'Largeur', unit: 'm', min: 0.1, max: 50 },
  referenceInput: { label: 'Référence : entrée', unit: '', min: 0.01, max: 100000 },
  referenceOutput: { label: 'Référence : sortie', unit: '', min: 0, max: 100000 },
  targetInput: { label: 'Valeur cible : entrée', unit: '', min: 0.01, max: 100000 },
  dividend: { label: 'Dividende', unit: '', min: 0, max: 1000000000000 },
  divisor: { label: 'Diviseur', unit: '', min: 1, max: 1000000000 },
  pointDistanceToAxisM: { label: "Distance du point à l'axe", unit: 'm', min: 0, max: 20 },
  imageDistanceToAxisM: { label: "Distance de l'image à l'axe", unit: 'm', min: 0, max: 20 },
  radiusM: { label: 'Rayon', unit: 'm', min: 0.01, max: 30 },
  credits: { label: 'Total des crédits (fortunes)', unit: '', min: 0, max: 1000000000 },
  debits: { label: 'Total des débits (dettes)', unit: '', min: 0, max: 1000000000 },
  a: { label: 'Premier nombre', unit: '', min: 1, max: 100000 },
  b: { label: 'Second nombre', unit: '', min: 1, max: 100000 },
  shadowAngleDeg: { label: "Écart d'angle d'ombre entre les deux villes", unit: '°', min: 0.1, max: 90 },
  distanceKm: { label: 'Distance entre les deux villes', unit: 'km', min: 1, max: 20000 },
  x1: { label: 'Abscisse du point A', unit: '', min: -1000, max: 1000 },
  y1: { label: 'Ordonnée du point A', unit: '', min: -1000, max: 1000 },
  x2: { label: 'Abscisse du point B', unit: '', min: -1000, max: 1000 },
  y2: { label: 'Ordonnée du point B', unit: '', min: -1000, max: 1000 },
  legAM: { label: "Premier côté de l'angle droit", unit: 'm', min: 0.01, max: 50 },
  legBM: { label: "Second côté de l'angle droit", unit: 'm', min: 0.01, max: 50 },
  stickHeightM: { label: 'Hauteur du bâton', unit: 'm', min: 0.1, max: 3 },
  stickShadowM: { label: "Longueur de l'ombre du bâton", unit: 'm', min: 0.05, max: 10 },
  targetShadowM: { label: "Longueur de l'ombre de l'objet", unit: 'm', min: 0.05, max: 60 },
  containerVolumeCm3: { label: 'Volume du récipient', unit: 'cm³', min: 1, max: 10000000 },
  grainsPerCm3: { label: 'Nombre de grains par cm³', unit: '', min: 1, max: 10000000 },
  sideM: { label: 'Côté du carré', unit: 'm', min: 0.01, max: 30 },
  distanceM: { label: 'Distance', unit: 'm', min: 0.1, max: 5000 },
  elevationAngleDeg: { label: "Angle d'élévation visé", unit: '°', min: 0.1, max: 89.9 },
  eyeHeightM: { label: 'Hauteur des yeux au-dessus du sol', unit: 'm', min: 0, max: 2.5 },
  timeS: { label: 'Durée', unit: 's', min: 0.01, max: 3600 },
  baseM: { label: 'Longueur de la base mesurée', unit: 'm', min: 0.5, max: 500 },
  angleADeg: { label: 'Angle visé depuis A', unit: '°', min: 0.1, max: 179 },
  angleBDeg: { label: 'Angle visé depuis B', unit: '°', min: 0.1, max: 179 },
  favorableOutcomes: { label: 'Nombre de cas favorables', unit: '', min: 0, max: 100000 },
  totalOutcomes: { label: 'Nombre de cas possibles', unit: '', min: 1, max: 100000 },

  // Physique
  objectVelocityMs: { label: "Vitesse de l'objet", unit: 'm/s', min: -200, max: 200 },
  observerVelocityMs: { label: "Vitesse de l'observateur", unit: 'm/s', min: -200, max: 200 },
  massKg: { label: 'Masse', unit: 'kg', min: 0.01, max: 1000 },
  gravityNPerKg: { label: 'Intensité de la pesanteur du lieu', unit: 'N/kg', min: 0.1, max: 30 },
  massG: { label: 'Masse', unit: 'g', min: 0.1, max: 100000 },
  displacedVolumeCm3: { label: "Volume d'eau déplacé", unit: 'cm³', min: 0.1, max: 100000 },
  realValueKm: { label: 'Grandeur réelle', unit: 'km', min: 0.1, max: 10000000000 },
  kmPerCm: { label: 'Km représentés par 1 cm de maquette', unit: 'km/cm', min: 0.001, max: 1000000000 },
  gnomonHeightM: { label: 'Hauteur du gnomon', unit: 'm', min: 0.05, max: 3 },
  shadowLengthM: { label: "Longueur de l'ombre", unit: 'm', min: 0.01, max: 50 },
  objectSizeM: { label: "Taille de l'objet", unit: 'm', min: 0.01, max: 100 },
  objectDistanceM: { label: "Distance de l'objet", unit: 'm', min: 0.1, max: 5000 },
  boxDepthM: { label: 'Profondeur de la chambre noire', unit: 'm', min: 0.02, max: 2 },
  phaseAngleDeg: { label: 'Angle de phase Soleil-Lune', unit: '°', min: 0, max: 360 },
  cellCount: { label: "Nombre d'éléments empilés", unit: '', min: 1, max: 100 },
  voltagePerCellV: { label: 'Tension par élément', unit: 'V', min: 0.01, max: 5 },
  branchCurrent1A: { label: 'Intensité de la branche 1', unit: 'A', min: 0, max: 20 },
  branchCurrent2A: { label: 'Intensité de la branche 2', unit: 'A', min: 0, max: 20 },
  voltageV: { label: 'Tension mesurée', unit: 'V', min: 0, max: 400 },
  currentA: { label: 'Intensité mesurée', unit: 'A', min: 0.0001, max: 50 },
  lineSpacingNm: { label: 'Pas du réseau', unit: 'nm', min: 100, max: 10000 },
  diffractionAngleDeg: { label: 'Angle de diffraction de la couleur', unit: '°', min: 0.1, max: 89.9 },
  order: { label: 'Ordre de diffraction', unit: '', min: 1, max: 5 },
  objectiveFocalMm: { label: "Distance focale de l'objectif", unit: 'mm', min: 1, max: 5000 },
  eyepieceFocalMm: { label: "Distance focale de l'oculaire", unit: 'mm', min: 1, max: 500 },
  speedMs: { label: 'Vitesse de propagation', unit: 'm/s', min: 1, max: 300000000 },
  forceXN: { label: 'Force horizontale', unit: 'N', min: -1000, max: 1000 },
  forceYN: { label: 'Force verticale', unit: 'N', min: -1000, max: 1000 },

  // Chimie
  mass1G: { label: "Masse d'eau n°1", unit: 'g', min: 1, max: 100000 },
  temp1C: { label: "Température de l'eau n°1", unit: '°C', min: -20, max: 120 },
  mass2G: { label: "Masse d'eau n°2", unit: 'g', min: 1, max: 100000 },
  temp2C: { label: "Température de l'eau n°2", unit: '°C', min: -20, max: 120 },
  residueMassMg: { label: 'Masse du résidu sec', unit: 'mg', min: 0, max: 100000 },
  sampleVolumeL: { label: "Volume d'eau évaporé", unit: 'L', min: 0.001, max: 100 },
  distillateVolumeMl: { label: 'Volume de distillat recueilli', unit: 'mL', min: 0, max: 100000 },
  initialVolumeMl: { label: 'Volume initial', unit: 'mL', min: 0.1, max: 100000 },
  soluteMassG: { label: 'Masse de soluté', unit: 'g', min: 0, max: 100000 },
  solventMassG: { label: 'Masse de solvant', unit: 'g', min: 0.1, max: 100000 },
  soluteMigrationMm: { label: 'Migration du constituant', unit: 'mm', min: 0, max: 1000 },
  solventFrontMm: { label: 'Distance parcourue par le solvant', unit: 'mm', min: 0.1, max: 1000 },
  reactantsMassG: { label: 'Masse totale des réactifs', unit: 'g', min: 0, max: 100000 },
  productsMassG: { label: 'Masse totale des produits', unit: 'g', min: 0, max: 100000 },
  waterRiseMl: { label: "Montée d'eau dans le bocal", unit: 'mL', min: 0, max: 100000 },
  initialAirMl: { label: "Volume d'air initial", unit: 'mL', min: 0.1, max: 100000 },
  volumeAMl: { label: 'Volume du liquide A', unit: 'mL', min: 0.1, max: 100000 },
  volumeBMl: { label: 'Volume du liquide B', unit: 'mL', min: 0.1, max: 100000 },
  mixedVolumeMl: { label: 'Volume du mélange', unit: 'mL', min: 0.1, max: 200000 },
  referenceVolumeMl: { label: 'Volume du bocal de référence', unit: 'mL', min: 1, max: 100000 },
  referenceTimeS: { label: 'Durée de combustion de référence', unit: 's', min: 0.1, max: 100000 },
  targetVolumeMl: { label: 'Volume du bocal étudié', unit: 'mL', min: 1, max: 100000 },
  reactant1MassG: { label: 'Masse du réactif 1', unit: 'g', min: 0, max: 100000 },
  reactant2MassG: { label: 'Masse du réactif 2', unit: 'g', min: 0, max: 100000 },
  hydrogenVolumeMl: { label: 'Volume de dihydrogène', unit: 'mL', min: 0.1, max: 100000 },
  oxygenVolumeMl: { label: 'Volume de dioxygène', unit: 'mL', min: 0.1, max: 100000 },
  initialMassG: { label: 'Masse initiale', unit: 'g', min: 0.1, max: 100000 },
  finalMassG: { label: 'Masse finale', unit: 'g', min: 0, max: 100000 },
  initialPh: { label: 'pH initial de la solution', unit: '', min: 0, max: 6.9 },
  dilutionFactor: { label: 'Facteur de dilution', unit: '', min: 1, max: 1000000 },
  solutionCurrentMa: { label: 'Intensité avec la solution testée', unit: 'mA', min: 0, max: 100000 },
  referenceCurrentMa: { label: "Intensité avec l'eau de référence", unit: 'mA', min: 0.001, max: 100000 },

  // SVT
  fieldOfViewUm: { label: 'Diamètre du champ observé', unit: 'µm', min: 1, max: 10000 },
  cellsAcrossField: { label: 'Nombre de cellules en travers du champ', unit: '', min: 1, max: 500 },
  sharedTraits: { label: 'Nombre d’attributs communs', unit: '', min: 0, max: 100 },
  observedTraits: { label: 'Nombre d’attributs observés', unit: '', min: 1, max: 100 },
  depthCm: { label: 'Profondeur de la strate', unit: 'cm', min: 0, max: 100000 },
  sedimentationRateCmPerCentury: { label: 'Vitesse de sédimentation', unit: 'cm/siècle', min: 0.01, max: 1000 },
  fossilMeasureMm: { label: 'Mesure sur le fossile', unit: 'mm', min: 0.1, max: 100000 },
  livingMeasureMm: { label: 'Mesure sur la forme actuelle', unit: 'mm', min: 0.1, max: 100000 },
  initialPlantMassG: { label: 'Masse initiale du plant', unit: 'g', min: 0.1, max: 100000 },
  finalPlantMassG: { label: 'Masse finale du plant', unit: 'g', min: 0.1, max: 10000000 },
  sinkingMm: { label: "Enfoncement de la dalle témoin", unit: 'mm', min: 0, max: 1000 },
  durationDays: { label: 'Durée du suivi', unit: 'jours', min: 1, max: 4000 },
  finalHeightMm: { label: 'Hauteur finale de la pâte', unit: 'mm', min: 1, max: 1000 },
  initialHeightMm: { label: 'Hauteur initiale de la pâte', unit: 'mm', min: 1, max: 1000 },
  sMinusPSeconds: { label: "Écart d'arrivée des ondes S et P", unit: 's', min: 0.1, max: 600 },
  flowDistanceM: { label: 'Distance parcourue par le front de coulée', unit: 'm', min: 0.01, max: 100000 },
  durationS: { label: 'Durée', unit: 's', min: 0.1, max: 100000 },
  breathVolumeMl: { label: "Volume d'un souffle", unit: 'mL', min: 50, max: 6000 },
  breathsPerMinute: { label: 'Nombre de respirations par minute', unit: '', min: 4, max: 80 },
  transformedFraction: { label: "Fraction d'amidon transformée", unit: '', min: 0, max: 1 },
  durationMin: { label: 'Durée', unit: 'min', min: 0.1, max: 240 },
  cases: { label: 'Nombre de malades parmi les exposés', unit: '', min: 0, max: 100000 },
  exposed: { label: 'Nombre total de personnes exposées', unit: '', min: 1, max: 100000 },
  bubbleCount: { label: 'Nombre de bulles comptées', unit: '', min: 0, max: 100000 },
  durationMinutes: { label: 'Durée du comptage', unit: 'min', min: 0.1, max: 240 },
  dominantCount: { label: 'Individus à caractère dominant', unit: '', min: 0, max: 100000 },
  recessiveCount: { label: 'Individus à caractère récessif', unit: '', min: 1, max: 100000 },
  strokeVolumeMl: { label: 'Volume de sang chassé par battement', unit: 'mL', min: 10, max: 250 },
  heartRateBpm: { label: 'Fréquence cardiaque', unit: 'bpm', min: 30, max: 220 },
  co2JarTempC: { label: 'Température du bocal enrichi en CO₂', unit: '°C', min: -20, max: 120 },
  airJarTempC: { label: "Température du bocal d'air ordinaire", unit: '°C', min: -20, max: 120 },
  rateCmPerYear: { label: 'Vitesse de déplacement de la plaque', unit: 'cm/an', min: 0, max: 30 },
  years: { label: 'Durée écoulée', unit: 'ans', min: 0, max: 1000000000 },
  controlAttackRate: { label: "Taux d'attaque du lot témoin", unit: '', min: 0.0001, max: 1 },
  vaccinatedAttackRate: { label: "Taux d'attaque du lot vacciné", unit: '', min: 0, max: 1 },
  waterMassG: { label: "Masse d'eau chauffée", unit: 'g', min: 1, max: 100000 },
  temperatureRiseC: { label: "Élévation de température de l'eau", unit: '°C', min: 0.1, max: 100 },
  waterVolumeMl: { label: "Volume d'eau versé", unit: 'mL', min: 1, max: 100000 },
  infiltrationTimeS: { label: "Temps d'infiltration complète", unit: 's', min: 0.1, max: 100000 },
  fruitCount: { label: 'Fleurs ayant donné un fruit', unit: '', min: 0, max: 100000 },
  flowerCount: { label: 'Nombre de fleurs suivies', unit: '', min: 1, max: 100000 },
};

function fieldOf(key: string): CalculatorField {
  const meta = FIELD_META[key];
  if (!meta) {
    throw new Error(`Grandeur inconnue dans le schéma de calcul : ${key}`);
  }
  return { key, ...meta };
}

const DURATION_BY_LEVEL: Record<string, number> = {
  [SchoolLevel.SIXIEME]: 30,
  [SchoolLevel.CINQUIEME]: 35,
  [SchoolLevel.QUATRIEME]: 40,
  [SchoolLevel.TROISIEME]: 45,
};

function m(
  code: string,
  subject: MissionSubject,
  level: SchoolLevel,
  title: string,
  narrativeIntro: string,
  theoryExplanation: string,
  formula: string,
  resultLabel: string,
  fieldKeys: string[],
  experiment?: MissionExperiment,
): HistoryOfScienceMission {
  return {
    code,
    subject,
    level,
    title,
    durationMinutes: DURATION_BY_LEVEL[level] ?? 40,
    narrativeIntro,
    theoryExplanation,
    calculatorSchema: {
      formula,
      resultLabel,
      fields: fieldKeys.map(fieldOf),
    },
    notionKey: experiment?.notionKey ?? null,
    guidedExperiment: experiment?.guidedExperiment ?? null,
    autonomousChallenge: experiment?.autonomousChallenge ?? null,
  };
}

const S6 = SchoolLevel.SIXIEME;
const S5 = SchoolLevel.CINQUIEME;
const S4 = SchoolLevel.QUATRIEME;
const S3 = SchoolLevel.TROISIEME;

// ---------------------------------------------------------------------------
// Parcours expérimentaux des missions PILOTES (une par matière).
// Chaque notionKey est associé, côté application mobile, à un validateur
// d'expérience spécifique (forme et fond).
// ---------------------------------------------------------------------------

const PILOT_PI_CIRCLE: MissionExperiment = {
  notionKey: 'pi-circle-ratio',
  guidedExperiment: {
    title: 'Expérience guidée — faire rouler pour retrouver π',
    goal: "Montrer que, pour n'importe quel disque, le périmètre divisé par le diamètre donne toujours le même nombre.",
    materials: [
      '3 objets ronds de tailles très différentes (couvercle, assiette, roue…)',
      'Une ficelle non élastique et un mètre ruban',
      'Une craie, un sol plat',
    ],
    schema: [
      "  depart                 1 tour complet",
      "    |__________________________|",
      "  o============================>   <- on deroule le bord sur la craie",
      "  (bord de l'objet)      P = distance parcourue",
      "",
      "   .-''-.",
      "  ( D--- )   D = plus grande largeur, en passant par le centre",
      "   `-..-'",
    ].join('\n'),
    steps: [
      {
        instruction:
          "Marque un point sur le bord de l'objet. Pose ce point sur une ligne à la craie, puis fais rouler l'objet d'un tour complet jusqu'à ce que le point revienne au sol.",
        question:
          'La distance parcourue est-elle plus grande ou plus petite que le tour que tu imaginais ?',
      },
      {
        instruction:
          'Mesure cette distance : c\'est le périmètre P de l\'objet.',
        question: "As-tu bien mesuré sur UN seul tour, ni plus ni moins ?",
      },
      {
        instruction:
          "Mesure le diamètre D de l'objet : sa plus grande largeur, en passant par le centre.",
        question: 'Ta règle passe-t-elle bien par le milieu du disque ?',
      },
      {
        instruction:
          "Recommence pour les 2 autres objets, puis calcule P ÷ D pour chacun.",
        question:
          "Les trois résultats sont-ils proches les uns des autres ? De combien s'écartent-ils de 3 ?",
      },
    ],
    measures: [
      'Objet 1 : P et D (en cm)',
      'Objet 2 : P et D (en cm)',
      'Objet 3 : P et D (en cm)',
    ],
    interpretation:
      "Quelle que soit la taille, P ÷ D tombe toujours autour de 3,14. Ce nombre constant est π : le périmètre est proportionnel au diamètre, comme Archimède l'a démontré.",
  },
  autonomousChallenge: {
    title: 'Défi en autonomie — la mare infranchissable',
    brief:
      "Dans la cour, un cercle de 4 m de rayon est tracé au sol : impossible d'entrer dedans. Sans marcher à l'intérieur, prévois la longueur de grillage nécessaire pour l'entourer, puis vérifie en déroulant une ficelle sur le tracé.",
    schema: [
      '        _____',
      '      /       \\',
      '     |    x----|  R = 4 m (mesure du centre au bord)',
      '      \\ _____ /',
      '   grillage = tout le tour du cercle',
    ].join('\n'),
    successCriteria:
      "Ta prévision et la mesure à la ficelle diffèrent de moins de 5 %.",
  },
};

const PILOT_DENSITY: MissionExperiment = {
  notionKey: 'density-floats',
  guidedExperiment: {
    title: 'Expérience guidée — prévoir avant de lâcher dans l\'eau',
    goal:
      "Prévoir si un objet flotte ou coule à partir de sa masse volumique, puis vérifier.",
    materials: [
      'Une balance, un verre gradué transparent',
      '4 petits objets : cube de bois, cube de plastique, galet, boule de pâte à modeler',
      'De l\'eau, un fil fin',
    ],
    schema: [
      '   balance          verre gradue',
      '   [====]           |~~~~~~|  <- niveau apres immersion',
      '    || m             |      |  <- niveau avant',
      '                     |__o___|   volume deplace = niveau apres - avant',
      '',
      '   masse volumique  rho = m / V',
      '   rho < 1 (eau) -> flotte      rho > 1 -> coule',
    ].join('\n'),
    steps: [
      {
        instruction: "Pèse un objet : note sa masse m (en g).",
        question: 'La balance est-elle bien à zéro avant de poser l\'objet ?',
      },
      {
        instruction:
          "Plonge l'objet entièrement dans le verre gradué au bout du fil. Relève la montée d'eau : c'est le volume déplacé V (en cm³, 1 mL = 1 cm³).",
        question: "L'objet est-il totalement sous l'eau, sans toucher le fond ?",
      },
      {
        instruction:
          'Calcule la masse volumique ρ = m ÷ V. Compare-la à celle de l\'eau (1 g/cm³) et prévois : flotte ou coule ?',
        question: 'Si ρ est plus petit que 1, que va faire l\'objet ?',
      },
      {
        instruction:
          'Lâche maintenant l\'objet dans l\'eau et observe. Recommence pour les 4 objets.',
        question:
          'Ta prévision est-elle juste à chaque fois ? Sinon, d\'où vient l\'erreur de mesure ?',
      },
    ],
    measures: [
      'Pour chaque objet : masse m, volume déplacé V',
      'Masse volumique calculée ρ = m / V',
      'Prévision (flotte / coule) puis observation réelle',
    ],
    interpretation:
      "Les objets de masse volumique inférieure à 1 g/cm³ flottent, les autres coulent. À masse égale, celui qui déplace le plus d'eau est le moins dense — le raisonnement d'Archimède sur la couronne.",
  },
  autonomousChallenge: {
    title: 'Défi en autonomie — trier alu et plastique',
    brief:
      "Un ferrailleur a un mélange de granulés d'aluminium (ρ = 2,7 g/cm³) et de polystyrène (ρ = 1,05 g/cm³). Il dispose de 4 liquides : eau pure (1,0), eau salée saturée (1,2), alcool (0,79), huile (0,92). Choisis le liquide qui sépare les deux matériaux par flottaison, et dis lequel flotte, lequel coule.",
    schema: [
      '   liquide de tri : rho_liquide',
      '   ---------------------------------',
      '    o  granule qui FLOTTE  (rho_granule < rho_liquide)',
      '   ===============================  surface',
      '    .  granule qui COULE   (rho_granule > rho_liquide)',
      '   ---------------------------------',
      '   il faut rho_liquide ENTRE 1,05 et 2,7',
    ].join('\n'),
    successCriteria:
      "Tu choisis le seul liquide dont la masse volumique est comprise entre 1,05 et 2,7, et tu indiques correctement qui flotte (polystyrène) et qui coule (aluminium).",
  },
};

const PILOT_MASS_CONSERVATION: MissionExperiment = {
  notionKey: 'mass-conservation',
  guidedExperiment: {
    title: 'Expérience guidée — peser avant, peser après',
    goal:
      "Vérifier que la masse totale ne change pas quand une transformation se produit en récipient fermé.",
    materials: [
      'Une balance électronique (0,1 g)',
      'Une bouteille en plastique avec un ballon de baudruche sur le goulot',
      'Un comprimé effervescent et un peu d\'eau',
      'Un verre, du vinaigre et du bicarbonate (pour la version ouverte)',
    ],
    schema: [
      '   SYSTEME FERME               SYSTEME OUVERT',
      '     (O) ballon                    (   verre   )',
      '     |__|                          |  vinaigre |',
      '   |bouteille|  sur balance        |+bicarbonate|  sur balance',
      '   |  eau    |                     |___________|',
      '   [===m1===]                      [====m1====]',
      '   apres reaction : m2             apres : m2',
    ].join('\n'),
    steps: [
      {
        instruction:
          "Système fermé : mets le comprimé dans le ballon (sans qu'il tombe) et un peu d'eau dans la bouteille. Ferme, puis pèse l'ensemble : c'est m1.",
        question: 'Le montage est-il bien étanche, rien ne peut sortir ?',
      },
      {
        instruction:
          'Fais tomber le comprimé dans l\'eau. Le ballon se gonfle. Attends la fin, puis repèse l\'ensemble : c\'est m2. Compare m1 et m2.',
        question: 'La masse a-t-elle changé alors qu\'il s\'est clairement passé quelque chose ?',
      },
      {
        instruction:
          'Système ouvert : pose un verre avec du vinaigre sur la balance, note m1, verse le bicarbonate, laisse mousser, note m2.',
        question:
          'Ici la masse diminue. Où est passée la masse manquante : disparue, ou partie ailleurs ?',
      },
    ],
    measures: [
      'Système fermé : masse m1 (avant) et m2 (après)',
      'Système ouvert : masse m1 (avant) et m2 (après)',
    ],
    interpretation:
      "En récipient fermé, m2 = m1 : la matière est conservée, même invisible. En récipient ouvert, la masse diminue parce qu'un gaz s'échappe — mais ce gaz existe. C'est le principe de Lavoisier : rien ne se perd.",
  },
  autonomousChallenge: {
    title: 'Défi en autonomie — la laine de fer qui grossit',
    brief:
      "On te dit qu'en brûlant, une portion de laine d'acier GAGNE de la masse, alors qu'une bougie qui brûle PERD de la masse. Explique ces deux résultats avec le principe de conservation de la masse. Pour chaque cas, indique ce qui entre ou sort du système.",
    schema: [
      '   laine d\'acier + O2 de l\'air  ->  oxyde de fer   (masse AUGMENTE)',
      '        (le metal fixe un gaz)',
      '',
      '   bougie (cire) + O2 de l\'air  ->  CO2 + eau (gaz)  qui s\'echappent',
      '        (systeme ouvert)                            (masse DIMINUE)',
    ].join('\n'),
    successCriteria:
      "Tu expliques les deux cas par un échange de gaz avec l'air (fixation d'O₂ d'un côté, départ de CO₂ et d'eau de l'autre), sans jamais dire que la matière disparaît ou apparaît.",
  },
};

const PILOT_OUTBREAK: MissionExperiment = {
  notionKey: 'outbreak-source',
  guidedExperiment: {
    title: 'Expérience guidée — la carte des malades',
    goal:
      "Retrouver la source d'une contagion en comparant les taux d'attaque, comme John Snow à Londres en 1854.",
    materials: [
      'Un plan de la cour ou du quartier',
      '20 fiches « habitant » : chacune indique le point d\'eau utilisé et si la personne est malade',
      'Des gommettes de deux couleurs',
      'De la poudre traçante (ou paillettes) et du savon pour la partie transmission',
    ],
    schema: [
      '   PLAN               fontaine A      fontaine B      robinet C',
      '   -----------        [ x x x . ]     [ . ]           [ . . ]',
      '   x = malade          malades: 3/8    malades: 0/3    malades: 0/4',
      '   . = sain            taux = 0,38     taux = 0        taux = 0',
      '',
      '   taux d\'attaque d\'une source = malades / total qui l\'utilisent',
    ].join('\n'),
    steps: [
      {
        instruction:
          "Trie les 20 fiches par point d'eau utilisé. Pour chaque point d'eau, compte le nombre de malades et le nombre total d'utilisateurs.",
        question: 'Un même point d\'eau revient-il souvent chez les malades ?',
      },
      {
        instruction:
          "Calcule le taux d'attaque de chaque point d'eau = malades ÷ utilisateurs. Reporte les cas sur le plan avec des gommettes.",
        question: 'Quel point d\'eau a le taux d\'attaque le plus élevé ?',
      },
      {
        instruction:
          "Transmission : un élève a les mains couvertes de poudre. Il salue 5 camarades qui en saluent d'autres. Révèle la poudre. Recommence après lavage au savon 30 s, puis après simple rinçage à l'eau.",
        question: 'Le savon coupe-t-il la chaîne mieux que l\'eau seule ?',
      },
    ],
    measures: [
      'Pour chaque point d\'eau : nombre de malades et nombre d\'utilisateurs',
      'Taux d\'attaque de chaque point d\'eau',
      'Nombre de personnes contaminées : après savon / après simple rinçage',
    ],
    interpretation:
      "Le point d'eau au taux d'attaque le plus fort est la source : le « condamner » arrête l'épidémie. Le lavage au savon coupe la transmission bien mieux que l'eau seule. Ce sont les démarches de Snow et de Semmelweis.",
  },
  autonomousChallenge: {
    title: 'Défi en autonomie — enquête d\'hygiène au collège',
    brief:
      "Mène une vraie petite enquête : « se lave-t-on davantage les mains quand du savon et une affiche sont présents ? » Choisis ce que tu observes et comptes, dans deux endroits (un avec savon + affiche, un sans). Donne un résultat chiffré et une recommandation en une phrase.",
    schema: [
      '   Endroit A (savon + affiche)   Endroit B (rien)',
      '   observes : nA                 observes : nB',
      '   se lavent : lA                se lavent : lB',
      '   taux A = lA / nA              taux B = lB / nB',
      '   comparer  taux A  vs  taux B',
    ].join('\n'),
    successCriteria:
      "Tu compares deux taux (avec / sans dispositif) calculés sur des effectifs comparables, et tu proposes une recommandation cohérente avec tes chiffres.",
  },
};

const PILOT_EARTH_SHADOW: MissionExperiment = {
  notionKey: 'earth-shadow',
  guidedExperiment: {
    title: "Expérience guidée — mesurer la Terre avec deux ombres",
    goal: "Retrouver la circonférence de la Terre à partir de l'angle d'ombre entre deux villes, comme Ératosthène.",
    materials: [
      'Deux gnomons identiques (tiges de 1 m bien verticales, fil à plomb)',
      'Deux mètres rubans, une craie',
      "L'heure exacte partagée entre les deux équipes",
      'La distance nord-sud entre les deux lieux (carte ou GPS)',
    ],
    schema: [
      "   Soleil (rayons paralleles)",
      "      \\   \\   \\   \\",
      "  VilleA |        VilleB |__  ombre",
      "  (pas d'ombre)          | angle a2",
      "",
      "   angle du Soleil : tan(a) = longueur ombre / hauteur gnomon",
      "   a2 - a1 = fraction de tour entre les deux villes",
      "   circonference = distance x 360 / (a2 - a1)",
    ].join('\n'),
    steps: [
      {
        instruction:
          "Le même jour, à la même heure (midi solaire local), chaque équipe mesure la longueur de l'ombre de son gnomon.",
        question: "Les deux gnomons sont-ils bien verticaux, mesurés au fil à plomb ?",
      },
      {
        instruction:
          "Chaque équipe calcule l'angle du Soleil : tan(angle) = longueur de l'ombre ÷ hauteur du gnomon.",
        question: "L'angle est-il petit (Soleil haut) ou grand (Soleil bas) à chaque endroit ?",
      },
      {
        instruction:
          "Fais la différence des deux angles : c'est l'angle au centre de la Terre entre les deux villes.",
        question: "Pourquoi peut-on dire que cet écart d'angle est une fraction du tour complet (360°) ?",
      },
      {
        instruction:
          "Mesure la distance nord-sud d entre les deux lieux, puis calcule : circonférence = d × 360 ÷ (écart d'angle).",
        question: "Ton résultat est-il du bon ordre de grandeur par rapport à 40 000 km ?",
      },
    ],
    measures: [
      'Longueur de l\'ombre et hauteur du gnomon, aux deux lieux',
      'Angle du Soleil calculé à chaque lieu, puis leur écart',
      'Distance nord-sud entre les deux lieux',
    ],
    interpretation:
      "Les rayons du Soleil arrivant parallèles, l'écart entre les deux ombres correspond à l'angle qui sépare les deux villes vues du centre de la Terre. Cet angle est la même fraction de 360° que la distance l'est de la circonférence — d'où C = d × 360 ÷ écart d'angle, la méthode d'Ératosthène.",
  },
  autonomousChallenge: {
    title: "Défi en autonomie — la circonférence d'une autre planète",
    brief:
      "Une sonde voit le Soleil exactement au zénith au-dessus d'un point A. Au même instant, à un point B situé 1000 km au nord sur le même méridien, un gnomon projette une ombre correspondant à un angle de 9°. Calcule la circonférence de cette planète, et explique ce que représente l'angle de 9°.",
    schema: [
      '   Soleil au zenith            gnomon a B',
      '        |                        \\  ombre',
      '        v                         \\ 9 deg',
      '   ----A------------ 1000 km ------B----  (meme meridien)',
      '',
      '   circonference = 1000 x 360 / 9',
    ].join('\n'),
    successCriteria:
      "Tu trouves une circonférence proche de 40 000 km et tu identifies l'angle de 9° comme la fraction de tour (9/360) qui sépare A et B.",
  },
};

const PILOT_AIR_OXYGEN: MissionExperiment = {
  notionKey: 'air-oxygen-fraction',
  guidedExperiment: {
    title: "Expérience guidée — la bougie qui fait monter l'eau",
    goal: "Mesurer quelle fraction de l'air est consommée par une combustion.",
    materials: [
      'Une bougie chauffe-plat sur une soucoupe',
      "Une cuvette d'eau colorée",
      'Un bocal transparent gradué (ou repères au feutre)',
      'Des allumettes',
    ],
    schema: [
      '        ___________            ___________',
      '       |  bocal    |          |  bocal    |',
      '       |   (o)     |   -->    |~~~~~~~~~~~|  eau montee ~1/5',
      '   ~~~~|~~~~~~~~~~~|~~~~   ~~~|___________|~~~~',
      '     eau  bougie                 bougie eteinte',
      '',
      "   fraction de dioxygene = montee d'eau / volume d'air initial",
    ].join('\n'),
    steps: [
      {
        instruction:
          "Fixe la bougie au fond de la cuvette, verse 2-3 cm d'eau colorée. Allume la bougie et recouvre-la du bocal retourné. Marque le niveau d'eau de départ dans le bocal.",
        question: "Le bocal repose-t-il bien dans l'eau, sans laisser passer d'air ?",
      },
      {
        instruction:
          "Observe : la bougie s'éteint, l'eau monte dans le bocal. Marque le niveau final.",
        question: "La bougie s'éteint-elle AVANT que toute l'eau ne soit montée ?",
      },
      {
        instruction:
          "Calcule la fraction : hauteur d'eau montée ÷ hauteur d'air au départ.",
        question: "Pourquoi l'eau ne monte-t-elle que d'environ un cinquième, et pas davantage ?",
      },
    ],
    measures: [
      "Volume (ou hauteur) d'air dans le bocal au départ",
      "Volume (ou hauteur) d'eau montée à la fin",
    ],
    interpretation:
      "L'eau monte d'environ 1/5 : seule une partie de l'air, le dioxygène (~21 %), est consommée par la combustion. Le reste (~78 %), le diazote, n'entretient pas la flamme et reste dans le bocal.",
  },
  autonomousChallenge: {
    title: "Défi en autonomie — la rouille qui consomme l'air",
    brief:
      "Sans aucune flamme, place de la paille de fer humidifiée d'eau vinaigrée au fond d'un tube à essai retourné sur de l'eau. Relève la montée d'eau au bout de quelques jours. Quelle fraction de l'air a été consommée, et par quoi ?",
    schema: [
      '   |___|  <- eau montee apres quelques jours',
      '   | Fe|  paille de fer humide qui rouille',
      '   |   |',
      '  ~~~~~~~  eau',
      '',
      "   fraction consommee = montee d'eau / volume d'air initial",
    ].join('\n'),
    successCriteria:
      "Tu trouves une fraction proche de 1/5 (~21 %) et tu identifies que c'est le fer qui, en rouillant, a fixé le dioxygène de l'air.",
  },
};

const PILOT_PLANT_MATTER: MissionExperiment = {
  notionKey: 'plant-matter-origin',
  guidedExperiment: {
    title: "Expérience guidée — la plante grossit, la terre non",
    goal: "Vérifier que la matière fabriquée par une plante ne vient (presque) pas du sol.",
    materials: [
      'Une balance de précision, un pot avec du terreau séché et pesé',
      'Un jeune plant (haricot ou tournesol)',
      "De l'eau de pluie mesurée, un film pour couvrir la terre",
      'Un cahier de suivi (6 à 8 semaines)',
    ],
    schema: [
      '   DEBUT                        FIN (6-8 semaines)',
      '     |  plant : m_p1              |  plant : m_p2  (bien plus lourd)',
      '   [====]  terre seche : m_t1   [====]  terre seche : m_t2',
      '',
      '   gain plante = m_p2 - m_p1',
      '   perte terre = m_t1 - m_t2   (tres petite)',
    ].join('\n'),
    steps: [
      {
        instruction:
          "Pèse le plant seul (m_p1) et la terre sèche du pot (m_t1). Note les deux masses.",
        question: "La terre est-elle bien sèche avant la pesée, pour pouvoir comparer à la fin ?",
      },
      {
        instruction:
          "Couvre la surface de la terre, n'arrose qu'à l'eau de pluie mesurée, place au soleil. Suis la croissance chaque semaine.",
        question: "Pourquoi couvrir la terre et n'utiliser que de l'eau de pluie ?",
      },
      {
        instruction:
          "Après 6 à 8 semaines, sèche séparément la plante et la terre, puis repèse : m_p2 et m_t2.",
        question: "Le gain de masse de la plante ressemble-t-il à la perte de masse de la terre ?",
      },
    ],
    measures: [
      'Masse du plant au début (m_p1) et à la fin (m_p2)',
      'Masse de la terre sèche au début (m_t1) et à la fin (m_t2)',
    ],
    interpretation:
      "La plante gagne beaucoup de masse (des dizaines de grammes) alors que la terre n'en perd presque pas (quelques grammes). La matière végétale ne vient donc pas du sol : c'est le résultat de van Helmont.",
  },
  autonomousChallenge: {
    title: "Défi en autonomie — la lumière est-elle indispensable ?",
    brief:
      "Conçois une comparaison : deux plants identiques, mêmes eau, terre et température, l'un à la lumière, l'autre à l'obscurité. Après quelques semaines, mesure la masse sèche produite par chacun. Conclus sur le rôle de la lumière et sur l'origine de la matière fabriquée.",
    schema: [
      '   PLANT LUMIERE        PLANT OBSCURITE',
      '     (soleil)              (placard)',
      '   meme eau / terre / temperature',
      '   masse seche produite : g_L        g_O',
      '   comparer  g_L  vs  g_O',
    ].join('\n'),
    successCriteria:
      "Le plant éclairé produit nettement plus de matière que celui à l'obscurité, et tu expliques que l'essentiel de cette matière vient de l'air (dioxyde de carbone) et de l'eau, grâce à la lumière.",
  },
};

const PILOT_SHADOW_LINE: MissionExperiment = {
  notionKey: 'shadow-straight-line',
  guidedExperiment: {
    title: "Expérience guidée — l'ombre du gnomon, horloge et boussole",
    goal: "Montrer que la lumière du Soleil va en ligne droite : l'ombre a un bord net et une longueur qui suit une loi régulière.",
    materials: [
      'Un gnomon vertical (tige de 1 m, fil à plomb)',
      'Une craie, un mètre ruban',
      'Une boussole pour vérifier',
    ],
    schema: [
      '   Soleil                Soleil               Soleil',
      '     \\                     |                    /',
      '   ___\\___             ____|____            ___/___',
      '   ====== ombre longue  == ombre courte  ====== ombre longue',
      '   matin                  midi (nord)          soir',
      '',
      "   bord de l'ombre = net  ->  la lumiere ne contourne pas l'obstacle",
    ].join('\n'),
    steps: [
      {
        instruction:
          "Plante le gnomon. Toutes les heures, trace le contour de son ombre à la craie et note sa longueur et l'heure.",
        question: "Le bord de l'ombre est-il net ou flou ?",
      },
      {
        instruction:
          "Repère l'ombre la plus courte de la journée : c'est le midi solaire. Sa direction donne l'axe nord-sud.",
        question: "L'ombre la plus courte pointe-t-elle vers le nord (vérifie à la boussole) ?",
      },
      {
        instruction:
          "Interpose ta main entre le Soleil et le sol : observe le bord de l'ombre portée.",
        question: "Si la lumière contournait les obstacles, l'ombre aurait-elle un bord aussi net ?",
      },
    ],
    measures: [
      "Longueur et heure de l'ombre, matin / midi / soir (au moins 3 relevés)",
      "Direction de l'ombre la plus courte, comparée au nord de la boussole",
    ],
    interpretation:
      "L'ombre a un bord net et sa longueur passe par un minimum à midi : la lumière se propage en ligne droite. C'est ce qui rend l'ombre du gnomon utilisable comme horloge et comme boussole.",
  },
  autonomousChallenge: {
    title: "Défi en autonomie — fabriquer un cadran solaire",
    brief:
      "Construis un cadran solaire horizontal : oriente le style vers le nord, puis trace les lignes horaires en relevant la position de l'ombre à des heures connues. Le lendemain, vérifie que le cadran donne l'heure solaire.",
    schema: [
      '        12',
      '    11  |  13',
      '   10 \\ | / 14      style oriente vers le NORD',
      '  9 ---(o)--- 15     lignes horaires = positions de l\'ombre',
      '',
      "   verifier le lendemain : heure lue  vs  heure reelle",
    ].join('\n'),
    successCriteria:
      "Ton cadran donne l'heure solaire à moins de 20 minutes près, et tu expliques qu'il fonctionne parce que l'ombre du style a une direction précise (lumière en ligne droite).",
  },
};

const PILOT_MELTING_PLATEAU: MissionExperiment = {
  notionKey: 'melting-plateau',
  guidedExperiment: {
    title: "Expérience guidée — la température qui reste bloquée",
    goal: "Montrer qu'un corps pur change d'état à température fixe (palier).",
    materials: [
      'De la glace pilée dans un bécher',
      'Un thermomètre (−10 à +110 °C), un chronomètre',
      'Une source de chaleur douce (bain d\'eau chaude ou réchaud surveillé)',
    ],
    schema: [
      '   T (deg C)',
      '   100 |            _____ palier d\'ebullition',
      '       |           /',
      '     0 |__________/   <- palier de fusion (glace + eau)',
      '       |_____________________  temps',
      '       glace   fonte    eau qui chauffe',
    ].join('\n'),
    steps: [
      {
        instruction:
          "Plonge le thermomètre dans la glace pilée et relève la température de départ.",
        question: "Y a-t-il encore de la glace ET de l'eau dans le bécher ?",
      },
      {
        instruction:
          "Chauffe doucement et relève la température toutes les minutes, en notant l'aspect (glace + eau, puis eau seule).",
        question: "Pendant que la glace fond, le thermomètre monte-t-il ? Où va la chaleur apportée ?",
      },
      {
        instruction:
          "Continue jusqu'à ce que toute la glace ait fondu, puis relève la température.",
        question: "La température ne remonte-t-elle qu'une fois toute la glace fondue ?",
      },
    ],
    measures: [
      "Température au début (glace + eau)",
      "Température après quelques minutes (glace + eau encore présentes)",
      "Température quand toute la glace a fondu",
    ],
    interpretation:
      "Tant que glace et eau coexistent, la température reste bloquée vers 0 °C : la chaleur apportée sert à faire fondre la glace, pas à chauffer. C'est la chaleur latente de Joseph Black.",
  },
  autonomousChallenge: {
    title: "Défi en autonomie — la courbe de refroidissement d'un corps pur",
    brief:
      "Fais fondre un peu de paraffine (ou d'acide stéarique), puis laisse-la refroidir à l'air en relevant sa température. Repère le palier de solidification et déduis-en la température caractéristique de ce corps.",
    schema: [
      '   T (deg C)',
      '       |\\',
      '       | \\____ palier de solidification',
      '       |      \\____  (temperature caracteristique)',
      '       |___________\\____  temps',
      '       liquide  fige    solide qui refroidit',
    ].join('\n'),
    successCriteria:
      "Tu repères un palier (deux relevés stables) pendant la solidification et tu en déduis la température caractéristique du corps, en expliquant qu'il libère alors de la chaleur.",
  },
};

const PILOT_MENDEL: MissionExperiment = {
  notionKey: 'mendel-ratio',
  guidedExperiment: {
    title: "Expérience guidée — compter la descendance",
    goal: "Retrouver le rapport 3 pour 1 dans la descendance d'un croisement.",
    materials: [
      "Plusieurs épis de maïs pédagogique (grains colorés / clairs) OU des lots de graines issus d'un croisement connu",
      'Une fiche de comptage, une calculatrice',
    ],
    schema: [
      '   epi 1 : [X X . X X . X X X X . X]   dominant X  /  recessif .',
      '   epi 2 : [. X X X X . X X . X X X]',
      '   epi 3 : [X X X . X X X . X X . X]',
      '',
      '   rapport = total dominant / total recessif   ->  proche de 3',
    ].join('\n'),
    steps: [
      {
        instruction:
          "Sur chaque épi (ou lot), compte les grains de chaque type : forme dominante et forme récessive.",
        question: "Le rapport sur un seul épi est-il déjà proche de 3, ou faut-il en cumuler plusieurs ?",
      },
      {
        instruction:
          "Additionne les comptes de tous les épis, puis calcule : total dominant ÷ total récessif.",
        question: "Ton rapport global se rapproche-t-il de 3 quand tu comptes plus de grains ?",
      },
      {
        instruction:
          "Compare ton rapport à la valeur 3 attendue quand un caractère dominant masque un caractère récessif.",
        question: "Pourquoi la forme récessive réapparaît-elle alors qu'elle avait « disparu » à la génération précédente ?",
      },
    ],
    measures: [
      "Pour chaque épi : nombre de grains dominants et récessifs",
      "Totaux cumulés et rapport dominant / récessif",
    ],
    interpretation:
      "Sur un grand nombre de grains, le rapport se rapproche de 3 pour 1 : chaque caractère est porté par des facteurs hérités par paires, un de chaque parent, et le facteur dominant masque le récessif sans le supprimer.",
  },
  autonomousChallenge: {
    title: "Défi en autonomie — un caractère variable dans la nature",
    brief:
      "Choisis un caractère à deux versions sur une plante commune (par exemple trèfle à folioles marquées ou non, pâquerette à ligules blanches ou rosées). Échantillonne au moins 100 individus, compte les deux formes, calcule les proportions et dis si le résultat est compatible avec un caractère à deux versions.",
    schema: [
      '   population echantillonnee (>= 100 individus)',
      '   forme A : n_A        forme B : n_B',
      '   proportion A = n_A / (n_A + n_B)',
      '   -> une forme peut etre plus frequente que l\'autre',
    ].join('\n'),
    successCriteria:
      "Tu comptes au moins 100 individus, tu donnes les proportions des deux formes, et tu conclus qu'un caractère à deux versions (dont l'une peut dominer ou être plus répandue) est compatible avec l'hérédité.",
  },
};

const PILOT_PYTHAGORAS: MissionExperiment = {
  notionKey: 'pythagoras-3-4-5',
  guidedExperiment: {
    title: "Expérience guidée — les carrés sur les côtés du triangle rectangle",
    goal: "Vérifier que, dans un triangle rectangle, le carré de l'hypoténuse est la somme des carrés des deux autres côtés.",
    materials: [
      'Un décamètre, un cordeau, des piquets, une craie',
      "Une équerre ou une corde à 13 nœuds pour l'angle droit",
      'De quoi tracer et quadriller des carrés au sol (carreaux de 50 cm)',
    ],
    schema: [
      '            +--------+',
      '            |  c x c |  carre sur l\'hypotenuse',
      '   +----+   |        |',
      '   |b x b|  *---------  hypotenuse c',
      '   +----+ / |',
      '   |     / a| triangle rectangle (a et b : cotes de l\'angle droit)',
      '   +----+   +----+',
      '   a x a    ...',
    ].join('\n'),
    steps: [
      {
        instruction:
          "Trace au sol un triangle rectangle de côtés 3 m et 4 m (angle droit vérifié à l'équerre ou à la corde à 13 nœuds). Mesure l'hypoténuse.",
        question: "Combien mesure l'hypoténuse que tu as tracée ?",
      },
      {
        instruction:
          "Sur chaque côté, trace le carré correspondant. Recouvre les deux petits carrés de carreaux de 50 cm et compte-les.",
        question: "Combien de carreaux dans le carré de 3 m ? dans celui de 4 m ?",
      },
      {
        instruction:
          "Compte les carreaux du grand carré (sur l'hypoténuse). Compare à la somme des deux autres.",
        question: "Le grand carré contient-il exactement autant de carreaux que les deux petits réunis ?",
      },
    ],
    measures: [
      'Longueurs des deux côtés de l\'angle droit (a et b)',
      'Longueur mesurée de l\'hypoténuse (c)',
    ],
    interpretation:
      "L'aire du carré sur l'hypoténuse est égale à la somme des aires des deux autres carrés : c'est a² + b² = c². La mesure directe de l'hypoténuse confirme le calcul.",
  },
  autonomousChallenge: {
    title: "Défi en autonomie — le mur est-il bien d'aplomb ?",
    brief:
      "Un maçon veut vérifier qu'un mur est perpendiculaire au sol sans monter d'échafaudage. Il mesure 0,60 m le long du sol, 0,80 m le long du mur, et 1,00 m en diagonale entre ces deux repères. En n'utilisant que ces trois longueurs, dis si l'angle mur/sol est droit.",
    schema: [
      '   mur |',
      '       |\\',
      '  0,80 | \\  1,00  (diagonale)',
      '       |  \\',
      '       +---\\----  sol',
      '        0,60',
      '   angle droit  <=>  0,60^2 + 0,80^2 = 1,00^2 ?',
    ].join('\n'),
    successCriteria:
      "Tu calcules 0,60² + 0,80² et tu le compares à 1,00², puis tu conclus correctement que l'angle est droit (réciproque du théorème de Pythagore).",
  },
};

const PILOT_CO2_LIMEWATER: MissionExperiment = {
  notionKey: 'co2-limewater',
  guidedExperiment: {
    title: "Expérience guidée — l'eau de chaux qui se trouble",
    goal: "Identifier le dioxyde de carbone grâce à un test reproductible : le trouble de l'eau de chaux.",
    materials: [
      "De l'eau de chaux limpide (préparée et filtrée)",
      'Trois pots transparents, une paille',
      'Du vinaigre et du bicarbonate de soude',
    ],
    schema: [
      '   Pot 1            Pot 2                 Pot 3 (temoin)',
      '   souffle a la     gaz du vinaigre       air ambiant',
      '   paille           + bicarbonate         (on agite)',
      '   -> trouble ?     -> trouble ?          -> trouble ?',
      '',
      '   trouble blanc  =  presence de dioxyde de carbone',
    ].join('\n'),
    steps: [
      {
        instruction:
          "Verse un fond d'eau de chaux dans les trois pots.",
        question: "L'eau de chaux est-elle bien limpide au départ dans les trois pots ?",
      },
      {
        instruction:
          "Pot 1 : souffle doucement à la paille pendant 30 s. Pot 2 : fais réagir vinaigre + bicarbonate dans un verre voisin et transvase le gaz dans le pot. Pot 3 : agite simplement à l'air.",
        question: "Quels pots se troublent, et lequel reste limpide ?",
      },
      {
        instruction:
          "Compare : qu'ont en commun les sources qui font se troubler l'eau de chaux ?",
        question: "Le gaz de ton souffle et le gaz du vinaigre + bicarbonate sont-ils le même gaz ?",
      },
    ],
    measures: [
      "Aspect de l'eau de chaux dans chaque pot (trouble / limpide)",
      "Délai d'apparition du trouble",
    ],
    interpretation:
      "L'eau de chaux se trouble avec l'air expiré et avec le gaz du vinaigre + bicarbonate, mais pas dans le témoin : ces sources dégagent toutes le même gaz, le dioxyde de carbone. Le trouble est son test d'identification.",
  },
  autonomousChallenge: {
    title: "Défi en autonomie — qui produit du dioxyde de carbone ?",
    brief:
      "À l'aide de l'eau de chaux, détermine si du dioxyde de carbone est produit par : la combustion d'une bougie, la fermentation d'un jus sucré avec de la levure, et la respiration de graines de lentilles en germination. Conçois le montage pour chaque cas et conclus.",
    schema: [
      '   bougie qui brule  |  jus sucre + levure  |  graines qui germent',
      '   (cloche)           |  (bouteille fermee)   |  (bocal ferme)',
      '        \\             |         |             |        /',
      '         ---> eau de chaux : trouble ou limpide ? <---',
    ].join('\n'),
    successCriteria:
      "Tu observes que l'eau de chaux se trouble dans les trois cas, et tu conclus que combustion, fermentation et respiration produisent toutes du dioxyde de carbone.",
  },
};

const PILOT_EARTHWORM: MissionExperiment = {
  notionKey: 'earthworm-burial',
  guidedExperiment: {
    title: "Expérience guidée — les vers enfouissent la litière",
    goal: "Mesurer que la faune du sol (les vers) enfouit les feuilles mortes et fabrique l'humus.",
    materials: [
      "Des dalles plates (ou ardoises) posées à plat, des piquets repères",
      "Des sachets à mailles fines et à grosses mailles, des feuilles mortes pesées",
      'Une balance, une règle, un carnet de suivi (plusieurs semaines)',
    ],
    schema: [
      '   dalle temoin :  niveau initial  ----  ->  s\'enfonce peu a peu',
      '',
      '   sachet mailles FINES   : vers exclus  -> feuilles peu decomposees',
      '   sachet GROSSES mailles : faune entre  -> feuilles bien decomposees',
    ].join('\n'),
    steps: [
      {
        instruction:
          "Pose des dalles à plat sur la pelouse contre des piquets repères. Note leur niveau. Laisse en place plusieurs semaines, puis remesure l'enfoncement.",
        question: "La dalle s'est-elle enfoncée ? D'où vient la terre qui la recouvre ?",
      },
      {
        instruction:
          "Enferme des masses égales de feuilles mortes dans un sachet à mailles fines (sans vers) et un à grosses mailles (avec la faune). Enterre-les, puis déterre et repèse après 6 à 10 semaines.",
        question: "Dans quel sachet reste-t-il le moins de feuilles ?",
      },
      {
        instruction:
          "Compare l'état des feuilles des deux sachets et repère, à la surface, les petits tortillons de terre (turricules) laissés par les vers.",
        question: "Les feuilles du sachet à grosses mailles sont-elles plus fragmentées, plus mélangées à la terre ?",
      },
    ],
    measures: [
      "Enfoncement de la dalle témoin et durée du suivi",
      "Masse de feuilles restante : sachet mailles fines / sachet grosses mailles",
    ],
    interpretation:
      "Les feuilles disparaissent bien plus vite quand la faune du sol peut y accéder ; les vers mélangent les horizons et enfouissent la litière, qu'ils transforment en humus. C'est ce que Darwin a mesuré pendant quarante ans.",
  },
  autonomousChallenge: {
    title: "Défi en autonomie — que sait recycler la faune du sol ?",
    brief:
      "Compare la vitesse de décomposition de trois déchets déposés dans des sachets à grosses mailles enterrés côte à côte : une feuille, un morceau de pain, un morceau de plastique fin. Sur une durée que tu fixes, mesure la part de masse perdue par chacun et conclus.",
    schema: [
      '   feuille        pain          plastique fin',
      '   masse perdue : %F           %P            %plast',
      '',
      '   la faune du sol recycle la matiere organique, pas le plastique',
    ].join('\n'),
    successCriteria:
      "La feuille et le pain perdent une part importante de leur masse, le plastique presque rien, et tu conclus que la faune du sol recycle la matière organique mais pas le plastique.",
  },
};

const PILOT_DISK_AREA: MissionExperiment = {
  notionKey: 'disk-area-exhaustion',
  guidedExperiment: {
    title: "Expérience guidée — encadrer l'aire d'un disque",
    goal: "Encadrer l'aire d'un disque entre une valeur par défaut et une valeur par excès, comme la méthode d'exhaustion d'Archimède.",
    materials: [
      'Un cordeau et un piquet, de la craie',
      'Un grand quadrillage tracé au sol (carreaux de 20 cm)',
      'Une calculatrice',
    ],
    schema: [
      '   +--+--+--+--+--+',
      '   |  |##|##|##|  |   ## = carreau entierement dedans (par defaut)',
      '   +--+##+##+##+--+   oo = carreau touche par le cercle (par exces)',
      '   |##|##|##|##|##|',
      '   +oo+##+##+##+oo+',
      '   aire du disque  ENTRE  (nb ##)xaire  et  (nb ## + oo)xaire',
    ].join('\n'),
    steps: [
      {
        instruction:
          "Trace au cordeau un cercle de rayon 1 m sur le quadrillage. Compte les carreaux entièrement à l'intérieur du cercle.",
        question: "Cette somme d'aires est-elle plus petite ou plus grande que l'aire du disque ?",
      },
      {
        instruction:
          "Compte maintenant tous les carreaux qui touchent le cercle ou sont dedans. Cette somme est la valeur par excès.",
        question: "L'aire du disque est-elle forcément comprise entre tes deux valeurs ?",
      },
      {
        instruction:
          "Calcule l'aire par défaut et l'aire par excès (nombre de carreaux × aire d'un carreau), puis compare l'intervalle à π × R² = π × 1² ≈ 3,14 m².",
        question: "Si tu prenais des carreaux plus petits, l'encadrement se resserrerait-il autour de 3,14 ?",
      },
    ],
    measures: [
      "Aire d'un carreau (m²)",
      'Nombre de carreaux entièrement dans le cercle',
      'Nombre de carreaux touchés ou dans le cercle',
    ],
    interpretation:
      "L'aire du disque est coincée entre les deux valeurs, et l'intervalle contient 3,14 m² (π × R²). En prenant des carreaux de plus en plus petits, on « épuise » l'écart, exactement comme Archimède avec ses polygones.",
  },
  autonomousChallenge: {
    title: "Défi en autonomie — l'aire d'une flaque",
    brief:
      "Estime l'aire d'une flaque, d'un massif ou d'une tache d'herbe de forme quelconque, uniquement en l'encadrant par des rectangles tracés à la craie : donne une valeur par défaut (rectangles entièrement dedans) et une valeur par excès (rectangles qui la contiennent).",
    schema: [
      '   +-----------+   rectangles PAR EXCES (contiennent la flaque)',
      '   | +-------+ |',
      '   | | ~~~~~ | |   rectangles PAR DEFAUT (a l\'interieur)',
      '   | +-------+ |',
      '   +-----------+',
      '   aire  ENTRE  somme(defaut)  et  somme(exces)',
    ].join('\n'),
    successCriteria:
      "Ta valeur par défaut est inférieure à ta valeur par excès, l'écart entre les deux reste raisonnable, et tu expliques qu'on ne peut donner qu'un encadrement car le bord est courbe.",
  },
};

const PILOT_WEIGHT_MASS: MissionExperiment = {
  notionKey: 'weight-vs-mass',
  guidedExperiment: {
    title: "Expérience guidée — la balance et le dynamomètre",
    goal: "Distinguer la masse (propre à la matière) du poids (force qui dépend du lieu).",
    materials: [
      'Une balance, un dynamomètre (peson) gradué en newtons',
      'Plusieurs objets : galet, brique, bouteille d\'eau',
      'Une corde, une potence ou une branche solide',
    ],
    schema: [
      '   BALANCE                 DYNAMOMETRE',
      '   [====]                    | ressort',
      '    || m (kg)                O <- crochet',
      '                             | objet',
      '   masse : quantite de       poids : force (N)',
      '   matiere, invariable       P = m x g',
    ].join('\n'),
    steps: [
      {
        instruction:
          "Pèse chaque objet à la balance : tu lis sa masse en kilogrammes.",
        question: "La balance est-elle bien à zéro avant de poser l'objet ?",
      },
      {
        instruction:
          "Suspends chaque objet au dynamomètre : tu lis son poids en newtons.",
        question: "Le poids en newtons est-il un nombre différent de la masse en kilogrammes ?",
      },
      {
        instruction:
          "Pour chaque objet, calcule le quotient poids ÷ masse. Compare les résultats.",
        question: "Le quotient poids ÷ masse est-il le même pour tous les objets ?",
      },
    ],
    measures: [
      'Masse (kg) et poids (N) de chaque objet',
      'Quotient poids ÷ masse pour chacun',
    ],
    interpretation:
      "Le quotient poids ÷ masse est le même pour tous les objets, environ 9,8 N/kg : c'est l'intensité de la pesanteur g. La balance mesure une grandeur invariable (la masse) ; le dynamomètre mesure une force qui dépend de l'astre.",
  },
  autonomousChallenge: {
    title: "Défi en autonomie — le même sac sur trois astres",
    brief:
      "Tu pèses un sac : sa masse est de 5 kg. On te donne l'intensité de la pesanteur sur la Terre (9,8 N/kg), sur la Lune (1,6) et sur Mars (3,7). Prévois par le calcul le poids qu'indiquerait un dynamomètre pour ce sac sur chacun des trois astres.",
    schema: [
      '   masse du sac : 5 kg  (identique partout)',
      '',
      '   Terre : P = 5 x 9,8 = ?   N',
      '   Lune  : P = 5 x 1,6 = ?   N',
      '   Mars  : P = 5 x 3,7 = ?   N',
    ].join('\n'),
    successCriteria:
      "Tes trois poids valent bien masse × g pour chaque astre, et tu identifies que c'est le poids qui change d'un astre à l'autre, pas la masse.",
  },
};

const PILOT_RESPIRATION: MissionExperiment = {
  notionKey: 'respiration-co2',
  guidedExperiment: {
    title: "Expérience guidée — l'air expiré trouble l'eau de chaux",
    goal: "Montrer que la respiration rejette du dioxyde de carbone, et que l'effort l'intensifie.",
    materials: [
      "De l'eau de chaux limpide, des pailles, des gobelets, un chronomètre",
      'Une seringue (pour l\'air ambiant témoin)',
      'De quoi faire un effort (montée de marches, course courte)',
    ],
    schema: [
      '   gobelet 1 : air expire     gobelet 2 : air ambiant (temoin)',
      '   souffle a la paille        chasse a la seringue',
      '   -> se trouble en t1 s      -> se trouble en t2 s (bien plus long)',
      '',
      '   au repos  vs  apres effort : compter les respirations / min',
    ].join('\n'),
    steps: [
      {
        instruction:
          "Au repos, souffle à la paille dans un gobelet d'eau de chaux et chronomètre le temps au bout duquel elle se trouble. Fais de même avec de l'air ambiant chassé à la seringue dans un autre gobelet.",
        question: "L'air expiré trouble-t-il l'eau de chaux beaucoup plus vite que l'air ambiant ?",
      },
      {
        instruction:
          "Toujours au repos, compte le nombre de respirations par minute.",
        question: "Ta respiration est-elle lente et régulière au repos ?",
      },
      {
        instruction:
          "Fais un effort d'une à deux minutes, puis refais aussitôt les mesures : temps de trouble de l'eau de chaux et nombre de respirations par minute.",
        question: "L'effort augmente-t-il la fréquence des respirations et le rejet de dioxyde de carbone ?",
      },
    ],
    measures: [
      "Temps de trouble de l'eau de chaux : air expiré (repos) et air ambiant (témoin)",
      'Fréquence respiratoire au repos, puis après effort',
    ],
    interpretation:
      "L'air expiré trouble l'eau de chaux bien plus vite que l'air ambiant : il est enrichi en dioxyde de carbone. À l'effort, on respire plus souvent et le rejet de dioxyde de carbone augmente : la respiration est une combustion lente qui s'intensifie avec l'activité, comme l'ont montré Lavoisier et Séguin.",
  },
  autonomousChallenge: {
    title: "Défi en autonomie — effort et consommation de l'organisme",
    brief:
      "Définis trois niveaux d'effort (marche, marche rapide, course). Pour chacun, après stabilisation, mesure la fréquence respiratoire ET la fréquence cardiaque. Trace les deux séries en fonction de l'effort et conclus sur le lien entre intensité de l'effort et consommation de l'organisme.",
    schema: [
      '   effort :   marche   marche rapide   course',
      '   respi/min :  r1   <    r2       <    r3',
      '   coeur/min :  c1   <    c2       <    c3',
      '   -> plus l\'effort est intense, plus l\'organisme consomme',
    ].join('\n'),
    successCriteria:
      "Tes deux séries (respiration et fréquence cardiaque) augmentent avec l'intensité de l'effort, et tu conclus que l'organisme consomme et rejette d'autant plus que l'effort est intense.",
  },
};

const PILOT_PROPORTIONALITY: MissionExperiment = {
  notionKey: 'proportionality-rule-of-three',
  guidedExperiment: {
    title: "Expérience guidée — le prix qui suit la masse",
    goal: "Vérifier qu'un prix est proportionnel à la masse, et retrouver la quatrième grandeur par la règle de trois.",
    materials: [
      'Une balance de cuisine, une calculatrice, un carnet',
      "Des lots de fruits ou légumes (ou sachets de sable étiquetés)",
      "Des étiquettes de prix « au kilo »",
    ],
    schema: [
      "   prix au kilo : p  (EUR/kg)",
      '   portion pesee : m (g)',
      '',
      "   prix de la portion = p / 1000 x m   (passage a l'unite)",
      '   portion doublee -> prix double ;  triplee -> prix triple',
    ].join('\n'),
    steps: [
      {
        instruction:
          "Relève le prix au kilo d'un produit, puis pèse une portion réelle de ce produit.",
        question: "Quelle est la masse de ta portion, et le prix affiché au kilo ?",
      },
      {
        instruction:
          "Calcule le prix de ta portion : prix au kilo ÷ 1000 × masse en grammes.",
        question: "Ton résultat est-il cohérent avec ce que tu paierais en caisse ?",
      },
      {
        instruction:
          "Double puis triple la portion, et calcule à chaque fois le prix. Compare au prix de la portion simple.",
        question: "Quand tu doubles la masse, le prix double-t-il exactement ?",
      },
    ],
    measures: [
      "Prix au kilo (EUR/kg) et masse de la portion (g)",
      "Prix calculé pour la portion simple, la portion double, la portion triple",
    ],
    interpretation:
      "Le prix est proportionnel à la masse : le coefficient est le prix au gramme. Doubler la masse double le prix, la tripler le triple. C'est la règle de trois diffusée par Fibonacci.",
  },
  autonomousChallenge: {
    title: "Défi en autonomie — la carte à l'échelle 1/2000",
    brief:
      "On te remet un plan du quartier à l'échelle 1/2000. Un trajet y mesure une certaine longueur (en cm sur le plan). Prévois la longueur réelle du trajet, puis vérifie en le mesurant au décamètre sur le terrain.",
    schema: [
      '   echelle 1/2000  :  1 cm sur le plan  =  2000 cm en realite',
      '',
      '   longueur sur le plan : L_plan (cm)',
      '   longueur reelle prevue = L_plan x 2000  (en cm)  = L_plan x 20 (en m)',
    ].join('\n'),
    successCriteria:
      "Ta longueur réelle prévue vaut bien la longueur sur le plan × 2000 (soit × 20 pour l'avoir en mètres), et ta mesure au décamètre la confirme à moins de 10 % près.",
  },
};

const PILOT_CIRCUIT_PILE: MissionExperiment = {
  notionKey: 'circuit-pile',
  guidedExperiment: {
    title: "Expérience guidée — empiler pour faire une pile",
    goal: "Voir qu'un générateur et une boucle fermée de conducteurs suffisent à faire circuler un courant, et qu'empiler des éléments augmente la tension.",
    materials: [
      'Des pièces en cuivre, des rondelles de zinc, du papier absorbant',
      'Du vinaigre salé, des fils à pinces crocodiles',
      'Une DEL (ou un petit moteur), un multimètre',
    ],
    schema: [
      '   cuivre  |###|  }',
      '   papier  |~~~|  }  1 element',
      '   zinc    |###|  }',
      '   ... on empile plusieurs elements ...',
      '',
      '   tension de la pile mesuree au multimetre : croit avec le nombre d\'elements',
    ].join('\n'),
    steps: [
      {
        instruction:
          "Empile cuivre / papier imbibé de vinaigre salé / zinc, plusieurs fois. Mesure la tension aux extrémités au multimètre pour 1, puis 3, puis 6 étages.",
        question: "La tension augmente-t-elle avec le nombre d'étages ?",
      },
      {
        instruction:
          "Relie la pile à une DEL par des fils (respecte le sens). Insère un interrupteur bricolé et ouvre / ferme le circuit.",
        question: "La DEL s'allume-t-elle quand le circuit est ouvert ?",
      },
      {
        instruction:
          "Identifie la boucle du circuit. Coupe un fil : que se passe-t-il ?",
        question: "Faut-il une boucle complète de conducteurs pour que le courant passe ?",
      },
    ],
    measures: [
      "Tension de la pile pour 1, 3 et 6 étages",
      "État de la DEL selon circuit ouvert / fermé",
    ],
    interpretation:
      "Un générateur, une boucle fermée de conducteurs et un récepteur suffisent à faire circuler un courant. Plus on empile d'éléments, plus la tension est grande : c'est la pile de Volta reconstituée.",
  },
  autonomousChallenge: {
    title: "Défi en autonomie — la pile aux fruits",
    brief:
      "À partir de fruits (citrons, pommes de terre), de clous galvanisés (zinc) et de pièces de cuivre, monte une pile capable d'allumer une DEL. Détermine combien d'éléments il faut mettre en série, puis repère sur ton schéma le sens conventionnel du courant.",
    schema: [
      '   [citron]--Cu   Zn--[citron]--Cu   Zn--[citron]--Cu   ... --> DEL',
      '',
      "   tension d'un element : ~0,7 a 1 V",
      '   sens conventionnel : de la borne + vers la borne - a l\'exterieur du generateur',
    ].join('\n'),
    successCriteria:
      "Tu mets assez d'éléments en série pour dépasser environ 1,8 V (nécessaire à une DEL rouge), et tu indiques que le sens conventionnel du courant va de la borne + vers la borne − à l'extérieur du générateur.",
  },
};

const PILOT_CELL_UNIT: MissionExperiment = {
  notionKey: 'cell-unit',
  guidedExperiment: {
    title: "Expérience guidée — chercher la cellule partout",
    goal: "Vérifier que tous les êtres vivants sont faits de cellules, contrairement à la matière non vivante.",
    materials: [
      'Un microscope (ou loupe numérique), des lames et lamelles, des pipettes',
      "De l'eau de mare, un oignon, un rameau d'élodée ou de mousse",
      'Un cure-dent, du bleu de méthylène très dilué',
    ],
    schema: [
      '   oignon (epiderme)   elodee (feuille)   joue (frottis)   eau de mare',
      '        [ ][ ][ ]          [ ][ ][ ]         o  o  o          ~ o ~ o ~',
      '   -> cellules              -> cellules       -> cellules      -> micro-organismes',
      '',
      '   grain de sable / cristal de sel  ->  PAS de cellules',
    ].join('\n'),
    steps: [
      {
        instruction:
          "Prépare une lame d'épiderme d'oignon, une de feuille d'élodée, une goutte d'eau de mare, et un frottis de joue prélevé au cure-dent.",
        question: "Les préparations sont-elles assez fines pour laisser passer la lumière ?",
      },
      {
        instruction:
          "Observe chaque préparation du plus faible au plus fort grossissement, et dessine ce que tu vois.",
        question: "Retrouves-tu une organisation en petites unités (des cellules) dans chaque échantillon vivant ?",
      },
      {
        instruction:
          "Observe aussi un grain de sable et un cristal de sel, puis trie toutes les préparations : « on y voit des cellules » ou « on n'y voit pas de cellules ».",
        question: "Le sable et le sel contiennent-ils des cellules ?",
      },
    ],
    measures: [
      "Pour chaque préparation : présence ou non de cellules, et leur disposition",
      "Présence éventuelle de micro-organismes mobiles dans l'eau de mare",
    ],
    interpretation:
      "Oignon, élodée, joue et micro-organismes de la mare montrent tous des cellules, alors que le sable ou le sel n'en ont pas. La cellule est l'unité commune du vivant, comme l'ont établi Hooke, Leeuwenhoek puis Schleiden et Schwann.",
  },
  autonomousChallenge: {
    title: "Défi en autonomie — vivant ou non ?",
    brief:
      "Rapporte trois échantillons de la cour : de la mousse, une plume, un caillou. Pour chacun, prépare et observe, puis détermine s'il s'agit de matière vivante (ou issue du vivant) ou de matière qui n'a jamais été vivante, en te fondant uniquement sur la présence de cellules.",
    schema: [
      '   mousse   ->  cellules  ->  vivant',
      '   plume    ->  structure cellulaire (kératine)  ->  issu du vivant',
      '   caillou  ->  pas de cellules  ->  jamais vivant',
    ].join('\n'),
    successCriteria:
      "Tu classes correctement les trois échantillons (mousse et plume : vivant ou issu du vivant ; caillou : jamais vivant) et tu justifies par la présence ou l'absence de cellules.",
  },
};

export const HISTORY_OF_SCIENCE_MISSIONS: HistoryOfScienceMission[] = [
  // ------------------------- M1 · Mathématiques -------------------------
  m(
    '1.1', 'Mathématiques', S6,
    '[Maths·6e] π et le périmètre du cercle — Archimède (v. 250 av. J.-C.)',
    "À Syracuse, Archimède cherche un encadrement fiable de la longueur d'un cercle, dont les artisans ne connaissent que des valeurs grossières. Dans « La Mesure du cercle », il coince le cercle entre deux polygones jusqu'à 96 côtés et démontre 223/71 < π < 22/7.",
    "Le périmètre d'un disque est proportionnel à son diamètre : P = π × D. En roulant un objet circulaire sur un tour et en mesurant son diamètre, le quotient P / D retombe toujours autour de 3,14.",
    'pi-from-circle', 'Valeur de π estimée', ['perimeterM', 'diameterM'],
    PILOT_PI_CIRCLE,
  ),
  m(
    '1.2', 'Mathématiques', S6,
    "[Maths·6e] L'angle droit et l'arpentage — les harpédonaptes d'Égypte (Hérodote)",
    "Après chaque crue du Nil, les « tendeurs de corde » égyptiens rétablissent les limites des champs. Sans instrument à angle droit, ils tendent une corde à 13 nœuds en triangle 3-4-5, qui forme forcément un angle droit.",
    "Un quadrilatère dont les deux diagonales sont égales à √(L² + l²) est un vrai rectangle : ses quatre angles sont droits.",
    'rectangle-diagonal', 'Longueur de diagonale attendue', ['lengthM', 'widthM'],
  ),
  m(
    '1.3', 'Mathématiques', S6,
    '[Maths·6e] La proportionnalité et la règle de trois — Fibonacci, Liber Abaci (1202)',
    "Les marchands italiens du XIIIe siècle jonglent avec des monnaies et des mesures différentes d'une ville à l'autre. Dans le « Liber Abaci », Fibonacci diffuse la règle de trois et les chiffres indo-arabes qui la rendent praticable.",
    "Dans une situation de proportionnalité, de trois grandeurs connues (a, b, c) on déduit la quatrième : x = b × c / a.",
    'fourth-proportional', 'Quatrième proportionnelle', ['referenceInput', 'referenceOutput', 'targetInput'],
    PILOT_PROPORTIONALITY,
  ),
  m(
    '1.4', 'Mathématiques', S6,
    '[Maths·6e] La division euclidienne et le calendrier — réforme grégorienne (1582)',
    "Le calendrier julien avance d'environ 3 jours tous les 400 ans. En 1582, la commission du pape Grégoire XIII supprime 10 jours et change la règle des années bissextiles à partir de divisions avec reste.",
    "La division euclidienne d'un entier par un autre donne un quotient et un reste : c'est ce reste (la fraction de jour) que le calendrier doit rattraper.",
    'euclidean-remainder', 'Reste de la division', ['dividend', 'divisor'],
  ),
  m(
    '1.5', 'Mathématiques', S6,
    "[Maths·6e] La symétrie axiale et les pavages — les zelliges de l'Alhambra (XIVe s.)",
    "Au palais nasride de l'Alhambra, à Grenade, les artisans couvrent les murs de mosaïques sans espace vide, en explorant systématiquement réflexions, rotations et translations.",
    "La symétrie axiale conserve les longueurs et les angles : un point et son image sont à la même distance de l'axe. L'écart entre ces deux distances mesure la qualité du tracé.",
    'axial-symmetry-error', 'Écart de symétrie', ['pointDistanceToAxisM', 'imageDistanceToAxisM'],
  ),
  m(
    '1.6', 'Mathématiques', S5,
    "[Maths·5e] L'aire du disque et la méthode d'exhaustion — Archimède ; Liu Hui (263)",
    "On ne sait longtemps mesurer que des polygones. Archimède, puis Liu Hui en Chine, encadrent le disque entre polygones inscrit et circonscrit en multipliant les côtés jusqu'à rendre l'écart négligeable.",
    "L'aire du disque vaut A = π × R². On l'encadre par des polygones dont on sait calculer l'aire, de plus en plus proches du cercle.",
    'disk-area', 'Aire du disque (m²)', ['radiusM'],
    PILOT_DISK_AREA,
  ),
  m(
    '1.7', 'Mathématiques', S5,
    '[Maths·5e] Les nombres relatifs : fortunes et dettes — Brahmagupta (Inde, 628)',
    "Dans le « Brāhmasphuṭasiddhānta », Brahmagupta donne pour la première fois les règles de calcul avec le zéro et les quantités négatives, interprétées comme des « dettes » et des « fortunes ».",
    "Une fortune et une dette de même valeur s'annulent : le solde net d'un compte est la somme des crédits diminuée de la somme des débits, et peut être négatif.",
    'net-balance', 'Solde net', ['credits', 'debits'],
  ),
  m(
    '1.8', 'Mathématiques', S5,
    "[Maths·5e] Les nombres premiers et le crible d'Ératosthène (Alexandrie, v. 240 av. J.-C.)",
    "Ératosthène, à la tête de la Bibliothèque d'Alexandrie, met au point un procédé pour lister les nombres premiers sans tester chaque nombre : on garde 2 et on raye ses multiples, puis 3, puis 5…",
    "Deux engrenages de a et b dents reviennent en phase après un nombre de dents égal au plus petit commun multiple de a et b, que l'on obtient par décomposition en facteurs premiers.",
    'lowest-common-multiple', 'Plus petit commun multiple', ['a', 'b'],
  ),
  m(
    '1.9', 'Mathématiques', S5,
    "[Maths·5e] Mesurer la Terre avec une ombre — Ératosthène, Syène-Alexandrie (v. 240 av. J.-C.)",
    "Le jour du solstice, le Soleil éclaire le fond des puits à Syène tandis qu'un gnomon projette une ombre à Alexandrie. Ératosthène mesure l'angle (≈ 7,2°, soit 1/50 de tour) et en déduit la circonférence terrestre.",
    "Les rayons du Soleil arrivant parallèles, l'angle d'ombre entre deux villes d'un même méridien est la fraction de tour qui sépare leurs verticales : circonférence = distance × 360 / angle.",
    'earth-circumference', 'Circonférence terrestre (km)', ['shadowAngleDeg', 'distanceKm'],
    PILOT_EARTH_SHADOW,
  ),
  m(
    '1.10', 'Mathématiques', S5,
    "[Maths·5e] Se repérer dans le plan : les coordonnées — Descartes, La Géométrie (1637)",
    "En 1637, à Leyde, Descartes montre dans « La Géométrie » que tout point peut être décrit par un couple de nombres : la géométrie devient calcul, l'équation devient courbe.",
    "Dans un repère orthogonal, la distance entre deux points se calcule à partir de leurs coordonnées : d = √((x₂ − x₁)² + (y₂ − y₁)²).",
    'planar-distance', 'Distance entre les deux points', ['x1', 'y1', 'x2', 'y2'],
  ),
  m(
    '1.11', 'Mathématiques', S4,
    '[Maths·4e] Le théorème de Pythagore — tablette Plimpton 322 (Babylone) ; Crotone',
    "La tablette babylonienne Plimpton 322 (v. 1800 av. J.-C.) aligne déjà des triplets vérifiant a² + b² = c². C'est l'école de Pythagore, à Crotone, à qui l'on attribue la première démonstration générale.",
    "Dans un triangle rectangle, l'hypoténuse se calcule à partir des deux côtés de l'angle droit : c = √(a² + b²).",
    'pythagorean-hypotenuse', "Longueur de l'hypoténuse (m)", ['legAM', 'legBM'],
    PILOT_PYTHAGORAS,
  ),
  m(
    '1.12', 'Mathématiques', S4,
    "[Maths·4e] Le théorème de Thalès et la hauteur de la pyramide — Thalès de Milet (VIe s. av. J.-C.)",
    "Plutarque et Diogène Laërce rapportent que Thalès, en Égypte, détermina la hauteur de la grande pyramide sans l'escalader, en comparant l'ombre d'un bâton à celle du monument au même instant.",
    "Deux objets éclairés par le même Soleil forment des triangles de même forme : le rapport hauteur / longueur d'ombre est identique. On en déduit une hauteur inaccessible depuis celle d'un bâton témoin.",
    'thales-shadow-ratio', "Hauteur estimée de l'objet", ['stickHeightM', 'stickShadowM', 'targetShadowM'],
  ),
  m(
    '1.13', 'Mathématiques', S4,
    "[Maths·4e] Les puissances de 10 : « L'Arénaire » d'Archimède",
    "Pour réfuter l'idée que le nombre de grains de sable est infini, Archimède construit dans « L'Arénaire » un système capable de nommer des nombres gigantesques et estime qu'il faudrait ~10⁶³ grains pour remplir l'Univers connu.",
    "Un tas « innombrable » se chiffre : nombre de grains = volume du récipient × nombre de grains par cm³, résultat qui s'exprime naturellement en puissances de 10.",
    'grain-count', 'Nombre estimé de grains', ['containerVolumeCm3', 'grainsPerCm3'],
  ),
  m(
    '1.14', 'Mathématiques', S4,
    "[Maths·4e] La racine carrée et l'incommensurable — Hippase de Métaponte (Ve s. av. J.-C.)",
    "Les pythagoriciens pensaient que toute longueur était un rapport d'entiers. La diagonale d'un carré de côté 1 les met en échec : son carré vaut 2 et aucune fraction n'a un carré égal à 2.",
    "La diagonale d'un carré de côté c vaut c × √2, un nombre que l'on ne peut qu'encadrer aussi finement qu'on veut.",
    'square-diagonal', 'Diagonale du carré (m)', ['sideM'],
  ),
  m(
    '1.15', 'Mathématiques', S4,
    '[Maths·4e] La trigonométrie du triangle rectangle — Hipparque de Nicée ; Ptolémée',
    "Pour calculer des positions sur la sphère céleste, Hipparque dresse vers 150 av. J.-C. la première table de cordes, reprise et affinée par Ptolémée dans l'« Almageste ».",
    "Un angle d'élévation et une distance au pied d'un objet suffisent pour sa hauteur : h = distance × tan(angle) + hauteur des yeux.",
    'height-from-angle', 'Hauteur estimée (m)', ['distanceM', 'elevationAngleDeg', 'eyeHeightM'],
  ),
  m(
    '1.16', 'Mathématiques', S3,
    '[Maths·3e] La fonction et le graphique — Nicole Oresme (Paris, XIVe s.)',
    "Dans son « Traité des configurations des qualités », Nicole Oresme porte l'étendue sur une ligne et l'intensité sur des segments verticaux : la figure « montre » comment une grandeur dépend d'une autre.",
    "Pour un mouvement à allure régulière, la distance est proportionnelle au temps : le graphique est une droite dont la pente est la vitesse moyenne, v = d / t.",
    'average-speed', 'Vitesse moyenne (m/s)', ['distanceM', 'timeS'],
  ),
  m(
    '1.17', 'Mathématiques', S3,
    '[Maths·3e] Le mètre et la méridienne — Delambre et Méchain (1792-1799)',
    "Pour définir une unité universelle, Delambre et Méchain mesurent de 1792 à 1799 l'arc de méridien Dunkerque-Barcelone par triangulation : une seule base au sol, tous les autres côtés calculés par les angles.",
    "Un triangle est entièrement déterminé par un côté et deux angles : AC = base × sin(B) / sin(A + B). On obtient de longues distances sans les parcourir.",
    'triangulation-distance', 'Distance calculée (m)', ['baseM', 'angleADeg', 'angleBDeg'],
  ),
  m(
    '1.18', 'Mathématiques', S3,
    '[Maths·3e] Le hasard mis en équation — Pascal et Fermat (1654)',
    "En 1654, le chevalier de Méré soumet à Pascal le problème du partage des mises d'une partie interrompue. La correspondance Pascal-Fermat fonde le calcul des probabilités.",
    "Dans une situation d'équiprobabilité, la probabilité d'un événement est le quotient du nombre de cas favorables par le nombre de cas possibles, entre 0 et 1.",
    'equiprobability', 'Probabilité', ['favorableOutcomes', 'totalOutcomes'],
  ),

  // ------------------------- M2 · Physique -------------------------
  m(
    '2.1', 'Physique', S6,
    '[Physique·6e] Le mouvement et sa relativité — Galilée, Dialogue (1632)',
    "Pour lever l'objection au mouvement de la Terre, Galilée imagine la cabine d'un navire : enfermé sans regarder dehors, aucun passager ne peut détecter un mouvement à vitesse constante.",
    "Le mouvement n'a de sens que par rapport à un observateur : la vitesse d'un objet vue par un observateur = vitesse de l'objet − vitesse de l'observateur.",
    'relative-velocity', 'Vitesse relative (m/s)', ['objectVelocityMs', 'observerVelocityMs'],
  ),
  m(
    '2.2', 'Physique', S6,
    '[Physique·6e] La vitesse et la chute des corps — Galilée, plan incliné (Padoue)',
    "Ne pouvant chronométrer une chute libre, Galilée fait rouler des billes sur un plan très peu incliné et découvre que la distance parcourue est proportionnelle au carré du temps, indépendamment de la masse.",
    "Un mouvement uniformément accéléré sans vitesse initiale suit d = ½ a t² : on en déduit l'accélération a = 2 d / t².",
    'acceleration-from-drop', 'Accélération (m/s²)', ['distanceM', 'timeS'],
  ),
  m(
    '2.3', 'Physique', S6,
    '[Physique·6e] Poids, masse et gravitation — Newton, Principia (1687)',
    "Newton unifie la chute d'une pomme et le mouvement de la Lune dans une même force, la gravitation universelle. Elle explique pourquoi un corps « pèse » moins en altitude ou sur la Lune.",
    "La masse (kg) est propre à la matière ; le poids (N) dépend de l'astre : P = m × g, où g est l'intensité de la pesanteur du lieu.",
    'weight-from-mass', 'Poids (N)', ['massKg', 'gravityNPerKg'],
    PILOT_WEIGHT_MASS,
  ),
  m(
    '2.4', 'Physique', S6,
    "[Physique·6e] La densité et la flottaison — Archimède et la couronne d'Hiéron II",
    "Chargé de vérifier sans l'abîmer si la couronne du roi Hiéron II est en or pur, Archimède compare le volume d'eau qu'elle déplace à celui d'une même masse d'or.",
    "La masse volumique = masse / volume déplacé. Comparée à celle de l'eau (1 g/cm³), elle dit si un corps flotte (< 1) ou coule (> 1).",
    'density', 'Masse volumique (g/cm³)', ['massG', 'displacedVolumeCm3'],
    PILOT_DENSITY,
  ),
  m(
    '2.5', 'Physique', S6,
    '[Physique·6e] La place de la Terre dans le système solaire — Copernic (1543) ; Galilée (1610)',
    "Copernic place le Soleil au centre ; Galilée, à la lunette, découvre les satellites de Jupiter et les phases de Vénus. La matière est concentrée dans quelques astres séparés par un espace immense.",
    "Sur une maquette à l'échelle, la taille d'un astre = sa grandeur réelle divisée par le nombre de km représenté par 1 cm de maquette.",
    'scale-model', 'Taille sur la maquette (cm)', ['realValueKm', 'kmPerCm'],
  ),
  m(
    '2.6', 'Physique', S5,
    "[Physique·5e] Les ombres et la propagation rectiligne — le gnomon ionien ; Thalès",
    "En suivant l'ombre d'une tige verticale au fil du jour, les savants de Milet repèrent le midi, le nord et les solstices : c'est, selon le programme, « la première loi scientifique connue de l'Humanité ».",
    "La lumière se propageant en ligne droite, l'ombre a un bord net et une longueur calculable : hauteur du Soleil = arctan(hauteur du gnomon / longueur de l'ombre).",
    'sun-elevation-from-shadow', 'Hauteur du Soleil (°)', ['gnomonHeightM', 'shadowLengthM'],
    PILOT_SHADOW_LINE,
  ),
  m(
    '2.7', 'Physique', S5,
    "[Physique·5e] Les sources de lumière et la vision — Ibn al-Haytham (Le Caire, v. 1021)",
    "Dans le « Kitāb al-Manāzir », Alhazen tranche entre les théories de la vision : on ne voit un objet éclairé que si de la lumière entre dans l'œil, comme dans une chambre noire.",
    "Dans une chambre noire, la taille de l'image = taille de l'objet × profondeur de la boîte / distance de l'objet (triangles semblables).",
    'pinhole-image-size', "Taille de l'image (m)", ['objectSizeM', 'objectDistanceM', 'boxDepthM'],
  ),
  m(
    '2.8', 'Physique', S5,
    "[Physique·5e] Les phases de la Lune et les éclipses — Aristarque de Samos",
    "Aristarque exploite la géométrie de la Lune à demi éclairée pour comparer les distances du Soleil et de la Lune ; Hérodote attribue à Thalès la prévision de l'éclipse de −585.",
    "La fraction éclairée de la Lune vue de la Terre dépend de l'angle de phase : f = (1 + cos(angle)) / 2, de 0 (nouvelle Lune) à 1 (pleine Lune).",
    'illuminated-fraction', 'Fraction éclairée', ['phaseAngleDeg'],
  ),
  m(
    '2.9', 'Physique', S5,
    '[Physique·5e] Le circuit électrique et la pile — Volta (Pavie, 1799-1800)',
    "Contre l'« électricité animale » de Galvani, Volta empile des disques de zinc et de cuivre séparés par du drap salé : la pile débite un courant continu stable, sans grenouille.",
    "Empiler des éléments identiques additionne les tensions : tension de la pile = nombre d'éléments × tension par élément.",
    'pile-voltage', 'Tension de la pile (V)', ['cellCount', 'voltagePerCellV'],
    PILOT_CIRCUIT_PILE,
  ),
  m(
    '2.10', 'Physique', S4,
    '[Physique·4e] Intensité, tension et lois du courant — Ørsted (1820) ; Ampère (1820)',
    "Après qu'Ørsted a montré à Copenhague qu'un courant dévie une boussole, Ampère met en équations, en quelques semaines à Paris, les forces entre courants et fait de l'intensité une grandeur mesurable.",
    "Loi des nœuds : dans un circuit avec dérivations, l'intensité du tronc commun est la somme des intensités des branches.",
    'branch-current-sum', 'Intensité dans le tronc (A)', ['branchCurrent1A', 'branchCurrent2A'],
  ),
  m(
    '2.11', 'Physique', S4,
    "[Physique·4e] La loi d'Ohm — Georg Ohm (Cologne, 1827)",
    "Vers 1826, Ohm fait varier la tension appliquée à des fils métalliques et mesure l'intensité obtenue. Il publie en 1827 la relation U = R × I, longtemps mal accueillie.",
    "Pour un dipôle ohmique, la tension est proportionnelle à l'intensité ; le coefficient est la résistance : R = U / I (en ohms).",
    'ohm-resistance', 'Résistance (Ω)', ['voltageV', 'currentA'],
  ),
  m(
    '2.12', 'Physique', S4,
    '[Physique·4e] La décomposition de la lumière blanche — Newton, prisme (1666)',
    "Newton fait passer un filet de lumière solaire dans un prisme et obtient un spectre continu. Son « experimentum crucis » prouve que le prisme sépare sans teinter : la lumière blanche contient toutes les couleurs.",
    "Avec un réseau (ou un CD), l'écart angulaire d'une couleur donne sa longueur d'onde : λ = pas du réseau × sin(angle) / ordre de diffraction.",
    'grating-wavelength', "Longueur d'onde (nm)", ['lineSpacingNm', 'diffractionAngleDeg', 'order'],
  ),
  m(
    '2.13', 'Physique', S4,
    '[Physique·4e] Les lentilles et la lunette astronomique — Lippershey (1608) ; Galilée ; Kepler',
    "En 1608, à Middelbourg, Lippershey dépose une demande de brevet pour un instrument à deux lentilles. Dès 1609, Galilée construit la sienne et la tourne vers le ciel ; Kepler en explique le trajet des rayons.",
    "Le grossissement d'une lunette = distance focale de l'objectif / distance focale de l'oculaire.",
    'telescope-magnification', 'Grossissement', ['objectiveFocalMm', 'eyepieceFocalMm'],
  ),
  m(
    '2.14', 'Physique', S4,
    '[Physique·4e] La vitesse de la lumière — Rømer (1676) ; Fizeau (1849)',
    "À l'Observatoire de Paris, Rømer déduit du retard des éclipses de Io que la lumière a une vitesse finie. En 1849, Fizeau en donne la première mesure terrestre avec une roue dentée entre Suresnes et Montmartre.",
    "La lumière a une vitesse finie : durée de trajet = distance / vitesse. Sur les distances astronomiques, ces durées s'expriment en puissances de 10.",
    'light-travel-time', 'Durée de trajet (s)', ['distanceM', 'speedMs'],
  ),
  m(
    '2.15', 'Physique', S3,
    '[Physique·3e] Les forces et leur représentation — Stevin (1586) ; Newton (1687)',
    "Stevin établit la composition des forces par le parallélogramme grâce à sa « chaîne de billes » qui ne se met pas en mouvement toute seule. Newton en fixe le cadre général dans les « Principia ».",
    "Deux forces perpendiculaires se composent en une résultante de valeur √(Fx² + Fy²) (règle du parallélogramme).",
    'resultant-force', 'Force résultante (N)', ['forceXN', 'forceYN'],
  ),
  m(
    '2.16', 'Physique', S3,
    '[Physique·3e] L’énergie mécanique et sa conservation — Émilie du Châtelet (Cirey, 1740)',
    "Dans ses « Institutions de physique », Émilie du Châtelet défend la « force vive » (mv²) : l'enfoncement d'une bille dans l'argile croît comme le carré de la vitesse d'impact, non comme la vitesse.",
    "L'énergie de mouvement croît comme le carré de la vitesse : Ec = ½ m v² (en joules). Elle quadruple quand la vitesse double.",
    'kinetic-energy', 'Énergie cinétique (J)', ['massKg', 'speedMs'],
  ),

  // ------------------------- M3 · Chimie -------------------------
  m(
    '3.1', 'Chimie', S6,
    '[Chimie·6e] États de la matière et palier de température — Joseph Black (Glasgow, 1761)',
    "Black constate qu'un mélange de glace et d'eau reste bloqué à 0 °C tant qu'il fond, même chauffé : la chaleur apportée est « latente », elle sert à changer l'état.",
    "En mélangeant deux masses d'eau, la température d'équilibre est la moyenne pondérée par les masses : (m₁T₁ + m₂T₂) / (m₁ + m₂).",
    'mixture-temperature', "Température d'équilibre (°C)", ['mass1G', 'temp1C', 'mass2G', 'temp2C'],
    PILOT_MELTING_PLATEAU,
  ),
  m(
    '3.2', 'Chimie', S6,
    '[Chimie·6e] Mélanges, corps purs et test à l’eau de chaux — Joseph Black (Édimbourg, 1754)',
    "En chauffant de la « magnésie blanche », Black isole un gaz qui éteint la flamme et trouble l'eau de chaux : le dioxyde de carbone, premier « air » identifié par un test reproductible.",
    "Évaporer une eau minérale laisse un résidu sec : sa concentration = masse du résidu (mg) / volume évaporé (L). « Homogène » ne veut pas dire « pur ».",
    'dissolved-solids', 'Résidu sec (mg/L)', ['residueMassMg', 'sampleVolumeL'],
    PILOT_CO2_LIMEWATER,
  ),
  m(
    '3.3', 'Chimie', S5,
    '[Chimie·5e] La distillation — Marie la Juive (Alexandrie) ; Jabir ibn Hayyan ; al-Razi',
    "Séparer les constituants d'un liquide en jouant sur leurs températures d'ébullition est un savoir ancien : l'alambic et le bain-marie remontent à l'Alexandrie hellénistique et au monde arabo-persan.",
    "Rendement d'une distillation = volume de distillat recueilli / volume initial, exprimé en pourcentage. Seule l'eau se vaporise puis se condense à part.",
    'distillation-yield', 'Rendement de distillation (%)', ['distillateVolumeMl', 'initialVolumeMl'],
  ),
  m(
    '3.4', 'Chimie', S5,
    '[Chimie·5e] La dissolution et la conservation de la masse — Lavoisier (Traité, 1789)',
    "Quand on dissout du sucre dans l'eau, il disparaît à la vue. Lavoisier énonce en 1789 que « rien ne se perd » : la balance ne bouge pas.",
    "Lors d'une dissolution, la masse de la solution = masse du soluté + masse du solvant : le soluté invisible n'est pas perdu.",
    'solution-mass', 'Masse de la solution (g)', ['soluteMassG', 'solventMassG'],
    PILOT_MASS_CONSERVATION,
  ),
  m(
    '3.5', 'Chimie', S5,
    '[Chimie·5e] La chromatographie — Mikhaïl Tsvet (Varsovie, 1900-1906)',
    "Cherchant si le vert des feuilles est une seule substance, Tsvet fait migrer un extrait végétal dans un tube de poudre blanche : les pigments se séparent en bandes de couleurs.",
    "Le rapport frontal Rf = distance parcourue par le constituant / distance parcourue par le solvant, entre 0 et 1. Deux Rf différents révèlent un mélange.",
    'retention-factor', 'Rapport frontal Rf', ['soluteMigrationMm', 'solventFrontMm'],
  ),
  m(
    '3.6', 'Chimie', S5,
    "[Chimie·5e] La conservation de la masse : la pesée — Lavoisier, calcination de l'étain (v. 1774)",
    "Contre la théorie du phlogistique, Lavoisier chauffe de l'étain en vase scellé : la masse totale ne change pas, et le métal calciné s'est alourdi de la masse d'air entré à l'ouverture.",
    "En système fermé, la masse ne change pas : l'écart (masse des produits − masse des réactifs) doit être proche de zéro, quelles que soient les transformations internes.",
    'mass-balance', "Écart de masse (g)", ['reactantsMassG', 'productsMassG'],
  ),
  m(
    '3.7', 'Chimie', S4,
    "[Chimie·4e] La composition de l'air — Priestley (1774) ; Lavoisier (expérience des 12 jours)",
    "Priestley, Scheele et Rutherford isolent vers 1774 les « airs » qui composent l'atmosphère. Lavoisier chauffe du mercure douze jours : le volume d'air diminue d'environ un cinquième.",
    "Quand une combustion ou une oxydation consomme le dioxygène d'un volume d'air clos, l'eau monte : fraction de dioxygène = montée d'eau / volume d'air initial (≈ 0,21).",
    'oxygen-fraction', 'Fraction de dioxygène', ['waterRiseMl', 'initialAirMl'],
    PILOT_AIR_OXYGEN,
  ),
  m(
    '3.8', 'Chimie', S4,
    "[Chimie·4e] Le modèle de l'atome et de la molécule — Démocrite ; Dalton (1808) ; Perrin (1908)",
    "L'atomisme, hypothèse philosophique chez Démocrite, redevient scientifique avec Dalton (loi des proportions multiples, 1808), puis est confirmé par Perrin en mesurant le mouvement brownien.",
    "En mélangeant deux liquides comme l'eau et l'alcool, le volume total est inférieur à la somme : contraction = (V₁ + V₂) − V(mélange), signe que la matière est faite de grains séparés par du vide.",
    'volume-contraction', 'Contraction de volume (mL)', ['volumeAMl', 'volumeBMl', 'mixedVolumeMl'],
  ),
  m(
    '3.9', 'Chimie', S4,
    "[Chimie·4e] Les combustions et le rôle du dioxygène — Lavoisier contre le phlogistique",
    "Lavoisier renverse l'explication de la combustion : brûler, c'est se combiner avec le dioxygène de l'air. Une bougie sous cloche s'éteint quand ce dioxygène est épuisé.",
    "La durée de combustion d'une bougie sous cloche est proportionnelle au volume d'air disponible (triangle du feu : combustible + comburant + chaleur).",
    'combustion-duration', 'Durée de combustion estimée (s)', ['referenceVolumeMl', 'referenceTimeS', 'targetVolumeMl'],
  ),
  m(
    '3.10', 'Chimie', S4,
    "[Chimie·4e] L'équation de réaction et la conservation des atomes — Lavoisier + Dalton ; Berzelius",
    "Avec le modèle atomique de Dalton, la conservation de la masse prend un sens plus profond : une transformation ne fait que redistribuer des atomes indestructibles.",
    "Les atomes se réarrangent sans disparaître : la masse totale des produits est égale à la somme des masses des réactifs.",
    'conserved-product-mass', 'Masse totale des produits (g)', ['reactant1MassG', 'reactant2MassG'],
  ),
  m(
    '3.11', 'Chimie', S3,
    "[Chimie·3e] L'électrolyse et la synthèse de l'eau — Nicholson et Carlisle (Londres, 1800)",
    "Quelques semaines après l'annonce de la pile de Volta, Nicholson et Carlisle plongent deux fils dans l'eau : un gaz se dégage à chaque fil, dans le rapport de volumes 2 pour 1.",
    "L'électrolyse de l'eau produit du dihydrogène et du dioxygène dans un rapport de volumes proche de 2 : V(H₂) / V(O₂).",
    'electrolysis-gas-ratio', 'Rapport V(H₂) / V(O₂)', ['hydrogenVolumeMl', 'oxygenVolumeMl'],
  ),
  m(
    '3.12', 'Chimie', S3,
    "[Chimie·3e] Métaux, rouille et oxydoréduction — Lavoisier ; Goldschmidt (1893) ; Sorel (1837)",
    "Calciner un métal, c'est le combiner avec l'oxygène : lentement (la rouille) ou vivement (la laine de fer qui brûle en étincelles). L'opération inverse arrache l'oxygène à l'oxyde.",
    "En s'oxydant, un métal fixe le dioxygène de l'air : gain de masse = masse finale − masse initiale (positif).",
    'oxidation-mass-gain', 'Gain de masse (g)', ['initialMassG', 'finalMassG'],
  ),
  m(
    '3.13', 'Chimie', S3,
    '[Chimie·3e] Acides, bases et pH — Robert Boyle (1664) ; Sørensen (1909)',
    "Boyle remarque que le sirop de violette et la teinture de tournesol changent de couleur selon le liquide : les premiers indicateurs colorés. En 1909, Sørensen introduit l'échelle chiffrée de pH.",
    "Diluer un acide fort d'un facteur k divise la concentration en ions H⁺ par k, donc augmente le pH de log₁₀(k), sans jamais dépasser la neutralité.",
    'diluted-acid-ph', 'pH après dilution', ['initialPh', 'dilutionFactor'],
  ),
  m(
    '3.14', 'Chimie', S3,
    '[Chimie·3e] Les ions et la conductivité des solutions — Faraday (1834) ; Arrhenius (1884)',
    "Faraday forge le vocabulaire d'« ion » et d'« électrode ». Arrhenius soutient en 1884 que certains composés sont déjà dissociés en ions dans la solution, ce qui la rend conductrice.",
    "Plus une solution contient d'ions, mieux elle conduit : le rapport intensité(solution) / intensité(eau de référence) mesure cet apport.",
    'conductivity-ratio', 'Rapport de conductivité', ['solutionCurrentMa', 'referenceCurrentMa'],
  ),

  // ------------------------- M4 · SVT -------------------------
  m(
    '4.1', 'SVT', S6,
    '[SVT·6e] La cellule, unité du vivant — Hooke (1665) ; Leeuwenhoek ; Schleiden et Schwann',
    "Hooke observe dans le liège des logettes qu'il nomme « cellules » ; Leeuwenhoek découvre les « animalcules ». En 1838-1839, Schleiden et Schwann énoncent que tout être vivant est fait de cellules.",
    "Au microscope, la taille d'une cellule = diamètre du champ observé / nombre de cellules alignées en travers du champ.",
    'cell-size', "Taille d'une cellule (µm)", ['fieldOfViewUm', 'cellsAcrossField'],
    PILOT_CELL_UNIT,
  ),
  m(
    '4.2', 'SVT', S6,
    '[SVT·6e] Classer le vivant : les groupes emboîtés — Linné (1735) ; Hennig (1950)',
    "Linné attribue à chaque espèce un nom en deux mots et une hiérarchie de rangs. Hennig propose en 1950 de classer par les caractères nouveaux partagés, en groupes emboîtés comme des poupées russes.",
    "On classe par ce que les êtres ont en commun : la part d'attributs partagés = attributs communs / attributs observés.",
    'shared-trait-ratio', "Part d'attributs partagés", ['sharedTraits', 'observedTraits'],
  ),
  m(
    '4.3', 'SVT', S6,
    "[SVT·6e] Les fossiles et l'histoire de la Terre — Nicolas Sténon (Florence, 1667-1669)",
    "Sténon compare les « langues de pierre » de Malte aux dents d'un requin disséqué : ce sont des dents fossiles. Il énonce le principe de superposition des strates.",
    "En connaissant la vitesse de sédimentation, l'âge d'une strate se déduit de sa profondeur : âge = profondeur / vitesse.",
    'stratum-age', 'Âge relatif de la strate (ans)', ['depthCm', 'sedimentationRateCmPerCentury'],
  ),
  m(
    '4.4', 'SVT', S6,
    "[SVT·6e] Des espèces disparues : la réalité de l'extinction — Cuvier (Muséum de Paris, 1796)",
    "En comparant les os d'éléphants vivants et des grands os fossiles de Sibérie, Cuvier démontre que le mammouth est une espèce distincte, éteinte : le monde vivant a une histoire.",
    "On compare une structure homologue entre forme fossile et forme actuelle : rapport = mesure fossile / mesure actuelle. Un écart net et constant signe une espèce distincte.",
    'morphological-ratio', 'Rapport morphologique', ['fossilMeasureMm', 'livingMeasureMm'],
  ),
  m(
    '4.5', 'SVT', S6,
    "[SVT·6e] D'où vient la matière des plantes ? — Van Helmont, expérience du saule (v. 1640)",
    "Van Helmont plante une bouture de 2,3 kg dans 90 kg de terre sèche, n'arrose qu'à l'eau de pluie : cinq ans plus tard l'arbre pèse ~77 kg et la terre n'a presque rien perdu.",
    "La matière produite par la plante = masse finale − masse initiale du plant, à comparer à la perte de masse (quasi nulle) de la terre.",
    'plant-mass-gain', 'Matière produite par la plante (g)', ['initialPlantMassG', 'finalPlantMassG'],
    PILOT_PLANT_MATTER,
  ),
  m(
    '4.6', 'SVT', S6,
    "[SVT·6e] Humus, décomposeurs et vers de terre — Darwin, Down House (1837-1881)",
    "Pendant quarante ans, Darwin mesure l'enfoncement d'une « pierre à vers » et estime que les vers font passer plusieurs tonnes de terre par hectare et par an, enfouissant la litière.",
    "Les vers de terre remontent le sol : vitesse d'enfouissement d'une dalle témoin = enfoncement mesuré / durée, en mm par jour.",
    'burial-rate', "Vitesse d'enfouissement (mm/jour)", ['sinkingMm', 'durationDays'],
    PILOT_EARTHWORM,
  ),
  m(
    '4.7', 'SVT', S6,
    '[SVT·6e] Micro-organismes et transformation des aliments — Appert (v. 1795-1810) ; Pasteur (1857)',
    "Appert conserve les aliments par chauffage en bocal scellé, sans savoir pourquoi. Pasteur montre que fermentations et altérations sont l'œuvre de micro-organismes vivants.",
    "Les micro-organismes (levure) font lever la pâte : coefficient de levée = hauteur finale / hauteur initiale (1 = pas de levée, sans levure).",
    'dough-rise-ratio', 'Coefficient de levée de la pâte', ['finalHeightMm', 'initialHeightMm'],
  ),
  m(
    '4.8', 'SVT', S5,
    '[SVT·5e] Les séismes : ondes, foyer et épicentre — Michell (1760) ; Milne (1880) ; Richter (1935)',
    "Après le séisme de Lisbonne (1755), Michell propose qu'un tremblement de terre est une onde élastique partant d'un foyer. Milne construit le sismographe moderne, Richter l'échelle de magnitude.",
    "Règle d'Omori : la distance à l'épicentre (km) vaut environ 8 fois l'écart de temps d'arrivée entre l'onde lente (S) et l'onde rapide (P), en secondes.",
    'epicentral-distance', "Distance à l'épicentre (km)", ['sMinusPSeconds'],
  ),
  m(
    '4.9', 'SVT', S5,
    "[SVT·5e] Les volcans : le témoignage du Vésuve — Pline le Jeune (79 apr. J.-C.)",
    "Depuis Misène, Pline le Jeune décrit dans deux lettres à Tacite le nuage « en pin parasol », les retombées de cendres et la mort de son oncle : le premier compte rendu précis d'une éruption.",
    "Une lave fluide (éruption effusive) s'écoule : sa vitesse = distance parcourue par le front de coulée / durée.",
    'lava-flow-speed', 'Vitesse de la coulée (m/s)', ['flowDistanceM', 'durationS'],
  ),
  m(
    '4.10', 'SVT', S5,
    "[SVT·5e] La respiration : le dioxygène et l'organisme — Lavoisier et Séguin (Paris, 1790)",
    "Lavoisier mesure le dioxygène consommé et le dioxyde de carbone rejeté par Séguin au repos, en digestion et à l'effort : la respiration est une combustion lente qui s'intensifie avec l'activité.",
    "Débit ventilatoire = volume d'un souffle × nombre de respirations par minute. Il augmente nettement à l'effort.",
    'ventilation-rate', 'Débit ventilatoire (mL/min)', ['breathVolumeMl', 'breathsPerMinute'],
    PILOT_RESPIRATION,
  ),
  m(
    '4.11', 'SVT', S5,
    '[SVT·5e] La digestion : une transformation chimique — Spallanzani (v. 1780) ; Beaumont (1822-1833)',
    "Spallanzani avale des tubes contenant de la viande et montre qu'elle est dissoute sans être écrasée. Beaumont observe la digestion à travers la fistule d'estomac d'Alexis Saint-Martin.",
    "La digestion est une transformation chimique : vitesse = fraction d'amidon transformée / durée (min). Elle est nulle sans salive ou à froid.",
    'digestion-rate', 'Vitesse de digestion (fraction/min)', ['transformedFraction', 'durationMin'],
  ),
  m(
    '4.12', 'SVT', S5,
    '[SVT·5e] Micro-organismes, hygiène et transmission — Semmelweis (1847) ; John Snow (1854)',
    "Semmelweis impose le lavage des mains chlorées et fait chuter la fièvre puerpérale. Snow cartographie une flambée de choléra à Soho et la relie à la pompe de Broad Street.",
    "Enquête de terrain : taux d'attaque d'une source suspecte = nombre de malades exposés / nombre total d'exposés à cette source.",
    'attack-rate', "Taux d'attaque", ['cases', 'exposed'],
    PILOT_OUTBREAK,
  ),
  m(
    '4.13', 'SVT', S4,
    '[SVT·4e] La photosynthèse : convertir la lumière en matière — Ingenhousz (1779) ; de Saussure (1804) ; Sachs (1862)',
    "Ingenhousz montre que les plantes ne purifient l'air qu'à la lumière et par leurs parties vertes ; Sachs révèle l'amidon formé dans les feuilles éclairées.",
    "À la lumière, l'élodée dégage du dioxygène : le débit de bulles (bulles / minute) mesure l'intensité de la photosynthèse.",
    'photosynthesis-bubble-rate', 'Débit de bulles (bulles/min)', ['bubbleCount', 'durationMinutes'],
  ),
  m(
    '4.14', 'SVT', S4,
    "[SVT·4e] L'ADN et l'hérédité — Mendel, jardin du monastère de Brno (1856-1863)",
    "Mendel croise près de 30 000 plants de pois et découvre des régularités numériques : un caractère peut sauter une génération, et les proportions de la 2ᵉ génération approchent 3 pour 1.",
    "À la deuxième génération, le rapport (individus à caractère dominant) / (individus à caractère récessif) se rapproche de 3.",
    'phenotype-ratio', 'Rapport dominant / récessif', ['dominantCount', 'recessiveCount'],
    PILOT_MENDEL,
  ),
  m(
    '4.15', 'SVT', S4,
    '[SVT·4e] La circulation du sang et le rôle du cœur — William Harvey (Londres, 1628)',
    "Harvey calcule qu'en une heure le cœur chasse bien plus de sang que n'en contient le corps : il est impossible que le sang soit sans cesse fabriqué et détruit, il circule en boucle.",
    "Débit cardiaque = volume chassé par battement × fréquence cardiaque. En une heure, il dépasse la masse du corps.",
    'cardiac-output', 'Débit cardiaque (mL/min)', ['strokeVolumeMl', 'heartRateBpm'],
  ),
  m(
    '4.16', 'SVT', S4,
    "[SVT·4e] Le cycle du carbone et l'effet de serre — Fourier (1824) ; Tyndall (1859) ; Keeling (1958)",
    "Fourier propose que l'atmosphère retient une partie de la chaleur ; Tyndall mesure l'absorption du rayonnement par le CO₂ ; Keeling suit depuis 1958 la hausse continue du CO₂ atmosphérique.",
    "Deux bocaux au soleil : celui enrichi en dioxyde de carbone monte plus haut en température. Écart = température du bocal CO₂ − température du bocal air.",
    'greenhouse-warming', 'Écart de température (°C)', ['co2JarTempC', 'airJarTempC'],
  ),
  m(
    '4.17', 'SVT', S4,
    '[SVT·4e] La tectonique des plaques — Wegener (1912) ; océanographie des années 1960',
    "Wegener avance que les continents formaient un seul bloc, la Pangée, aujourd'hui fragmenté. L'exploration des dorsales océaniques dans les années 1960 confirme que le plancher se crée et s'écarte.",
    "Les plaques bougent de quelques centimètres par an : déplacement = vitesse × durée.",
    'plate-displacement', 'Déplacement de la plaque (cm)', ['rateCmPerYear', 'years'],
  ),
  m(
    '4.18', 'SVT', S4,
    '[SVT·4e] Le système immunitaire et la vaccination — Jenner (1796) ; Pasteur, Pouilly-le-Fort (1881)',
    "Jenner inocule à James Phipps de la vaccine, puis la variole : l'enfant ne tombe pas malade. En 1881, Pasteur organise à Pouilly-le-Fort un essai public à deux lots contre le charbon.",
    "Essai contrôlé à deux lots : efficacité (%) = (1 − taux d'attaque du lot vacciné / taux d'attaque du lot témoin) × 100.",
    'vaccine-efficacy', 'Efficacité vaccinale (%)', ['controlAttackRate', 'vaccinatedAttackRate'],
  ),
  m(
    '4.19', 'SVT', S3,
    '[SVT·3e] La valeur énergétique des aliments — Lavoisier & Laplace (1782-1783) ; Atwater',
    "Lavoisier et Laplace mesurent la chaleur d'un cochon d'Inde avec un calorimètre à glace ; Atwater construit une chambre calorimétrique humaine et publie les « facteurs » encore utilisés sur les emballages.",
    "Calorimétrie de terrain : l'énergie libérée par un aliment qui brûle sous un récipient d'eau = masse d'eau × 4,2 × élévation de température (en joules).",
    'food-energy', 'Énergie libérée (J)', ['waterMassG', 'temperatureRiseC'],
  ),
  m(
    '4.20', 'SVT', S3,
    '[SVT·3e] Les sols : fertilité et érosion — Boussingault (1834) ; Liebig (1840)',
    "Boussingault pèse tout ce qui entre et sort de ses parcelles ; Liebig montre que les plantes prélèvent des éléments minéraux dans le sol. Le Dust Bowl des années 1930 illustre le coût d'un sol nu.",
    "Test d'infiltration : vitesse à laquelle un sol absorbe l'eau = volume versé / temps d'infiltration (mL/s). Un sol fertile est perméable.",
    'infiltration-rate', "Vitesse d'infiltration (mL/s)", ['waterVolumeMl', 'infiltrationTimeS'],
  ),
  m(
    '4.21', 'SVT', S5,
    '[SVT·5e] La reproduction sexuée et la fécondation — Camerarius, De sexu plantarum (1694)',
    "En retirant les étamines d'une fleur ou en isolant un pied femelle, Camerarius obtient des fruits sans graines viables : première démonstration expérimentale de la sexualité végétale.",
    "Taux de nouaison = nombre de fleurs ayant donné un fruit / nombre de fleurs suivies. Il s'effondre pour les fleurs isolées de tout pollen.",
    'fruit-set-rate', 'Taux de nouaison', ['fruitCount', 'flowerCount'],
  ),
];
