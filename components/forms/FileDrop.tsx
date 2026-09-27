'use client';

import { useId, useRef, useState } from 'react';
import { ACCEPT_ATTR, FILE_TYPES, MAX_FILES, MAX_FILE_BYTES, extensionOf } from '@/lib/rfq';

const mb = (bytes: number) => `${(bytes / 1024 / 1024).toFixed(1)} MB`;

/**
 * Bordered drop zone — the most important field on the site, and it looks like it.
 * Accepts pdf, dwg, dxf, step, stp, igs, jpg, png. 25 MB per file, 3 files.
 */
export function FileDrop({
  files,
  onChange,
  error,
  disabled,
}: {
  files: File[];
  onChange: (files: File[], problem?: string) => void;
  error?: string;
  disabled?: boolean;
}) {
  const id = useId();
  const input = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);

  const add = (incoming: FileList | null) => {
    if (!incoming) return;
    const next = [...files];
    let problem: string | undefined;
    for (const f of Array.from(incoming)) {
      if (!(extensionOf(f.name) in FILE_TYPES)) problem = `${f.name}: this file type is not accepted.`;
      else if (f.size > MAX_FILE_BYTES) problem = `${f.name} is ${mb(f.size)}; the limit is 25 MB per file.`;
      else if (next.length >= MAX_FILES) problem = `Up to ${MAX_FILES} files can be attached.`;
      else if (!next.some((n) => n.name === f.name && n.size === f.size)) next.push(f);
    }
    onChange(next, problem);
    if (input.current) input.current.value = '';
  };

  return (
    <div>
      <p id={`${id}-label`} className="mb-2 block text-[15px] font-medium text-navy">
        Drawings and files <span className="ml-2 font-normal text-slate">optional, but the most useful thing you can send</span>
      </p>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setOver(true);
        }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setOver(false);
          if (!disabled) add(e.dataTransfer.files);
        }}
        className={`rounded-brand border-2 border-dashed px-5 py-8 text-center transition-colors duration-150 ease-out lg:py-10 ${
          error ? 'border-burgundy' : over ? 'border-harbour bg-paper' : 'border-steel bg-paper'
        }`}
      >
        <svg aria-hidden viewBox="0 0 32 32" className="mx-auto size-8 text-harbour" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M9 4h10l6 6v18H9z" />
          <path d="M19 4v6h6M17 22v-8M13.5 17.5 17 14l3.5 3.5" />
        </svg>
        <p className="t-body mt-3 text-ink">
          Drop drawings, specifications or photographs here, or{' '}
          <button
            type="button"
            disabled={disabled}
            onClick={() => input.current?.click()}
            aria-describedby={`${id}-label ${id}-hint${error ? ` ${id}-error` : ''}`}
            className="font-semibold text-harbour underline decoration-1 underline-offset-4 hover:decoration-2"
          >
            choose files
          </button>
        </p>
        <p id={`${id}-hint`} className="t-small mt-2 text-slate">
          PDF, DWG, DXF, STEP, IGS, JPG or PNG · up to 3 files · 25 MB each
        </p>
        <input
          ref={input}
          type="file"
          multiple
          accept={ACCEPT_ATTR}
          tabIndex={-1}
          aria-hidden
          className="sr-only"
          onChange={(e) => add(e.target.files)}
        />
      </div>
      {error && (
        <p id={`${id}-error`} className="t-small mt-2 text-burgundy">
          {error}
        </p>
      )}
      {files.length > 0 && (
        <ul className="mt-3 divide-y divide-border rounded-brand border border-border bg-white" aria-label="Attached files">
          {files.map((f) => (
            <li key={`${f.name}-${f.size}`} className="flex items-center justify-between gap-4 px-4 py-3">
              <span className="t-small min-w-0 truncate text-ink">{f.name}</span>
              <span className="flex shrink-0 items-center gap-4">
                <span className="t-data text-slate">{mb(f.size)}</span>
                <button
                  type="button"
                  disabled={disabled}
                  onClick={() => onChange(files.filter((x) => x !== f))}
                  className="t-small text-harbour underline decoration-1 underline-offset-4"
                  aria-label={`Remove ${f.name}`}
                >
                  Remove
                </button>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
