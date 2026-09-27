// Run with --conditions=react-server: the schema module is server-only.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { rfqSchema } from '../lib/rfq-schema';

const valid = {
  name: 'A Buyer',
  company: 'Test GmbH',
  country: 'Germany',
  email: 'buyer@example.com',
  message: 'Cones for a holding furnace, 20 t.',
  startedAt: Date.now() - 10_000,
};

test('a complete enquiry parses; optional fields default', () => {
  const r = rfqSchema.parse(valid);
  assert.deepEqual(r.files, []);
  assert.equal(r.website, '');
});

test('required fields and email format are enforced', () => {
  const r = rfqSchema.safeParse({ ...valid, name: ' ', email: 'nope', message: 'short' });
  assert.equal(r.success, false);
  const paths = r.error!.issues.map((i) => i.path[0]);
  assert.deepEqual(new Set(paths), new Set(['name', 'email', 'message']));
});

test('more than three files, or a file over 25 MB, is rejected', () => {
  const f = { url: 'https://x.public.blob.vercel-storage.com/a.pdf', name: 'a.pdf', size: 1 };
  assert.equal(rfqSchema.safeParse({ ...valid, files: [f, f, f, f] }).success, false);
  assert.equal(rfqSchema.safeParse({ ...valid, files: [{ ...f, size: 26 * 1024 * 1024 }] }).success, false);
  assert.equal(rfqSchema.safeParse({ ...valid, files: [f, f, f] }).success, true);
});
