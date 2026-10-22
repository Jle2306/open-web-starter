import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateBooking, bookingRecord, localDate } from '../src/lib/booking.ts';

const config = { businessName: 'Fixture', services: [{ id: 'intro', name: 'Intro', durationMinutes: 30, priceLabel: 'Example' }], slots: ['09:00', '12:00'], unavailableSlots: ['12:00'] };
const now = new Date(2026, 9, 22, 10, 0);
const valid = { serviceId: 'intro', date: '2026-10-23', time: '09:00', name: ' Example Person ', email: 'example@example.com', note: '' };

test('accepts a valid future request and normalizes its payload', () => {
  assert.equal(validateBooking(valid, config, now), null);
  assert.equal(bookingRecord(valid).customer_name, 'Example Person');
  assert.equal(bookingRecord(valid).status, 'pending');
});
test('rejects tampered service and unavailable slot values', () => {
  assert.match(validateBooking({ ...valid, serviceId: 'missing' }, config, now), /service/);
  assert.match(validateBooking({ ...valid, time: '12:00' }, config, now), /available/);
  assert.match(validateBooking({ ...valid, time: '25:00' }, config, now), /available/);
});
test('rejects invalid calendar dates and requests outside the booking window', () => {
  for (const date of ['2026-02-30', '2026-10-21', '2027-12-01', 'not-a-date']) {
    assert.notEqual(validateBooking({ ...valid, date }, config, now), null);
  }
});
test('rejects an elapsed slot today', () => {
  assert.match(validateBooking({ ...valid, date: '2026-10-22' }, config, now), /future/);
});
test('rejects empty names, invalid email and overlong notes', () => {
  assert.match(validateBooking({ ...valid, name: '   ' }, config, now), /name/);
  assert.match(validateBooking({ ...valid, email: 'invalid' }, config, now), /email/);
  assert.match(validateBooking({ ...valid, note: 'x'.repeat(1001) }, config, now), /notes/);
});
test('formats dates using local calendar fields', () => {
  assert.equal(localDate(new Date(2026, 0, 2, 0, 1)), '2026-01-02');
});
