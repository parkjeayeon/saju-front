'use client';

import React, { useEffect, useState } from 'react';

export default function CalculateWidget() {
  const [data, setData] = useState({ operation: 'add', a: 0, b: 0, result: 0 });
  const [metadata, setMetadata] = useState({
    symbol: '+',
    operationLabel: '더하기',
  });
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const loadData = () => {
      if (window.openai?.toolOutput) setData(window.openai.toolOutput as any);
      if (window.openai?.toolResponseMetadata)
        setMetadata(window.openai.toolResponseMetadata as any);
      if (window.openai?.theme) setTheme(window.openai.theme);
    };

    loadData();
    window.addEventListener('openai:set_globals', loadData);
    return () => window.removeEventListener('openai:set_globals', loadData);
  }, []);

  const { operation, a, b, result } = data;
  const { symbol, operationLabel } = metadata;
  const isDark = theme === 'dark';

  const gradients: any = {
    add: 'from-emerald-500 to-teal-500',
    subtract: 'from-rose-500 to-pink-500',
    multiply: 'from-amber-500 to-orange-500',
    divide: 'from-sky-500 to-blue-500',
  };

  const gradient = gradients[operation] || gradients.add;

  return (
    <div
      className={`flex min-h-screen items-center justify-center p-6 ${isDark ? 'bg-slate-950' : 'bg-gray-50'}`}
    >
      <div className="w-full max-w-sm">
        <div className="relative">
          <div
            className={`absolute -inset-1 bg-gradient-to-r ${gradient} rounded-3xl opacity-50 blur-lg`}
          />
          <div
            className={`relative rounded-3xl border ${isDark ? 'border-white/10 bg-slate-900/95' : 'border-gray-200 bg-white'} overflow-hidden`}
          >
            <div className={`bg-gradient-to-r ${gradient} p-4 text-center`}>
              <span className="text-xl font-bold text-white">
                {operationLabel}
              </span>
            </div>
            <div className="p-6">
              <div
                className={`rounded-2xl ${isDark ? 'bg-slate-800/80' : 'bg-gray-100'} mb-6 p-6 text-center`}
              >
                <div
                  className={`mb-3 text-lg ${isDark ? 'text-slate-400' : 'text-gray-600'}`}
                >
                  {a} {symbol} {b}
                </div>
                <div
                  className={`text-5xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}
                >
                  = {result.toLocaleString()}
                </div>
              </div>
              <div className="flex items-center justify-center gap-4">
                <div
                  className={`rounded-xl ${isDark ? 'bg-slate-800' : 'bg-gray-200'} px-6 py-3`}
                >
                  <span
                    className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}
                  >
                    {a}
                  </span>
                </div>
                <div
                  className={`h-12 w-12 rounded-full bg-gradient-to-r ${gradient} flex items-center justify-center`}
                >
                  <span className="text-xl font-bold text-white">{symbol}</span>
                </div>
                <div
                  className={`rounded-xl ${isDark ? 'bg-slate-800' : 'bg-gray-200'} px-6 py-3`}
                >
                  <span
                    className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}
                  >
                    {b}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
