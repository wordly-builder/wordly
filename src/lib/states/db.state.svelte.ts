import { PGlite } from '@electric-sql/pglite';

export const dbState = $state(
	{
		db: null,
	} as { db: PGlite | null }
)