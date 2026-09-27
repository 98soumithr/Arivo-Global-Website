import 'server-only';
import { z } from 'zod';
import { MAX_FILES, MAX_FILE_BYTES } from './rfq';

export const rfqSchema = z.object({
  name: z.string().trim().min(1, 'Enter your name').max(120),
  company: z.string().trim().min(1, 'Enter your company').max(160),
  country: z.string().trim().min(1, 'Enter your country').max(80),
  email: z.string().trim().email('Enter an email address in the format name@company.com').max(200),
  phone: z.string().trim().max(40).optional().or(z.literal('')),
  product: z.string().trim().max(120).optional().or(z.literal('')),
  message: z.string().trim().min(10, 'Tell us a little about the application — at least a sentence').max(5000),
  files: z
    .array(z.object({ url: z.string().url(), name: z.string().max(200), size: z.number().int().nonnegative().max(MAX_FILE_BYTES) }))
    .max(MAX_FILES)
    .default([]),
  token: z.string().max(4096).default(''),
  website: z.string().max(200).default(''), // honeypot
  startedAt: z.number().int(),
});

export type RfqInput = z.input<typeof rfqSchema>;
