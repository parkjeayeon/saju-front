import TestSection from '@/app/[locale]/(widgets)/widgets/saju/components/TestSection';

export default async function Page({
  params,
}: {
  params: Promise<{ locale: 'en' | 'ko' }>;
}) {
  const { locale } = await params;
  return <TestSection locale={locale} />;
}
