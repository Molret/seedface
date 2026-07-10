import { generateAvatar } from './core/generate';
import type { AvatarOptions, Radius } from './core/types';

const ATTR_MAP: Record<string, keyof AvatarOptions> = {
	value: 'value',
	size: 'size',
	style: 'style',
	theme: 'theme',
	variant: 'variant',
	radius: 'radius',
	border: 'border',
	bordersize: 'borderSize',
	bordercolor: 'borderColor',
	shadow: 'shadow',
	animated: 'animated',
	background: 'background',
	color: 'color',
	displayvalue: 'displayValue',
	salt: 'salt',
	title: 'title',
};

const BOOL = new Set(['border', 'shadow', 'animated']);

function parseAttr(name: string, raw: string | null): [keyof AvatarOptions, unknown] | null {
	const key = ATTR_MAP[name];
	if (!key) return null;
	if (raw == null) return null;
	if (BOOL.has(key as string)) return [key, raw !== 'false' && raw !== '0' && raw !== ''];
	if (key === 'size' || key === 'borderSize') return [key, Number(raw)];
	if (key === 'radius') {
		if (raw === 'full' || raw === 'none') return [key, raw as Radius];
		return [key, Number(raw)];
	}
	return [key, raw];
}

export class SeedfaceAvatar extends HTMLElement {
	private _opts: Partial<AvatarOptions> = {};

	static get observedAttributes() {
		return Object.keys(ATTR_MAP);
	}

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this._syncFromAttributes();
		this.render();
	}

	attributeChangedCallback() {
		this._syncFromAttributes();
		this.render();
	}

	private _syncFromAttributes() {
		const opts: Partial<AvatarOptions> = {};
		for (const attr of this.attributes) {
			const parsed = parseAttr(attr.name, attr.value);
			if (parsed) opts[parsed[0]] = parsed[1] as never;
		}
		this._opts = opts;
	}

	private render() {
		if (!this._opts.value) {
			if (this.shadowRoot) this.shadowRoot.innerHTML = '';
			return;
		}
		const data = generateAvatar(this._opts as AvatarOptions);
		const style = document.createElement('style');
		style.textContent = ':host{display:inline-block;line-height:0}';
		const holder = document.createElement('div');
		holder.innerHTML = data.svg;
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = '';
			this.shadowRoot.appendChild(style);
			this.shadowRoot.appendChild(holder);
		}
	}
}

export function registerSeedface(tag = 'seedface-avatar') {
	if (typeof customElements === 'undefined') return;
	if (!customElements.get(tag)) {
		customElements.define(tag, SeedfaceAvatar);
	}
}

// Auto-register on import in browser environments.
if (typeof window !== 'undefined' && typeof customElements !== 'undefined') {
	registerSeedface();
}
