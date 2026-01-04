import { NextResponse } from "next/server";
import acceptLanguage from "accept-language";
import { fallbackLng, languages, cookieName } from "./app/i18n/settings";

acceptLanguage.languages(languages);

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest|public|images|fonts|icons).*)"],
};

export function proxy(req: any) {
    let lng;
    if (req.cookies.has(cookieName)) lng = acceptLanguage.get(req.cookies.get(cookieName).value);
    if (!lng) lng = acceptLanguage.get(req.headers.get("Accept-Language"));
    if (!lng) lng = fallbackLng;

    const pathname = req.nextUrl.pathname;
    const search = req.nextUrl.search;

    // locale 없는 경로는 리다이렉트
    if (
        !languages.some((loc) => pathname.startsWith(`/${loc}`)) &&
        !pathname.startsWith("/_next")
    ) {
        return NextResponse.redirect(new URL(`/${lng}${pathname}${search}`, req.url));
    }

    // referer에서 언어 감지
    if (req.headers.has("referer")) {
        const refererUrl = new URL(req.headers.get("referer"));
        const lngInReferer = languages.find((l) => refererUrl.pathname.startsWith(`/${l}`));
        if (lngInReferer) {
            const response = NextResponse.next();
            response.cookies.set(cookieName, lngInReferer);
            return response;
        }
    }

    return NextResponse.next();
}