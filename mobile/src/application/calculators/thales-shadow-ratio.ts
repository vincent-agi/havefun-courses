export function computeThalesShadowRatio(
  measurements: Record<string, number>,
): number | null {
  const { stickHeightM, stickShadowM, targetShadowM } = measurements;
  if (!stickHeightM || !stickShadowM || !targetShadowM) return null;
  return (stickHeightM / stickShadowM) * targetShadowM;
}
