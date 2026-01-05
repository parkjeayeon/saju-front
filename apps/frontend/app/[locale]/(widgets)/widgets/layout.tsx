import type { Metadata } from 'next';
import { ChatgptUIProvider } from '@/components/providers/chatgpt-ui-provider';

export const metadata: Metadata = {
  other: {
    'openai/widgetCSP': JSON.stringify({
      connect_domains: ['https://refhubs.com'],
    }),
  },
};

// 클라이언트 측 차단 로직 제거
// - proxy.ts에서 서버 측으로 일반 브라우저 접근 차단
// - ChatGPT iframe에서는 window.openai 주입 타이밍 이슈가 있을 수 있음
export default function WidgetsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ChatgptUIProvider>{children}</ChatgptUIProvider>;
}
