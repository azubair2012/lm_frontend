/**
 * Formatting Utilities
 * Data formatting and transformation functions
 */

export function formatTaxBand(band: string): string {
  if (!band) return 'Not specified';

  return `Band ${band.toUpperCase()}`;
}

export function formatEPC(rating: number | string | null): string {
  if (rating === null || rating === undefined || rating === '') return 'Not rated';

  if (typeof rating === 'string') {
    const letter = rating.trim().toUpperCase();
    if (/^[A-G]$/.test(letter)) return letter;
  }

  const value = typeof rating === 'string' ? Number(rating) : rating;
  if (!Number.isFinite(value)) return 'Not rated';

  // Backend normalises letter grades to ordinals A=1 .. G=7
  if (Number.isInteger(value) && value >= 1 && value <= 7) {
    return ['A', 'B', 'C', 'D', 'E', 'F', 'G'][value - 1] ?? 'Not rated';
  }

  // SAP-style numeric score (typical 0–100 scale)
  if (value >= 92) return 'A';
  if (value >= 81) return 'B';
  if (value >= 69) return 'C';
  if (value >= 55) return 'D';
  if (value >= 39) return 'E';
  if (value >= 21) return 'F';
  if (value >= 1) return 'G';

  return 'Not rated';
}

/** EPC as ordinal 1 (best) .. 7 (worst), matching backend `epcrating` when present. */
export function formatEPCOrdinal(rating: number | string | null): string {
  if (rating === null || rating === undefined || rating === '') return 'Not specified';

  const value = typeof rating === 'string' ? Number(rating.trim()) : rating;
  if (Number.isInteger(value) && value >= 1 && value <= 7) {
    return String(value);
  }

  const grade = formatEPC(rating);
  if (grade === 'Not rated') return 'Not specified';

  const ordinal = grade.charCodeAt(0) - 'A'.charCodeAt(0) + 1;
  if (ordinal >= 1 && ordinal <= 7) return String(ordinal);

  return 'Not specified';
}