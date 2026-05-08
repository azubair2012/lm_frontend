/**
 * Formatting Utilities
 * Data formatting and transformation functions
 */

export function formatPrice(price: string | number): string {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;

  if (isNaN(numPrice)) {
    return 'Price on request';
  }

  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(numPrice);
}

export function formatTaxBand(band: string): string {
  if (!band) return 'Not specified';

  return `Band ${band.toUpperCase()}`;
}

export function formatEPC(rating: number | string | null): string {
  if (rating === null || rating === undefined || rating === '') return 'Not rated';

  const value = typeof rating === 'string' ? Number(rating) : rating;
  if (!Number.isFinite(value)) return 'Not rated';

  // UK EPC bands by score
  if (value >= 92) return 'A';
  if (value >= 81) return 'B';
  if (value >= 69) return 'C';
  if (value >= 55) return 'D';
  if (value >= 39) return 'E';
  if (value >= 21) return 'F';
  if (value >= 1) return 'G';

  return 'Not rated';
}