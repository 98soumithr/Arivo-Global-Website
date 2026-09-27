import { Fragment } from 'react';

const MARKER = /(\[CONFIRM(?::[^\]]*)?\])/g;

/** Renders a content string, making any [CONFIRM] marker visible so it cannot ship unnoticed. */
export function Rich({ text }: { text: string }) {
  const parts = text.split(MARKER);
  if (parts.length === 1) return <>{text}</>;
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('[CONFIRM') ? (
          <span key={i} className="confirm">
            {part}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}
