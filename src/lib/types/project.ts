export interface Project {
		/**
		 * Unique identifier for the project.
		 */
		id: string;

		/**
		 * Name of the project.
		 */
		name: string;

		/**
		 * List of features associated with this project.
		 */
		features: string[];
}