export const PLANT_MASS_GAIN_FORMULA = 'plant-mass-gain';

/**
 * Issue 4.5 — Van Helmont, experience du saule (Bruxelles, v. 1640).
 * La matiere produite par la plante = masse finale - masse initiale du plant,
 * a comparer a la perte de masse (quasi nulle) de la terre.
 */
export function computePlantMassGain(
  measurements: Record<string, number>,
): number | null {
  const { initialPlantMassG, finalPlantMassG } = measurements;
  if (!initialPlantMassG || finalPlantMassG === undefined) return null;
  if (initialPlantMassG <= 0 || finalPlantMassG < initialPlantMassG) return null;
  return finalPlantMassG - initialPlantMassG;
}
