'use client';

import { useEffect, useState } from 'react';
import i18next from 'i18next';
import {
  initReactI18next,
  useTranslation as useTranslationOrg,
} from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { cookieName, getOptions, languages } from './settings';
import { useParams } from 'next/navigation';

const runsOnServerSide = typeof window === 'undefined';

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend(
      (language: string) => import(`./locales/${language}.json`),
    ),
  )
  .init({
    ...getOptions(),
    lng: undefined,
    detection: {
      order: ['path', 'htmlTag', 'cookie', 'navigator'],
    },
    preload: runsOnServerSide ? languages : [],
  });

export function useTranslation(ns?: string, options?: any) {
  const ret = useTranslationOrg(ns, options);
  const { i18n } = ret;
  const params = useParams();
  const lng =
    typeof params.locale === 'object' ? params.locale[0] : params.locale;

  // Hook을 조건 밖으로 이동
  const [activeLng, setActiveLng] = useState(i18n.resolvedLanguage);

  // 서버 사이드에서는 동기적으로 처리
  if (runsOnServerSide && lng && i18n.resolvedLanguage !== lng) {
    i18n.changeLanguage(lng);
  }

  // 클라이언트 사이드 효과
  useEffect(() => {
    if (activeLng === i18n.resolvedLanguage) return;
    setActiveLng(i18n.resolvedLanguage);
  }, [activeLng, i18n.resolvedLanguage]);

  useEffect(() => {
    if (!lng || i18n.resolvedLanguage === lng) return;
    i18n.changeLanguage(lng);
  }, [lng, i18n]);

  // Cookie 설정은 브라우저 자체 API 사용
  useEffect(() => {
    if (!lng || typeof window === 'undefined') return;
    document.cookie = `${cookieName}=${lng}; path=/; max-age=31536000`; // 1년
  }, [lng]);

  return ret;
}

type UseTranslationManualArgs = {
  ns?: string;
  options?: any;
  lng?: 'en' | 'ko';
};

export function useTranslationManual({
  ns,
  lng = 'en',
}: UseTranslationManualArgs = {}) {
  const ret = useTranslationOrg(ns, { lng });

  // Cookie 설정은 브라우저 자체 API 사용
  useEffect(() => {
    if (!lng || typeof window === 'undefined') return;
    document.cookie = `${cookieName}=${lng}; path=/; max-age=31536000`; // 1년
  }, [lng]);

  return ret;
}
