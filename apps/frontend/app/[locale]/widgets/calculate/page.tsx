// app/[locale]/widgets/calculate/page.tsx
'use client';

import {useEffect, useState} from 'react';
import {useTranslation} from '@/app/i18n/client';

export default function CalculateWidget() {
    const {t} = useTranslation();
    const [structuredData, setStructuredData] = useState<any>(null);

    useEffect(() => {
        // ChatGPT가 전달한 structuredContent 데이터 받기
        const handleMessage = (event: MessageEvent) => {
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
                className="flex items-center justify-center min-h-screen p-6 bg-gradient-to-br from-emerald-50 to-teal-50">
                <div className="text-center">
                    <div
                        className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">{t('loading')}</p>
                </div>
            </div>
        );
    }

    const {operation, a, b, symbol, result, expression, language, timestamp} = structuredData;

    // 연산 이름 매핑
    const operationNames = {
        add: language === 'ko' ? '덧셈' : 'Addition',
        subtract: language === 'ko' ? '뺄셈' : 'Subtraction',
        multiply: language === 'ko' ? '곱셈' : 'Multiplication',
        divide: language === 'ko' ? '나눗셈' : 'Division',
    };

    // 연산별 색상
    const operationColors = {
        add: 'from-green-500 to-emerald-600',
        subtract: 'from-orange-500 to-red-600',
        multiply: 'from-purple-500 to-pink-600',
        divide: 'from-blue-500 to-cyan-600',
    };

    return (
        <div className="min-h-screen p-6 bg-gradient-to-br from-emerald-50 to-teal-50">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-emerald-100">
                    {/* 헤더 */}
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-3xl font-bold text-emerald-900">
                            {language === 'ko' ? '🧮 계산기' : '🧮 Calculator'}
                        </h1>
                        <span className="text-sm text-gray-500">
              {new Date(timestamp).toLocaleString(language === 'ko' ? 'ko-KR' : 'en-US')}
            </span>
                    </div>

                    {/* 연산 타입 배지 */}
                    <div className="flex justify-center mb-6">
            <span className="px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full font-medium">
              {operationNames[operation as keyof typeof operationNames]}
            </span>
                    </div>

                    {/* 계산식 표시 */}
                    <div
                        className={`bg-gradient-to-r ${operationColors[operation as keyof typeof operationColors]} rounded-xl p-8 text-white mb-6`}>
                        <div className="text-center space-y-4">
                            <div className="text-5xl font-bold">
                                {expression}
                            </div>
                            <div className="text-3xl">
                                = <span className="font-bold">{result}</span>
                            </div>
                        </div>
                    </div>

                    {/* 상세 정보 */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="p-4 bg-emerald-50 rounded-lg">
                            <p className="text-sm text-emerald-600 mb-1">
                                {language === 'ko' ? '첫 번째 숫자' : 'First Number'}
                            </p>
                            <p className="text-2xl font-bold text-emerald-900">{a}</p>
                        </div>

                        <div className="p-4 bg-teal-50 rounded-lg">
                            <p className="text-sm text-teal-600 mb-1">
                                {language === 'ko' ? '두 번째 숫자' : 'Second Number'}
                            </p>
                            <p className="text-2xl font-bold text-teal-900">{b}</p>
                        </div>

                        <div className="p-4 bg-cyan-50 rounded-lg">
                            <p className="text-sm text-cyan-600 mb-1">
                                {language === 'ko' ? '연산자' : 'Operator'}
                            </p>
                            <p className="text-2xl font-bold text-cyan-900">{symbol}</p>
                        </div>

                        <div className="p-4 bg-blue-50 rounded-lg">
                            <p className="text-sm text-blue-600 mb-1">
                                {language === 'ko' ? '결과' : 'Result'}
                            </p>
                            <p className="text-2xl font-bold text-blue-900">{result}</p>
                        </div>
                    </div>

                    {/* 결과 요약 */}
                    <div className="p-6 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-xl">
                        <p className="text-center text-lg text-emerald-900">
                            {language === 'ko'
                                ? `${a}와 ${b}를 ${operationNames[operation as keyof typeof operationNames]}한 결과는 ${result}입니다.`
                                : `The ${operationNames[operation as keyof typeof operationNames].toLowerCase()} of ${a} and ${b} is ${result}.`
                            }
                        </p>
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