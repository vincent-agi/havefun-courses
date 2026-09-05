export const SUN_ELEVATION_FROM_SHADOW_FORMULA = 'sun-elevation-from-shadow';

/**
 * Issue 2.6 — Gnomon ionien ; Thales, Milet (VIe s. av. J.-C.).
 * La propagation rectiligne donne a l'ombre une longueur exploitable :
 * hauteur du Soleil = arctan(hauteur du gnomon / longueur de l'ombre), en degres.
 */
export function computeSunElevationFromShadow(
  measurements: Record<string, number>,
): number | null {
  const { gnomonHeightM, shadowLengthM } = measurements;
  if (!gnomonHeightM || !shadowLengthM) return null;
  if (gnomonHeightM <= 0 || shadowLengthM <= 0) return null;
  return (Math.atan(gnomonHeightM / shadowLengthM) * 180) / Math.PI;
}
