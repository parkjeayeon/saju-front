'use client'

import {AppsSDKUIProvider} from "@openai/apps-sdk-ui/components/AppsSDKUIProvider";
import Link from "next/link";
import React from "react";

declare global {
    interface AppsSDKUIConfig {
        LinkComponent: typeof Link
    }
}

export function ChatgptUIProvider({children}: {
    children: React.ReactNode;
}) {
    return <AppsSDKUIProvider linkComponent={Link}>{children}</AppsSDKUIProvider>;
}