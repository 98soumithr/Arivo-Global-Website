'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useRef, useState } from 'react';
import type { RfqField } from '@/lib/rfq';
import { buttonClass } from '@/components/ui/Button';
import { TextArea, TextField } from './Field';

export interface ProductOption {
  slug: string;
  name: string;
  group: string;
}

type Status = 'idle' | 'sending' | 'done';
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

/** Six fields, one optional; Turnstile; inline pending state, then confirmation. */
function Form({ responseCommitment, defaultProduct = '' }: { products: ProductOption[]; responseCommitment: string; defaultProduct?: string }) {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState('');
  const startedAt = useRef(0);
  const summary = useRef<HTMLDivElement>(null);
  const done = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (status === 'done') done.current?.focus();
  }, [status]);

  const busy = status === 'sending';
  const errorList = Object.entries(errors).filter(([, v]) => v) as [RfqField, string][];

  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const fd = new FormData(ev.currentTarget);
    const values = Object.fromEntries([...fd.entries()].filter(([, v]) => typeof v === 'string')) as Record<string, string>;
    const clientErrors = validate(values);
    setErrors(clientErrors);
    setFormError('');
    if (Object.keys(clientErrors).length) {
      requestAnimationFrame(() => summary.current?.focus());
      return;
    }

    try {
      setStatus('sending');
      const payload: Record<string, string> = {
        access_key: 'caa0a156-070e-4fe2-bca0-96205b92b340',
        subject: `New enquiry from ${values.name} — ${values.company}`,
        from_name: 'Arivo Global Website',
        replyto: values.email ?? '',
        name: values.name ?? '',
        company: values.company ?? '',
        country: values.country ?? '',
        email: values.email ?? '',
        message: values.message ?? '',
      };
      if (values.phone) payload.phone = values.phone;
      if (values.product) payload.product = values.product;
      if (values.website) payload.botcheck = values.website;

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (result.success) {
        setStatus('done');
        return;
      }
      setFormError(result.message || 'The enquiry could not be sent. Please try again.');
      setStatus('idle');
      requestAnimationFrame(() => summary.current?.focus());
    } catch {
      setFormError('The enquiry could not be sent. Check your connection and try again, or email us directly.');
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
        <h2 className="t-h3 mt-4 text-navy">Thank you — your enquiry has been sent</h2>
        <p className="t-body mt-3 text-ink">{responseCommitment} A copy has gone to your email address.</p>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} aria-describedby="rfq-required-note" className="space-y-6">
      <div ref={summary} tabIndex={-1} className="outline-none" aria-live="assertive">
        {(errorList.length > 0 || formError) && (
          <div role="alert" className="rounded-brand border-2 border-burgundy bg-white p-5">
            <h2 className="t-h4 text-burgundy">{formError || 'Please correct the following'}</h2>
            {errorList.length > 0 && (
              <ul className="mt-3 space-y-1">
                {errorList.map(([field, msg]) => (
                  <li key={field}>
                    <a href={`#${field}`} className="t-small text-burgundy underline underline-offset-4">
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
      </div>

      <TextArea
        id="message"
        label="Message"
        hint="The application, the duty, quantities, and anything you know about the part in service."
        error={errors.message}
        disabled={busy}
      />

      {/* Product context from ?product=slug, carried through to the enquiry email */}
      <input type="hidden" name="product" value={defaultProduct} />

      {/* Honeypot — hidden from people and assistive technology */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="t-small text-slate">
          {responseCommitment} We use these details only to answer your enquiry —{' '}
          <a href="/privacy" className="link">
            privacy notice
          </a>
          .
        </p>
        <button type="submit" disabled={busy} aria-disabled={busy} className={buttonClass('primary', 'shrink-0 disabled:cursor-progress disabled:opacity-80')}>
          {busy && (
            <svg aria-hidden viewBox="0 0 16 16" className="size-4 animate-spin" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M8 1.5A6.5 6.5 0 1 1 1.5 8" />
            </svg>
          )}
          {status === 'sending' ? 'Sending…' : 'Send enquiry'}
        </button>
      </div>
      <p className="sr-only" aria-live="polite">
        {status === 'sending' ? 'Sending enquiry' : ''}
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

/** Product is read from ?product=slug into a hidden field. The fallback is the same form, without it, for static render. */
export function RfqForm(props: { products: ProductOption[]; responseCommitment: string }) {
  return (
    <Suspense fallback={<Form {...props} />}>
      <WithParams {...props} />
    </Suspense>
  );
}
