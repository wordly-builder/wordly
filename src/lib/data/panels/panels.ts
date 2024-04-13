import GroupsIcon from 'virtual:icons/mdi/account-group';
import MapIcon from 'virtual:icons/mdi/map';
import charactersPanel from './characters.panel';
import mapsPanel from './maps.panel';

export const panels = [
    charactersPanel,
    mapsPanel,
]

export function getInactivePanels(universe: Universe) {
    let inactivePanels = [];

    for (const panel of panels) {
        if (!panel.isActive(universe)) {
            inactivePanels.push(panel);
        }
    }

    return inactivePanels;
}

export function getActivePanels(universe: Universe) {
    let activePanels = [];

    for (const panel of panels) {
        if (panel.isActive(universe)) {
            activePanels.push(panel);
        }
    }

    return activePanels;
}
