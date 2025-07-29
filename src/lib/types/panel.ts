import type { Component, SvelteComponent } from 'svelte';

export interface Panel {
	/**
	 * Unique identifier for the panel.
	 */
	id: string;

	/**
	 * Name of the panel.
	 */
	name: string;

	/**
	 * White icon for the panel.
	 */
	iconWhite: string;

	/**
	 * Black icon for the panel.
	 */
	iconBlack: string;

	/**
	 * Display
	 */
	display: Component<DisplayProps>
}

export interface DisplayProps {
	navigateTo: (page: string) => void;
}