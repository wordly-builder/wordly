<script lang="ts">
    import type {Feature} from "$lib/features/feature";

    interface Props {
        feature: Feature,
        checked: boolean,
        onChange: (value: boolean) => void
    }

    let { feature, checked = $bindable(), onChange }: Props = $props();
    let isDarkMode = $state(window.matchMedia('(prefers-color-scheme: dark)').matches);
    let icon = $derived(isDarkMode ? feature.iconWhite : checked ? feature.iconWhite : feature.iconBlack);

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
        isDarkMode = event.matches;
    });
</script>

<div class="flex flex-row">
    <input
        type="checkbox"
        class="peer hidden"
        id="feature-{feature.id}"
        name="feature-{feature.id}"
        bind:checked
        onchange={() => {
            icon = isDarkMode ? feature.iconWhite : checked ? feature.iconWhite : feature.iconBlack;
            onChange(checked);
        }}>
    <label for="feature-{feature.id}"
           class="flex items-center justify-between w-full p-2 bg-elevation-1 dark:bg-dark-elevation-1 rounded-lg cursor-pointer peer-checked:bg-primary peer-checked:text-white hover:peer-checked:bg-primary-hover hover:bg-elevation-2 dark:hover:bg-dark-elevation-2 transition-colors">
        <div class="flex items-center">
            <img src={icon}
                 alt={feature.name}
                 id="feature-icon-{feature.id}"
                 class="w-6 h-6 mr-2">
            <span class="text-lg font-semibold">{feature.name}</span>
        </div>
        <span class="text-sm text-gray-500">{feature.description}</span>
    </label>
</div>