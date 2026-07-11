#!/usr/bin/env node
import { generateAvatar } from './core/generate';
import { listThemes } from './core/themes-helpers';
import { writeFileSync } from 'node:fs';
import type { AvatarOptions, AvatarStyle, AvatarVariant, Radius } from './core/types';

function parseArgs(argv: string[]): Record<string, string | boolean> {
	const out: Record<string, string | boolean> = {};
	for (let i = 0; i < argv.length; i++) {
		const a = argv[i];
		if (!a.startsWith('--')) continue;
		const key = a.slice(2);
		const next = argv[i + 1];
		if (next == null || next.startsWith('--')) {
			out[key] = true;
		} else {
			out[key] = next;
			i++;
		}
	}
	return out;
}

function help() {
	console.log(`seedface — deterministic placeholder avatar generator

Usage:
  seedface generate --value "jane@doe.com" --out avatar.svg [options]

Options:
  --value         (required) seed string; same value → same avatar
  --out           output file (.svg or .png). Defaults to stdout
  --size          px size (default 64)
  --style         character | shape | gradient | rings | pixel (default character)
  --theme         ${listThemes().map((t) => t.id).join(' | ')} (default default)
  --variant       light | dark (default light)
  --radius        full | none | <number> (default full)
  --displayValue  override shown initials
  --background    override bg color
  --color         override fg color
  --border        add border
  --shadow        add shadow
  --animated      add CSS animation
  --salt          extra entropy
  --png           force PNG raster (needs @resvg/resvg-js)

PNG output requires "@resvg/resvg-js" (npm i -D @resvg/resvg-js).`);
}

async function main() {
	const args = parseArgs(process.argv.slice(2));
	if (args.help || args.h) {
		help();
		return;
	}
	if (!args.value) {
		console.error('Error: --value is required. Use --help for usage.');
		process.exit(1);
	}

	const opts: AvatarOptions = {
		value: String(args.value),
		size: args.size ? Number(args.size) : 64,
		style: (args.style as AvatarStyle) ?? 'character',
		theme: (args.theme as string) ?? 'default',
		variant: (args.variant as AvatarVariant) ?? 'light',
		radius: (args.radius as Radius) ?? 'full',
	};
	if (args.displayValue) opts.displayValue = String(args.displayValue);
	if (args.background) opts.background = String(args.background);
	if (args.color) opts.color = String(args.color);
	if (args.border) opts.border = true;
	if (args.shadow) opts.shadow = true;
	if (args.animated) opts.animated = true;
	if (args.salt) opts.salt = isNaN(Number(args.salt)) ? String(args.salt) : Number(args.salt);

	const data = generateAvatar(opts);
	const out = args.out ? String(args.out) : '';
	const forcePng = !!args.png || (out && out.endsWith('.png'));

	if (!forcePng) {
		const svg = data.svg;
		if (out) {
			writeFileSync(out, svg, 'utf8');
			console.log(`Wrote ${out} (${svg.length} bytes)`);
		} else {
			process.stdout.write(svg + '\n');
		}
		return;
	}

	let Resvg: typeof import('@resvg/resvg-js').Resvg;
	try {
		Resvg = (await import('@resvg/resvg-js')).Resvg;
	} catch {
		console.error('PNG output requires "@resvg/resvg-js". Install it with: npm i -D @resvg/resvg-js');
		process.exit(1);
		return;
	}
	const resvg = new Resvg(data.svg, { fitTo: { mode: 'width', value: data.size } });
	const buf = resvg.render().asPng();
	if (out) {
		writeFileSync(out, buf);
		console.log(`Wrote ${out} (${buf.length} bytes)`);
	} else {
		process.stdout.write(buf);
	}
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
