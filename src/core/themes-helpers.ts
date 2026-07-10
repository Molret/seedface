import { THEMES } from './themes';

export function listThemes() {
	return THEMES.map((t) => ({ id: t.id, name: t.name, description: t.description }));
}
