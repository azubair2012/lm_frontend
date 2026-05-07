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

  // Return the numeric value as-is
  return String(rating);
}