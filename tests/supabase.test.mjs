import { test } from 'node:test';
import assert from 'node:assert/strict';

let sequence = 0;
async function adapter(t, url, key) {
  const oldUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const oldKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  process.env.NEXT_PUBLIC_SUPABASE_URL = url;
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = key;
  t.after(() => {
    if (oldUrl === undefined) delete process.env.NEXT_PUBLIC_SUPABASE_URL; else process.env.NEXT_PUBLIC_SUPABASE_URL = oldUrl;
    if (oldKey === undefined) delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; else process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = oldKey;
  });
  return import(`../src/lib/supabase.ts?test=${sequence++}`);
}
const record = { service_id: 'consultation', booking_date: '2026-10-23', booking_time: '09:00', customer_name: 'Example Person', email: 'example@example.com', note: '', status: 'pending' };

test('empty public config reports demo mode without fetching', async (t) => {
  const fetch = t.mock.method(globalThis, 'fetch', () => { throw Error('Unexpected network access'); });
  const api = await adapter(t, '', '');
  assert.equal(api.persistenceMode(), 'demo');
  assert.equal((await api.submitBooking(record)).mode, 'demo');
  assert.equal(fetch.mock.callCount(), 0);
});
test('partial config is an error, not demo success', async (t) => {
  const api = await adapter(t, 'https://example.supabase.co', '');
  assert.equal(api.persistenceMode(), 'incomplete');
  await assert.rejects(api.submitBooking(record), /Set both/);
});
test('insecure remote URL is rejected before sending a key', async (t) => {
  const api = await adapter(t, 'http://example.com', 'example-public-client-key');
  await assert.rejects(api.submitBooking(record), /HTTPS/);
});
test('HTTP failure propagates without fallback', async (t) => {
  t.mock.method(globalThis, 'fetch', async () => new Response('', { status: 403 }));
  const api = await adapter(t, 'https://example.supabase.co', 'example-public-client-key');
  await assert.rejects(api.submitBooking(record), /not saved \(HTTP 403\)/);
});
test('successful insertion sends the typed pending payload and minimal response preference', async (t) => {
  const fetch = t.mock.method(globalThis, 'fetch', async (url, options) => {
    assert.equal(String(url), 'https://example.supabase.co/rest/v1/bookings');
    assert.equal(options.headers.Prefer, 'return=minimal');
    assert.deepEqual(JSON.parse(options.body), record);
    return new Response('', { status: 201 });
  });
  const api = await adapter(t, 'https://example.supabase.co/rest/v1/', 'example-public-client-key');
  const result = await api.submitBooking(record);
  assert.equal(result.mode, 'supabase');
  assert.match(result.message, /not confirmed/);
  assert.equal(fetch.mock.callCount(), 1);
});
