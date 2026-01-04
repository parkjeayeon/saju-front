'use client'

import {useTranslation} from "@/app/i18n/client";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Home() {
    const { i18n } = useTranslation();
    const pathname = usePathname();

    const getLocalizedPath = (newLocale: string) => {
        const segments = pathname.split('/');
        segments[1] = newLocale;
        return segments.join('/');
    };

    return (
        <div>
            <p>{i18n.t("title")}</p>
            <Link href={getLocalizedPath("en")}>
                <button>English</button>
            </Link>
            <Link href={getLocalizedPath("ko")}>
                <button>한국어</button>
            </Link>
        </div>
    );
}
