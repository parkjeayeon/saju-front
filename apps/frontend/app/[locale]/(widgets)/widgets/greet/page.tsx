'use client';

import React, { useEffect, useState } from 'react';

export default function GreetWidget() {
  const [data, setData] = useState({ name: '사용자', greeting: '안녕하세요!' });
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [add, setAdd] = useState(0);

  useEffect(() => {
    const loadData = () => {
      if (window.openai?.toolOutput) {
        setData(window?.openai?.toolOutput as any);
      }
      if (window.openai?.theme) {
        setTheme(window.openai.theme);
      }
    };

    loadData();
    window.addEventListener('openai:set_globals', loadData);
    return () => window.removeEventListener('openai:set_globals', loadData);
  }, []);

  const { name, greeting } = data;
  const isDark = theme === 'dark';

  return (
    <div
      className={`flex min-h-screen items-center justify-center bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600 p-6`}
    >
      <div className="w-full max-w-md">
        <div className="relative">
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-pink-500 to-violet-500 opacity-50 blur-lg" />
          <div className="relative rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-xl">
            <div className="text-center">
              <div>{add}</div>
              <button onClick={() => setAdd((prev) => prev + 1)}>+</button>
              <div className="mb-6 text-7xl">👋</div>
              <h2 className="mb-4 text-3xl font-bold text-white">{greeting}</h2>
              <div className="inline-block rounded-full bg-white/20 px-6 py-2">
                <span className="text-xl font-semibold text-white">{name}</span>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-6 text-center text-sm text-white/60">
          MCP Tool: <code className="rounded bg-white/10 px-2 py-1">greet</code>
        </p>
      </div>
    </div>
  );
}
