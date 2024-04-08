import { env } from '$env/dynamic/private';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	return {
		session: await event.locals.auth(),
		analyticsId: env.VERCEL_ANALYTICS_ID
	};
};
