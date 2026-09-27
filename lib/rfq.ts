/** Client-safe constants and types for the enquiry form. The zod schema lives in rfq-schema.ts (server only). */
/** Shared between the form and the route handler. */
export const MAX_FILES = 3;
export const MAX_FILE_BYTES = 25 * 1024 * 1024;
export const MIN_ELAPSED_MS = 3000;

/** Accepted drawing / specification formats → the content type the upload is stored under. */
export const FILE_TYPES: Record<string, string> = {
  pdf: 'application/pdf',
  dwg: 'application/acad',
  dxf: 'application/dxf',
  step: 'application/step',
  stp: 'application/step',
  igs: 'application/iges',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
};
export const ALLOWED_CONTENT_TYPES = [...new Set(Object.values(FILE_TYPES))];
export const ACCEPT_ATTR = Object.keys(FILE_TYPES)
  .map((e) => `.${e}`)
  .join(',');

export const extensionOf = (name: string) => name.split('.').pop()?.toLowerCase() ?? '';

export type RfqField = 'name' | 'company' | 'country' | 'email' | 'phone' | 'product' | 'message' | 'files';

export type RfqResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Partial<Record<RfqField, string>> };
