import type { ComponentMetadataField } from '$lib/types/component.metadata.field';
import type { Component } from 'svelte';
import type { Component as WordlyComponent } from '$lib/types/component';

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

	/**
	 * inline display of the component in the UI
	 */
	inlineDisplay?: Component<InlineDisplayProps>;

	/**
	 * inline editable display of the component in the UI
	 */
	inlineDisplayEditable?: Component<InlineDisplayEditableProps>;
}

export interface InlineDisplayProps {
	component: WordlyComponent;
}

export interface InlineDisplayEditableProps {
	component: WordlyComponent;
}