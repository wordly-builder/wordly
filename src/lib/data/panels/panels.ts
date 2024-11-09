import charactersPanel from "./characters.panel";
import mapsPanel from "./maps.panel";

export const panels = [
    charactersPanel,
    mapsPanel
    ]

export function getPanelByName(name: string) {
    return panels.find((panel) => panel.name === name);
}

export function getPanelsByName(names: string[]) {
    return panels.filter((panel) => names.includes(panel.name));
}