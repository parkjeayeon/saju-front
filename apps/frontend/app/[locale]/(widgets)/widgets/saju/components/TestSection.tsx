'use client';
import { useDisplayMode, useMaxHeight, useWidgetProps } from '@/hooks';
import { Button } from '@/components/ui/button';

type GreetData = {
  name?: string;
  language?: string;
  greeting?: string;
};
type WidgetProps = {
  result?: {
    structuredContent?: any;
  };
};

export default function TestSection({ locale }: { locale: 'en' | 'ko' }) {
  const props = useWidgetProps<WidgetProps>();
  const maxHeight = useMaxHeight() ?? undefined;
  const displayMode = useDisplayMode();

  const data = props?.result?.structuredContent || props;

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-violet-950 via-purple-950 to-fuchsia-950 p-6 text-xl text-white"
      style={{
        maxHeight,
        height: displayMode === 'fullscreen' ? maxHeight : undefined,
      }}
    >
      <div>{locale}</div>
      <div> {locale === 'en' ? 'English' : 'Korean'}</div>
      <div> saju page</div>
      <div> {JSON.stringify(data, null, 2)}</div>
      <Button onClick={() => alert(JSON.stringify(data))}>확인완료</Button>
    </div>
  );
}
