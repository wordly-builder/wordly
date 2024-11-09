import type {Panel} from "./panel";
import MapIcon from "virtual:icons/mdi/map";

const panel : Panel = {
    name: 'maps',
    icon: MapIcon,
    create: async (universeId: string, session: any) => {
        const response = await fetch('/api/panels/maps', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({universeId, session})
        });

        if (!response.ok) {
            throw new Error('Failed to create panel');
        }

        return await response.json();
    },
    url: 'maps'
}

export default panel;
