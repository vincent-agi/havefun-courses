export const NET_BALANCE_FORMULA = 'net-balance';

/**
 * Issue 1.7 — Brahmagupta, Brahmasphutasiddhanta (Inde, 628).
 * Nombres relatifs : une fortune et une dette de meme valeur s'annulent.
 * Solde net = total des credits - total des debits (peut etre negatif).
 */
export function computeNetBalance(
  measurements: Record<string, number>,
): number | null {
  const { credits, debits } = measurements;
  if (credits === undefined || debits === undefined) return null;
  if (credits < 0 || debits < 0) return null;
  if (!Number.isFinite(credits) || !Number.isFinite(debits)) return null;
  return credits - debits;
}
