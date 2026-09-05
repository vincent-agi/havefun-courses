export const LAVA_FLOW_SPEED_FORMULA = 'lava-flow-speed';

/**
 * Issue 4.9 — Pline le Jeune, eruption du Vesuve (79 apr. J.-C.).
 * Une lave fluide (eruption effusive) s'ecoule ; sa vitesse = distance
 * parcourue par le front de coulee / duree.
 */
export function computeLavaFlowSpeed(
  measurements: Record<string, number>,
): number | null {
  const { flowDistanceM, durationS } = measurements;
  if (!flowDistanceM || !durationS || flowDistanceM <= 0 || durationS <= 0) {
    return null;
  }
  return flowDistanceM / durationS;
}
