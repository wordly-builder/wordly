import type { ComponentMetadataField } from '$lib/types/component.metadata.field';

export interface ComponentField {
	/**
	 * metadata field
	 */
	meta: ComponentMetadataField;
	
	/**
	 * Value of the field.
	 */
	value: Value;
}

export type Value = string | number | boolean | Date | null | Record<string, unknown> | Array<unknown>;