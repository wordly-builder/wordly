import GroupsIcon from "virtual:icons/mdi/account-group";
import type {Panel} from "./panel";

const panel: Panel = {
    name: 'characters',
    icon: GroupsIcon,
    isActive: (universe: Universe) => universe.charactersPanel !== null,
    create: async (universeId: number, session: any) => {
        const response = await fetch('/api/panels/characters', {
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
    url: 'characters'
}

export default panel;
