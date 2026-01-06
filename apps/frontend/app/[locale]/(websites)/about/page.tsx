'use client';

import { useTranslation, useTranslationManual } from '@/app/i18n/client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  const { i18n } = useTranslation();
  const pathname = usePathname();
  const { i18n: ti18 } = useTranslationManual({ lng: 'en' });

  const getLocalizedPath = (newLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    return segments.join('/');
  };

  return (
    <div>
      <p>{i18n.t('title')}</p>
      <p>{ti18.t('title')}</p>
      <p>{getLocalizedPath('en')}</p>
      <p>{getLocalizedPath('ko')}</p>

      <Link href={getLocalizedPath('en')}>
        <button>English</button>
      </Link>
      <Link href={getLocalizedPath('ko')}>
        <button>한국어</button>
      </Link>
    </div>
  );
}
