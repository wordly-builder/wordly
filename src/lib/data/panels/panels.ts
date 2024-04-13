import charactersPanel from './characters.panel';
import mapsPanel from './maps.panel';
import type {Panel} from "./panel";

export const panels = [
    charactersPanel,
    mapsPanel,
]

export function getInactivePanels(universe: Universe) {
    let inactivePanels: Panel[] = [];

    if (!universe) {
        return inactivePanels;
    }

    for (const panel of panels) {
        if (!panel.isActive(universe)) {
            inactivePanels.push(panel);
        }
    }

    return inactivePanels;
}

export function getActivePanels(universe: Universe) {
    let activePanels: Panel[] = [];

    if (!universe) {
        return activePanels;
    }

    for (const panel of panels) {
        if (panel.isActive(universe)) {
            activePanels.push(panel);
        }
    }

    return activePanels;
}
