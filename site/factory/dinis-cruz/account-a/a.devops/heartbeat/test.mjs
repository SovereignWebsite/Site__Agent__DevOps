// Tests for heartbeat.mjs: node heartbeat/test.mjs (from this folder's parent). No dependencies.
import assert from 'node:assert/strict';
import { interval, judge, dinisLines, MISSING } from './heartbeat.mjs';

const H = 3600e3, M = 60e3;
const beat = (o) => ({ v: 1, account: 'cl-1', agent: 'x', state: 'working', room: { status: 'allowed', resets_at: '2026-11-28T09:00Z' }, work: { working: 2, blocked: 0 }, asks: { count: 0, link: null }, ...o });

// The spec's worked examples (UK time = UTC in late November).
assert.equal(interval(beat({ at: '2026-11-24T14:00Z' })).ms, 30 * M, 'Tue 14:00 working: 30 min');
assert.equal(interval(beat({ at: '2026-11-25T10:00Z', state: 'idle', work: { working: 0, blocked: 0 } })).ms, 2 * H, 'Wed 10:00 idle: 2 h');
assert.equal(interval(beat({ at: '2026-11-28T11:00Z', room: { status: 'allowed_warning' } })).ms, 8 * H, 'Sat 11:00 warning: 8 h');
assert.equal(interval(beat({ at: '2026-11-26T15:00Z', room: { status: 'rejected' } })).ms, 4 * H, 'Thu 15:00 rejected: 4 h');
assert.equal(interval(beat({ at: '2026-11-24T03:00Z', state: 'idle', work: { working: 0, blocked: 0 } })).ms, 12 * H, 'Tue 03:00 idle: capped 12 h');
// British Summer Time: 07:30 UTC on a June Monday is 08:30 UK, business hours.
assert.equal(interval(beat({ at: '2026-06-01T07:30Z' })).ms, 30 * M, 'BST respected');

// Colours.
const at = '2026-11-24T14:00Z', t = (min) => new Date(Date.parse('2026-11-24T14:00:00Z') + min * M);
assert.equal(judge(beat({ at }), t(40)).colour, 'green', 'on time (due 14:30, grace 15)');
assert.equal(judge(beat({ at }), t(50)).colour, 'amber', 'one beat missed');
assert.equal(judge(beat({ at }), t(80)).colour, 'red', 'two beats missed');
assert.equal(judge(null).colour, 'red', 'unreadable file');
assert.equal(judge(MISSING, t(0), false).colour, 'grey', 'not yet required: no heartbeat yet');
assert.equal(judge(MISSING, t(0), true).colour, 'red', 'required and missing');
assert.equal(judge(beat({ at, v: 2 })).colour, 'red', 'unknown version');
assert.equal(judge(beat({ at, state: 'stopped' }), t(1)).colour, 'red', 'stopped');
assert.equal(judge(beat({ at, room: { status: 'rejected' } }), t(1)).colour, 'red', 'out of room while working');
assert.equal(judge(beat({ at, room: { status: 'rejected' }, state: 'idle', work: { working: 0, blocked: 0 } }), t(1)).colour, 'amber', 'out of room but idle');
assert.equal(judge(beat({ at, room: { status: 'allowed', overage: true } }), t(1)).colour, 'red', 'overage while working');
assert.equal(judge(beat({ at, room: { status: 'allowed_warning' } }), t(1)).colour, 'amber', 'warning');
assert.equal(judge(beat({ at, room: null }), t(1)).colour, 'amber', 'usage unknown');
assert.equal(judge(beat({ at, state: 'blocked', work: { working: 0, blocked: 2 } }), t(1)).colour, 'amber', 'blocked');
assert.equal(judge(beat({ at, state: 'paused' }), t(60)).colour, 'grey', 'paused, not two beats late');
assert.equal(judge(beat({ at, state: 'paused', work: { working: 0, blocked: 0 } }), t(60 * 13)).colour, 'red', 'paused but silent too long');
assert.equal(judge(beat({ at: '2026-11-24T15:00Z' }), t(0)).colour, 'amber', 'clock ahead');
assert.equal(judge(beat({ at, room: { status: 'allowed', resets_at: '2026-11-20T00:00Z' } }), t(1)).colour, 'amber', 'stale reset');

// Alerts: only red rows.
const rows = [{ account: 'cl-1', colour: 'red', reasons: ['stopped'], beat: { at } }, { account: 'cl-2', colour: 'amber', reasons: ['x'], beat: {} }];
assert.deepEqual(dinisLines(rows, t(0)).map((l) => l.account), ['cl-1']);
console.log('heartbeat: all tests passed');
