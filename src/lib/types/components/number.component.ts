import type { ComponentMetadata } from '$lib/types/component.metadata';
import InlineEditableNumberComponent
	from '$lib/types/components/display/inline/editable/InlineEditableNumberComponent.svelte';

export const numberComponent: ComponentMetadata = {
	id: 'NUMBER',
	name: 'number',
	isUnique: false,
	fields: [
		{
			name: 'value',
			type: 'NUMBER',
		},
	],
	inlineDisplay: undefined,
	inlineDisplayEditable: InlineEditableNumberComponent,
}