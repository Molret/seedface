import { cyrb53 } from './hash';

export type Rng = {
	next(): number;
	int(min: number, max: number): number;
	pick<T>(arr: readonly T[]): T;
	float(min: number, max: number): number;
	bool(p?: number): boolean;
	seed: number;
};

export function mulberry32(seed: number): () => number {
	let a = seed >>> 0;
	return function () {
		a |= 0;
		a = (a + 0x6d2b79f5) | 0;
		let t = Math.imul(a ^ (a >>> 15), 1 | a);
		t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}

export function createRng(value: string, salt = 0): Rng {
	const seed = cyrb53(value, salt);
	const next = mulberry32(seed);
	const rng: Rng = {
		next,
		seed,
		int(min: number, max: number) {
			return Math.floor(next() * (max - min + 1)) + min;
		},
		float(min: number, max: number) {
			return next() * (max - min) + min;
		},
		pick<T>(arr: readonly T[]): T {
			return arr[Math.floor(next() * arr.length)];
		},
		bool(p = 0.5) {
			return next() < p;
		},
	};
	return rng;
}
