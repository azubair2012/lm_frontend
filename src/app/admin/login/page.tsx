import { redirect } from 'next/navigation';

/** @deprecated Use `/login` — kept for bookmarks and old links */
export default async function LegacyAdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>;
}) {
  const params = await searchParams;
  const target = params.redirect;
  if (target && target.length > 0) {
    redirect(`/login?redirect=${encodeURIComponent(target)}`);
  }
  redirect('/login');
}
