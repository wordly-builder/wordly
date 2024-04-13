import GroupsIcon from 'virtual:icons/mdi/account-group';
import MapIcon from 'virtual:icons/mdi/map';

export const panels = [
    {name: 'characters', icon: GroupsIcon},
    {name: 'maps', icon: MapIcon},
]

export function getInactivePanels(universe: Universe) {
    let inactivePanels = [...panels];
    if (universe.charactersPanel !== null) {
        inactivePanels = inactivePanels.filter(panel => panel.name !== 'characters');
    }
    if (universe.mapsPanel !== null) {
        inactivePanels = inactivePanels.filter(panel => panel.name !== 'maps');
    }
    return inactivePanels;
}

export function getActivePanels(universe: Universe) {
    let activePanels = [...panels];
    if (universe.charactersPanel === null) {
        activePanels = activePanels.filter(panel => panel.name !== 'characters');
    }
    if (universe.mapsPanel === null) {
        activePanels = activePanels.filter(panel => panel.name !== 'maps');
    }
    return activePanels;
}
