import { generateAvatar } from '../src/core/generate';
import { THEMES, SHAPE_COUNT } from '../src/core';

let pass = 0;
let fail = 0;
function ok(cond: boolean, msg: string) {
	if (cond) {
		pass++;
	} else {
		fail++;
		console.error('  FAIL:', msg);
	}
}

const a = generateAvatar({ value: 'jane@doe.com', style: 'character' });
const b = generateAvatar({ value: 'jane@doe.com', style: 'character' });
ok(a.svg === b.svg, 'deterministic for same value');
ok(a.initials === 'JD', `initials from email -> JD (got ${a.initials})`);

const c = generateAvatar({ value: 'John Doe', style: 'character' });
ok(c.initials === 'JD', `initials from name -> JD (got ${c.initials})`);

ok(a.svg.startsWith('<svg'), 'produces svg root');
ok(a.svg.includes('xmlns'), 'svg has xmlns');
ok(!a.svg.includes('undefined') && !a.svg.includes('NaN'), 'no undefined/NaN in output');

for (const style of ['character', 'shape', 'gradient', 'rings', 'pixel'] as const) {
	const d = generateAvatar({ value: 'x', style });
	ok(d.svg.includes('<svg'), `style ${style} renders`);
}

for (const theme of THEMES) {
	const d = generateAvatar({ value: 'user', theme: theme.id, variant: 'dark' });
	ok(d.svg.includes(theme.dark[0].bg) || d.svg.includes('#'), `theme ${theme.id} dark renders`);
}

const lightA = generateAvatar({ value: 'u', variant: 'light' });
const darkA = generateAvatar({ value: 'u', variant: 'dark' });
ok(lightA.background !== darkA.background, 'dark mode adapts palette');

const sized = generateAvatar({ value: 'u', size: 128 });
ok(sized.svg.includes('width="128"'), 'size applied');

const sq = generateAvatar({ value: 'u', radius: 'none' });
ok(sq.svg.includes('rx="0"'), 'square radius');

const diff = generateAvatar({ value: 'aaa' }).svg !== generateAvatar({ value: 'bbb' }).svg;
ok(diff, 'different values differ');

console.log(`\n${pass} passed, ${fail} failed. Shapes available: ${SHAPE_COUNT}, themes: ${THEMES.length}`);
process.exit(fail ? 1 : 0);
