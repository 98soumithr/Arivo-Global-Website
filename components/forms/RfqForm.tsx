'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useRef, useState } from 'react';
import { FILE_TYPES, extensionOf, type RfqField, type RfqResult } from '@/lib/rfq';
import { buttonClass } from '@/components/ui/Button';
import { FileDrop } from './FileDrop';
import { SelectField, TextArea, TextField } from './Field';
import { Turnstile } from './Turnstile';

export interface ProductOption {
  slug: string;
  name: string;
  group: string;
}

type Status = 'idle' | 'uploading' | 'sending' | 'done';
type Errors = Partial<Record<RfqField, string>>;

const FIELD_LABELS: Record<RfqField, string> = {
  name: 'Name',
  company: 'Company',
  country: 'Country',
  email: 'Email',
  phone: 'Phone',
  product: 'Product',
  message: 'Message',
  files: 'Drawings and files',
};

function validate(values: Record<string, string>): Errors {
  const e: Errors = {};
  if (!values.name?.trim()) e.name = 'Enter your name';
  if (!values.company?.trim()) e.company = 'Enter your company';
  if (!values.country?.trim()) e.country = 'Enter your country';
  if (!values.email?.trim()) e.email = 'Enter your email address';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) e.email = 'Enter an email address in the format name@company.com';
  if ((values.message?.trim().length ?? 0) < 10) e.message = 'Tell us a little about the application — at least a sentence';
  return e;
}

/** Eight fields, three optional; file upload prominent; Turnstile; inline pending state, then confirmation. */
function Form({ products, responseCommitment, defaultProduct = '' }: { products: ProductOption[]; responseCommitment: string; defaultProduct?: string }) {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [token, setToken] = useState('');
  const [turnstileReset, setTurnstileReset] = useState(0);
  const startedAt = useRef(0);
  const summary = useRef<HTMLDivElement>(null);
  const done = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (status === 'done') done.current?.focus();
  }, [status]);

  const busy = status === 'uploading' || status === 'sending';
  const errorList = Object.entries(errors).filter(([, v]) => v) as [RfqField, string][];

  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const fd = new FormData(ev.currentTarget);
    const values = Object.fromEntries([...fd.entries()].filter(([, v]) => typeof v === 'string')) as Record<string, string>;
    const clientErrors = validate(values);
    if (errors.files) clientErrors.files = errors.files;
    setErrors(clientErrors);
    setFormError('');
    if (Object.keys(clientErrors).length) {
      requestAnimationFrame(() => summary.current?.focus());
      return;
    }

    try {
      let uploaded: { url: string; name: string; size: number }[] = [];
      if (files.length) {
        setStatus('uploading');
        // Loaded on demand: the Blob client is large and only needed when files are attached.
        const { upload } = await import('@vercel/blob/client');
        uploaded = await Promise.all(
          files.map(async (f) => {
            const blob = await upload(`rfq/${f.name.replace(/[^\w.\-]+/g, '_')}`, f, {
              access: 'public',
              handleUploadUrl: '/api/rfq/upload',
              contentType: FILE_TYPES[extensionOf(f.name)],
              multipart: f.size > 8 * 1024 * 1024,
            });
            return { url: blob.url, name: f.name, size: f.size };
          }),
        ).catch(() => {
          throw new Error('upload');
        });
      }

      setStatus('sending');
      const res = await fetch('/api/rfq', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: values.name,
          company: values.company,
          country: values.country,
          email: values.email,
          phone: values.phone,
          product: values.product,
          message: values.message,
          website: values.website,
          files: uploaded,
          token,
          startedAt: startedAt.current,
        }),
      });
      const result = (await res.json()) as RfqResult;
      if (result.ok) {
        setStatus('done');
        return;
      }
      setErrors(result.fieldErrors ?? {});
      setFormError(result.error);
      setTurnstileReset((n) => n + 1);
      setStatus('idle');
      requestAnimationFrame(() => summary.current?.focus());
    } catch (err) {
      setFormError(
        (err as Error).message === 'upload'
          ? 'The files could not be uploaded. Remove them and send the enquiry, then email the drawings to us — or try again.'
          : 'The enquiry could not be sent. Check your connection and try again, or email us directly.',
      );
      setStatus('idle');
      requestAnimationFrame(() => summary.current?.focus());
    }
  }

  if (status === 'done') {
    return (
      <div ref={done} tabIndex={-1} role="status" className="rounded-brand border border-border bg-paper p-6 outline-none lg:p-8">
        <svg aria-hidden viewBox="0 0 32 32" className="size-8 text-harbour" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="16" cy="16" r="13" />
          <path d="m10.5 16.5 3.5 3.5 7.5-8" />
        </svg>
        <h3 className="t-h3 mt-4 text-navy">Thank you — your enquiry has been sent</h3>
        <p className="t-body mt-3 text-ink">{responseCommitment} A copy has gone to your email address.</p>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} aria-describedby="rfq-required-note" className="space-y-6">
      <div ref={summary} tabIndex={-1} className="outline-none" aria-live="assertive">
        {(errorList.length > 0 || formError) && (
          <div role="alert" className="rounded-brand border-2 border-burgundy bg-white p-5">
            <h3 className="t-h4 text-burgundy">{formError || 'Please correct the following'}</h3>
            {errorList.length > 0 && (
              <ul className="mt-3 space-y-1">
                {errorList.map(([field, msg]) => (
                  <li key={field}>
                    <a href={`#${field === 'files' ? 'files' : field}`} className="t-small text-burgundy underline underline-offset-4">
                      {FIELD_LABELS[field]}: {msg}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      <p id="rfq-required-note" className="t-small text-slate">
        All fields are required unless marked optional.
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        <TextField id="name" label="Name" autoComplete="name" error={errors.name} disabled={busy} />
        <TextField id="company" label="Company" autoComplete="organization" error={errors.company} disabled={busy} />
        <TextField id="country" label="Country" autoComplete="country-name" error={errors.country} disabled={busy} />
        <TextField id="email" label="Email" type="email" autoComplete="email" inputMode="email" error={errors.email} disabled={busy} />
        <TextField id="phone" label="Phone" type="tel" autoComplete="tel" hint="With country code" optional error={errors.phone} disabled={busy} />
        <SelectField id="product" label="Product" optional defaultValue={defaultProduct} error={errors.product} disabled={busy}>
          <option value="">Not sure / several products</option>
          {[...new Set(products.map((p) => p.group))].map((group) => (
            <optgroup key={group} label={group}>
              {products
                .filter((p) => p.group === group)
                .map((p) => (
                  <option key={p.slug} value={p.slug}>
                    {p.name}
                  </option>
                ))}
            </optgroup>
          ))}
        </SelectField>
      </div>

      <TextArea
        id="message"
        label="Message"
        hint="The application, the duty, quantities, and anything you know about the part in service."
        error={errors.message}
        disabled={busy}
      />

      <div id="files" tabIndex={-1} className="outline-none">
        <FileDrop
          files={files}
          disabled={busy}
          error={errors.files}
          onChange={(next, problem) => {
            setFiles(next);
            setErrors((e) => ({ ...e, files: problem }));
          }}
        />
      </div>

      {/* Honeypot — hidden from people and assistive technology */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <Turnstile onToken={setToken} resetKey={turnstileReset} />

      <div className="flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="t-small text-slate">{responseCommitment}</p>
        <button type="submit" disabled={busy} aria-disabled={busy} className={buttonClass('primary', 'shrink-0 disabled:cursor-progress disabled:opacity-80')}>
          {busy && (
            <svg aria-hidden viewBox="0 0 16 16" className="size-4 animate-spin" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M8 1.5A6.5 6.5 0 1 1 1.5 8" />
            </svg>
          )}
          {status === 'uploading' ? 'Uploading files…' : status === 'sending' ? 'Sending…' : 'Send enquiry'}
        </button>
      </div>
      <p className="sr-only" aria-live="polite">
        {status === 'uploading' ? 'Uploading files' : status === 'sending' ? 'Sending enquiry' : ''}
      </p>
    </form>
  );
}

function WithParams(props: { products: ProductOption[]; responseCommitment: string }) {
  const params = useSearchParams();
  const requested = params.get('product') ?? '';
  const valid = props.products.some((p) => p.slug === requested) ? requested : '';
  return <Form key={valid} {...props} defaultProduct={valid} />;
}

/** Product is pre-selected from ?product=slug. The fallback is the same form, unselected, for static render. */
export function RfqForm(props: { products: ProductOption[]; responseCommitment: string }) {
  return (
    <Suspense fallback={<Form {...props} />}>
      <WithParams {...props} />
    </Suspense>
  );
}
