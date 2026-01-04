// app/[locale]/widgets/greet/page.tsx
'use client';

import {useEffect, useState} from 'react';
import {useTranslation} from '@/app/i18n/client';

export default function GreetWidget() {
    const {t} = useTranslation();
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
        window.parent.postMessage({type: 'widgetReady'}, '*');

        return () => window.removeEventListener('message', handleMessage);
    }, []);

    // structuredContent가 없을 때 기본 화면
    if (!structuredData) {
        return (
            <div
                className="flex items-center justify-center min-h-screen p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
                <div className="text-center">
                    <div
                        className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">{t('loading')}</p>
                </div>
            </div>
        );
    }

    const {name, language, greeting, timestamp} = structuredData;

    return (
        <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-indigo-100">
                    {/* 헤더 */}
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-3xl font-bold text-indigo-900">
                            {language === 'ko' ? '🎉 인사하기' : '🎉 Greeting'}
                        </h1>
                        <span className="text-sm text-gray-500">
              {new Date(timestamp).toLocaleString(language === 'ko' ? 'ko-KR' : 'en-US')}
            </span>
                    </div>

                    {/* 메인 인사 메시지 */}
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-8 text-white mb-6">
                        <p className="text-2xl font-semibold text-center">
                            {greeting}
                        </p>
                    </div>

                    {/* 상세 정보 */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-indigo-50 rounded-lg">
              <span className="font-medium text-indigo-900">
                {language === 'ko' ? '이름' : 'Name'}:
              </span>
                            <span className="text-indigo-700 font-semibold">{name}</span>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
              <span className="font-medium text-purple-900">
                {language === 'ko' ? '언어' : 'Language'}:
              </span>
                            <span className="text-purple-700 font-semibold">
                {language === 'ko' ? '한국어' : 'English'}
              </span>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-pink-50 rounded-lg">
              <span className="font-medium text-pink-900">
                {language === 'ko' ? '도구 타입' : 'Tool Type'}:
              </span>
                            <span className="text-pink-700 font-semibold">greet</span>
                        </div>
                    </div>

                    {/* 디버그 정보 (개발용) */}
                    <details className="mt-6">
                        <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                            {language === 'ko' ? '🔍 원본 데이터 보기' : '🔍 View Raw Data'}
                        </summary>
                        <pre className="mt-2 p-4 bg-gray-100 rounded-lg text-xs overflow-auto">
              {JSON.stringify(structuredData, null, 2)}
            </pre>
                    </details>
                </div>
            </div>
        </div>
    );
}