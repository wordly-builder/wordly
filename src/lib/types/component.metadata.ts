import type { ComponentMetadataField } from '$lib/types/component.metadata.field';

export interface ComponentMetadata {

	/**
	 * Unique identifier for the component.
	 */
	id: string;

	/**
	 * Name of the component.
	 */
	name: string;

	/**
	 * List of all the fields in the component.
	 */
	fields: ComponentMetadataField[];

	/**
	 * is unique (there can be only one of this component in an entity)
	 */
	isUnique: boolean;
}
