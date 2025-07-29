import type { ComponentMetadata } from '$lib/types/component.metadata';

export const conceptComponent: ComponentMetadata = {
	id: 'CONCEPT',
	name: 'concept',
	isUnique: true,
	fields: [
		{
			name: 'name',
			type: 'STRING',
		},
	]
}