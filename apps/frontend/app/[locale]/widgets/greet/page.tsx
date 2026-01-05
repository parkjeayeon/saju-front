// app/[locale]/widgets/greet/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from '@/app/i18n/client';

export default function GreetWidget() {
  const { t } = useTranslation();
  const [structuredData, setStructuredData] = useState<any>(null);

  useEffect(() => {
    // ChatGPT가 전달한 structuredContent 데이터 받기
    const handleMessage = (event: MessageEvent) => {
      // OpenAI Widget에서 전달되는 메시지 형식
      if (event.data?.type === 'structuredContent') {
        console.log('Received structuredContent:', event.data.content);
        setStructuredData(event.data.content);
      }
    };

    window.addEventListener('message', handleMessage);

    // 준비 완료 신호 보내기
    window.parent.postMessage({ type: 'widgetReady' }, '*');

    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // structuredContent가 없을 때 기본 화면
  if (!structuredData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
        <div className="text-center">
          greet
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-indigo-600"></div>
          <p className="text-gray-600">{t('loading')}</p>
        </div>
      </div>
    );
  }

  const { name, language, greeting, timestamp } = structuredData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-2xl border border-indigo-100 bg-white p-8 shadow-xl">
          {/* 헤더 */}
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-indigo-900">
              {language === 'ko' ? '🎉 인사하기' : '🎉 Greeting'}
            </h1>
            <span className="text-sm text-gray-500">
              {new Date(timestamp).toLocaleString(
                language === 'ko' ? 'ko-KR' : 'en-US',
              )}
            </span>
          </div>

          {/* 메인 인사 메시지 */}
          <div className="mb-6 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 p-8 text-white">
            <p className="text-center text-2xl font-semibold">{greeting}</p>
          </div>

          {/* 상세 정보 */}
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg bg-indigo-50 p-4">
              <span className="font-medium text-indigo-900">
                {language === 'ko' ? '이름' : 'Name'}:
              </span>
              <span className="font-semibold text-indigo-700">{name}</span>
            </div>

            <div className="flex items-center justify-between rounded-lg bg-purple-50 p-4">
              <span className="font-medium text-purple-900">
                {language === 'ko' ? '언어' : 'Language'}:
              </span>
              <span className="font-semibold text-purple-700">
                {language === 'ko' ? '한국어' : 'English'}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-lg bg-pink-50 p-4">
              <span className="font-medium text-pink-900">
                {language === 'ko' ? '도구 타입' : 'Tool Type'}:
              </span>
              <span className="font-semibold text-pink-700">greet</span>
            </div>
          </div>

          {/* 디버그 정보 (개발용) */}
          <details className="mt-6">
            <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
              {language === 'ko' ? '🔍 원본 데이터 보기' : '🔍 View Raw Data'}
            </summary>
            <pre className="mt-2 overflow-auto rounded-lg bg-gray-100 p-4 text-xs">
              {JSON.stringify(structuredData, null, 2)}
            </pre>
          </details>
        </div>
      </div>
    </div>
  );
}
