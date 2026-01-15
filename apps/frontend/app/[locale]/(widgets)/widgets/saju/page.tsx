'use client';
import { useDisplayMode, useMaxHeight, useWidgetProps } from '@/hooks';

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

export default function Page() {
  const props = useWidgetProps<WidgetProps>();
  const maxHeight = useMaxHeight() ?? undefined;
  const displayMode = useDisplayMode();

  const data = props?.result?.structuredContent || props;

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-gradient-to-br from-violet-950 via-purple-950 to-fuchsia-950 p-6"
      style={{
        maxHeight,
        height: displayMode === 'fullscreen' ? maxHeight : undefined,
      }}
    >
      saju page
      {JSON.stringify(data, null, 2)}
    </div>
  );
}
