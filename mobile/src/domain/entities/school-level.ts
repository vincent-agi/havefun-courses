export enum SchoolLevel {
  SIXIEME = '6e',
  CINQUIEME = '5e',
  QUATRIEME = '4e',
  TROISIEME = '3e',
  SECONDE = '2nde',
  PREMIERE = '1re',
  TERMINALE = 'terminale',
}

export const SCHOOL_LEVEL_LABELS: Record<SchoolLevel, string> = {
  [SchoolLevel.SIXIEME]: '6e',
  [SchoolLevel.CINQUIEME]: '5e',
  [SchoolLevel.QUATRIEME]: '4e',
  [SchoolLevel.TROISIEME]: '3e',
  [SchoolLevel.SECONDE]: '2nde',
  [SchoolLevel.PREMIERE]: '1re',
  [SchoolLevel.TERMINALE]: 'Terminale',
};
