import type { Component } from '$lib/types/component';

export interface Entity {
	/**
	 * Unique identifier for the entity.
	 */
	id: string;

	/**
	 * Components associated with the entity.
	 */
	components: Component[];
}

export function createEntity(components: Component[]): Entity {
	return {
		id: crypto.randomUUID(), // Generate a unique ID for the entity
		components
	};
}