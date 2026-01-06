'use client';

import { Badge } from '@openai/apps-sdk-ui/components/Badge';
import { useWidgetProps, useMaxHeight, useDisplayMode } from '@/hooks';

type GreetData = {
  name?: string;
  language?: string;
  greeting?: string;
  timestamp?: string;
  result?: {
    structuredContent?: {
      name?: string;
      language?: string;
      greeting?: string;
    };
  };
};

export default function GreetWidget() {
  const props = useWidgetProps<GreetData>();
  const maxHeight = useMaxHeight() ?? undefined;
  const displayMode = useDisplayMode();

  const data = props?.result?.structuredContent || props;
  const name = data?.name || 'Guest';
  const language = data?.language || 'ko';
  const greeting = data?.greeting || `안녕하세요, ${name}님!`;

  const languageEmoji: Record<string, string> = {
    ko: '🇰🇷',
    en: '🇺🇸',
    ja: '🇯🇵',
  };

  const languageLabel: Record<string, string> = {
    ko: '한국어',
    en: 'English',
    ja: '日本語',
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-gradient-to-br from-violet-950 via-purple-950 to-fuchsia-950 p-6"
      style={{
        maxHeight,
        height: displayMode === 'fullscreen' ? maxHeight : undefined,
      }}
    >
      <div className="w-full max-w-md">
        {/* 메인 카드 */}
        <div className="relative">
          {/* 글로우 효과 */}
          <div className="absolute -inset-1 animate-pulse rounded-3xl bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 opacity-60 blur-lg" />

          {/* 카드 본체 */}
          <div className="relative rounded-3xl border border-white/10 bg-slate-900/90 p-8 backdrop-blur-xl">
            {/* 이모지 애니메이션 */}
            <div className="mb-6 text-center">
              <span className="inline-block animate-bounce text-7xl">
                {languageEmoji[language] || '👋'}
              </span>
            </div>

            {/* 인사말 */}
            <h1 className="mb-6 text-center text-3xl leading-relaxed font-bold text-white">
              {greeting}
            </h1>

            {/* 정보 뱃지들 */}
            <div className="flex flex-wrap justify-center gap-3">
              <Badge className="px-4 py-2">
                <span className="mr-2">👤</span>
                {name}
              </Badge>
              <Badge className="px-4 py-2">
                <span className="mr-2">{languageEmoji[language]}</span>
                {languageLabel[language] || language.toUpperCase()}
              </Badge>
            </div>

            {/* 데코레이션 */}
            <div className="mt-8 flex justify-center gap-2">
              {['🎉', '✨', '🎊', '💫', '🌟'].map((emoji, i) => (
                <span
                  key={i}
                  className="animate-bounce text-2xl opacity-60"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  {emoji}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 푸터 */}
        <p className="mt-6 text-center text-sm text-slate-500">
          MCP Tool:{' '}
          <code className="rounded bg-slate-800/50 px-2 py-1">greet</code>
        </p>
      </div>
    </div>
  );
}
