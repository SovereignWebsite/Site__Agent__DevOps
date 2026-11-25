// a.devops's wake check: node heartbeat/run.mjs  (prints each home's colour, then the "Dinis:" lines as JSON).
// Reads the public raw heartbeat files; writes nothing.
import { readAll, dinisLines } from './heartbeat.mjs';
const now = new Date();
const rows = await readAll(undefined, now);
for (const r of rows) console.log(`${r.account.padEnd(5)} ${r.colour.padEnd(6)} ${r.beat?.at ?? '-'}  ${r.reasons.join('; ')}`);
console.log(JSON.stringify({ 'Dinis:': dinisLines(rows, now) }, null, 2));
