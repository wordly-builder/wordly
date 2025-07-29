import type { LoroDoc } from 'loro-crdt';

export interface Feature {
    /**
     * Unique identifier for the feature.
     */
    id: string;

    /**
     * Name of the feature.
     */
    name: string;

    /**
     * Description of the feature.
     */
    description: string;

    /**
     * Icon of the feature in white color.
     */
    iconWhite: string;

    /**
     * Icon of the feature in black color.
     */
    iconBlack: string;

    /**
     * List the features required by this feature.
     */
    requiredFeatures: string[];

    /**
     * Function executed when the feature is enabled.
     */
    onEnable: (loroDoc: LoroDoc) => void;

    /**
     * Function executed when the feature is disabled.
     */
    onDisable: (loroDoc: LoroDoc) => void;

}