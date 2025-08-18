import type { ComponentMetadata } from '$lib/types/component.metadata';
import InlineTextComponent from '$lib/types/components/display/inline/InlineTextComponent.svelte';
import InlineEditableTextComponent
	from '$lib/types/components/display/inline/editable/InlineEditableTextComponent.svelte';

export const textComponent: ComponentMetadata = {
	id: 'TEXT',
	name: 'text',
	isUnique: false,
	fields: [
		{
			name: 'value',
			type: 'STRING',
		},
	],
	inlineDisplay: InlineTextComponent,
	inlineDisplayEditable: InlineEditableTextComponent
}