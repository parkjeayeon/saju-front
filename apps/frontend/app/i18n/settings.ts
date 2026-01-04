// app/i18n/settings.ts
export const fallbackLng = 'ko';
export const languages:string[] = ['ko', 'en'] as const;
export const cookieName = "i18next";
export const defaultNS = 'common';

export type Locale = (typeof languages)[number];

export function getOptions(lng = fallbackLng, ns = defaultNS) {
    return {
        supportedLngs: languages,
        fallbackLng,
        lng,
        fallbackNS: defaultNS,
        defaultNS,
        ns,
    };
}