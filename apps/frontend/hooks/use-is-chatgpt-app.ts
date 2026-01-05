'use client';
import { useEffect, useState } from 'react';

export function useIsChatGptApp(): boolean {
  const [isChatGptApp, setIsChatGptApp] = useState(
    typeof window !== 'undefined' &&
      typeof (window as any).openai !== 'undefined',
  );
  useEffect(() => {
    function update() {
      if (typeof (window as any).openai !== 'undefined') {
        setIsChatGptApp(true);
      }
    }
    update();
    window.addEventListener('openai_set_globals', update);
    return () => window.removeEventListener('openai_set_globals', update);
  }, []);
  return isChatGptApp;
}
