import type { ComponentMetadata } from '$lib/types/component.metadata';
import type { ComponentField } from '$lib/types/component.field';

export interface Component {
	/**
	 * Unique identifier for the component.
	 */
	id: string;

	/**
	 * component metadata.
	 */
	meta: ComponentMetadata;

	/**
	 * Component data.
	 */
	fields: ComponentField[];
}