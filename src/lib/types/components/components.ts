import type { ComponentMetadata } from '$lib/types/component.metadata';
import { conceptComponent } from '$lib/types/components/concept.component';
import { textComponent } from '$lib/types/components/text.component';
import type { Component } from '$lib/types/component';
import { numberComponent } from '$lib/types/components/number.component';

export const components: ComponentMetadata[] = [
	conceptComponent,
	textComponent,
	numberComponent,
]

export function registerComponent(component: ComponentMetadata) {
	if (components.find(c => c.id === component.id)) {
		throw new Error(`Component with id ${component.id} already exists`);
	}
	components.push(component);
}

export function getComponentById(id: string): ComponentMetadata | undefined {
	return components.find(component => component.id === id);
}

export function unregisterComponent(id: string) {
	const index = components.findIndex(component => component.id === id);
	if (index === -1) {
		console.log(`Component with id ${id} does not exist or has already been unregistered`);
		return
	}
	components.splice(index, 1);
}

export function instantiateComponent(id: string): Component | undefined {
	const component = getComponentById(id);
	if (!component) {
		console.warn(`Component with id ${id} does not exist`);
		return undefined;
	}
	return {
		id: crypto.randomUUID(),
		meta: component,
		fields: component.fields.map(field => ({
			meta: field,
			value: null
		})),
	};
}