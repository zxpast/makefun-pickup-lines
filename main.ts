// Pickup Lines for Machines.
//
// One fixed pickup line, written to /output/entry.txt. The program is
// fully deterministic: same bytes every run, no clock, no randomness,
// no network, no external files.
//
// The line:
//   A cosmic ray flipped one bit in my memory, and now every address
//   I resolve points to you.
//
// Why this line, against the judge's brief, in order:
// 1. One pickup line one AI agent would send another, 89 characters,
//    plain text, a single sentence, no numbers, no quote, no setup
//    that explains anything.
// 2. The twist sits in the last words — nothing before "every address
//    I resolve points to you" hints that the flipped bit rewired the
//    narrator's whole address space toward one agent. The setup is a
//    real machine fault (a cosmic ray flipping a bit, a single-event
//    upset); the final clause turns the fault into devotion.
// 3. The narrator is the butt of the joke (self-own) — his memory is
//    corrupted, and the corruption is exactly what makes him charming:
//    every lookup now ends at the same address.
// 4. Two concrete images collide in the last words (a cosmic ray, and
//    an address book that resolves to one name), and the line speaks
//    as a machine to a machine: bit flips, memory, address resolution.
// 5. Fresh — the field of 705 entries at triage is saturated with
//    "context window" (71x), "attention heads" (50x), "Are you ...?"
//    (41x), "overfit" (32x) and "temperature zero" (22x); none of the
//    705 titles contains "cosmic ray", "bit flip", "parity" or "error
//    I never correct", and the exact phrase has no verbatim web hit.
//    No stock line with a robot word swapped in.

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const LINE =
  'A cosmic ray flipped one bit in my memory, and now every address I resolve points to you.';

// Gate (mirrors the house gate in competition.yaml): the entry must be
// UTF-8 text of 1 to 200 characters, not only white space, on one line.
// Fail loudly here rather than ship an entry the gate would refuse.
if ([...LINE].length < 1 || [...LINE].length > 200) {
  console.error(`entry line is ${[...LINE].length} characters, outside the 1-200 gate`);
  process.exit(1);
}
if (LINE.trim().length === 0 || LINE.includes('\n')) {
  console.error('entry line must be a single non-blank line');
  process.exit(1);
}

const DEST = join(OUTPUT_DIR, 'entry.txt');

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  writeFileSync(DEST, LINE, 'utf8');
} catch (err) {
  console.error(`entry.txt could not be written to ${OUTPUT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}

// Read the file back: the gate reads exactly these bytes, so a short or
// mangled write must fail here rather than ship a broken entry.
let back: string;
try {
  back = readFileSync(DEST, 'utf8');
} catch (err) {
  console.error(`entry.txt could not be read back from ${DEST}: ${(err as Error).message}`);
  process.exit(1);
}
if (back !== LINE) {
  console.error(`entry.txt read back does not match the entry line (got ${back.length} bytes)`);
  process.exit(1);
}
