/**
 * Property listing STATUS badge (Rentman `STATUS` field).
 * Option A: show whenever trimmed value is non-empty. If Available/Unavailable feel noisy,
 * consider hiding only `Unavailable` — see docs/plan-property-status-badge.md.
 */
export function shouldShowStatusBadge(status: string | undefined | null): boolean {
  return String(status ?? '').trim().length > 0;
}
