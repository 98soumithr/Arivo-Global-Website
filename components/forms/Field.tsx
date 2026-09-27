import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';

const control =
  'block w-full rounded-brand border bg-white px-4 text-[16px] text-ink transition-colors duration-150 ease-out placeholder:text-slate/70 hover:border-slate focus-visible:border-harbour';

interface Common {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  optional?: boolean;
}

/** Label above the field — never placeholder-as-label. Errors linked with aria-describedby. */
function Frame({ id, label, hint, error, optional, children }: Common & { children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-[15px] font-medium text-navy">
        {label}
        {optional && <span className="ml-2 font-normal text-slate">optional</span>}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="t-small -mt-1 mb-2 text-slate">
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p id={`${id}-error`} className="t-small mt-2 flex items-start gap-2 text-burgundy">
          <svg aria-hidden viewBox="0 0 16 16" className="mt-[3px] size-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="8" cy="8" r="6.5" />
            <path d="M8 4.5v4M8 10.5v1" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

const describedBy = (id: string, hint?: string, error?: string) =>
  [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined;

const border = (error?: string) => (error ? 'border-burgundy' : 'border-border');

export function TextField({ id, label, hint, error, optional, ...rest }: Common & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <Frame id={id} label={label} hint={hint} error={error} optional={optional}>
      <input
        id={id}
        name={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        required={!optional}
        className={`${control} ${border(error)} h-[52px]`}
        {...rest}
      />
    </Frame>
  );
}

export function TextArea({ id, label, hint, error, optional, ...rest }: Common & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <Frame id={id} label={label} hint={hint} error={error} optional={optional}>
      <textarea
        id={id}
        name={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        required={!optional}
        rows={6}
        className={`${control} ${border(error)} py-3.5 leading-[26px]`}
        {...rest}
      />
    </Frame>
  );
}

export function SelectField({
  id,
  label,
  hint,
  error,
  optional,
  children,
  ...rest
}: Common & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <Frame id={id} label={label} hint={hint} error={error} optional={optional}>
      <div className="relative">
        <select
          id={id}
          name={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(id, hint, error)}
          className={`${control} ${border(error)} h-[52px] appearance-none pr-10`}
          {...rest}
        >
          {children}
        </select>
        <svg aria-hidden viewBox="0 0 16 16" className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-slate" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="m3.5 6 4.5 4.5L12.5 6" />
        </svg>
      </div>
    </Frame>
  );
}
