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

}