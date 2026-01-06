'use client';

import React, { useEffect, useState } from 'react';
import { useDisplayMode, useMaxHeight, useWidgetProps } from '@/hooks';

type CalculateData = {
  operation?: string;
  a?: number;
  b?: number;
  symbol?: string;
  result?: number;
  expression?: string;
  timestamp?: string;
};

type WidgetProps = {
  result?: {
    structuredContent?: CalculateData;
  };
} & CalculateData;

export default function CalculateWidget() {
  const props = useWidgetProps<WidgetProps>();
  const maxHeight = useMaxHeight() ?? undefined;
  const displayMode = useDisplayMode();

  const data = props?.result?.structuredContent || props;
  const operation = data?.operation || 'add';
  const a = data?.a ?? 0;
  const b = data?.b ?? 0;
  const symbol = data?.symbol || '+';
  const result = data?.result ?? 0;
  const expression = data?.expression || `${a} ${symbol} ${b}`;

  const operationConfig: Record<
    string,
    { gradient: string; emoji: string; label: string }
  > = {
    add: {
      gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
      emoji: '➕',
      label: '더하기',
    },
    subtract: {
      gradient: 'from-rose-500 via-pink-500 to-red-500',
      emoji: '➖',
      label: '빼기',
    },
    multiply: {
      gradient: 'from-amber-500 via-orange-500 to-yellow-500',
      emoji: '✖️',
      label: '곱하기',
    },
    divide: {
      gradient: 'from-sky-500 via-blue-500 to-indigo-500',
      emoji: '➗',
      label: '나누기',
    },
  };

  const config = operationConfig[operation] || operationConfig.add;
  return (
    <div
      className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6"
      style={{
        maxHeight,
        height: displayMode === 'fullscreen' ? maxHeight : undefined,
      }}
    >
      <div className="w-full max-w-sm">
        {/* 메인 카드 */}
        <div className="relative">
          {/* 글로우 효과 */}
          <div
            className={`absolute -inset-1 bg-gradient-to-r ${config.gradient} rounded-3xl opacity-50 blur-lg`}
          />

          {/* 카드 본체 */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/95 backdrop-blur-xl">
            {/* 헤더 */}
            <div className={`bg-gradient-to-r ${config.gradient} p-4`}>
              <div className="flex items-center justify-center gap-3">
                <span className="text-4xl">{config.emoji}</span>
                <span className="text-xl font-bold text-white">
                  {config.label}
                </span>
              </div>
            </div>
            {JSON.stringify(result, null, 2)}
            {/* 계산기 디스플레이 */}
            <div className="p-6">
              {/* 수식 */}
              <div className="mb-6 rounded-2xl bg-slate-800/80 p-6 font-mono">
                <div className="mb-3 text-center text-lg tracking-wider text-slate-400">
                  {expression}
                </div>
                <div className="text-center text-5xl font-bold tracking-tight text-white">
                  ={' '}
                  {typeof result === 'number'
                    ? result.toLocaleString()
                    : result}
                </div>
              </div>

              {/* 숫자 뱃지들 */}
              <div className="flex items-center justify-center gap-4">
                <div className="text-center">
                  <div className="mb-2 rounded-xl bg-slate-800 px-6 py-3">
                    <span className="text-2xl font-bold text-white">{a}</span>
                  </div>
                  <span className="text-xs tracking-wider text-slate-500 uppercase">
                    첫 번째
                  </span>
                </div>

                <div
                  className={`h-12 w-12 rounded-full bg-gradient-to-br ${config.gradient} flex items-center justify-center shadow-lg`}
                >
                  <span className="text-xl font-bold text-white">{symbol}</span>
                </div>

                <div className="text-center">
                  <div className="mb-2 rounded-xl bg-slate-800 px-6 py-3">
                    <span className="text-2xl font-bold text-white">{b}</span>
                  </div>
                  <span className="text-xs tracking-wider text-slate-500 uppercase">
                    두 번째
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 푸터 */}
        <p className="mt-6 text-center text-sm text-slate-500">
          MCP Tool:{' '}
          <code className="rounded bg-slate-800/50 px-2 py-1">calculate</code>
        </p>
      </div>
    </div>
  );
}
