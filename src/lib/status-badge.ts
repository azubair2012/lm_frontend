/**
 * Property listing STATUS badge (Rentman `STATUS` field).
 * Only show badge for special statuses. Hide "To Let" / "Available" as those are default.
 */
const HIDDEN_STATUSES = ['available', 'to let', ''];

export function shouldShowStatusBadge(status: string | undefined | null): boolean {
  const normalized = String(status ?? '').trim().toLowerCase();
  return normalized.length > 0 && !HIDDEN_STATUSES.includes(normalized);
}
