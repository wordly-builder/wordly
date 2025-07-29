import type { Panel } from '$lib/types/panel';

export const panels: Panel[] = []

export function registerPanel(panel: Panel): void {
	if (panels.find((p) => p.id === panel.id)) {
		throw new Error(`Panel with id ${panel.id} already exists.`);
	}
	panels.push(panel);
}

export function getPanelById(id: string): Panel | undefined {
	return panels.find(panel => panel.id === id);
}

export function unregisterPanel(id: string): void {
	const index = panels.findIndex(panel => panel.id === id);
	if (index === -1) {
		console.log(`Panel with id ${id} does not exist or has already been unregistered.`);
		return;
	}
	panels.splice(index, 1);
}