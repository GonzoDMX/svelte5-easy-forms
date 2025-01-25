<!-- src/lib/components/DropdownSelect.svelte -->
<script lang="ts">
    import type { DropdownSelectProps } from '$lib/types.js';
    import FormField from '$lib/components/FormField.svelte';

    let {
        name,
        label,
        options,
        value = $bindable(''),
        required = false,
        placeholder = 'Select an option',
        error_messages = {
            required: 'Please select an option'
        }
    } : DropdownSelectProps = $props();

    let error = $derived(required && !value ? error_messages.required : '');
</script>

<FormField {name} {label} {error}>
    <select
        id={name}
        {name}
        {required}
        bind:value={value}
        class="block w-full rounded-md border-gray-300 shadow-sm
               focus:border-indigo-500 focus:ring-indigo-500"
    >
        <option value="" disabled selected hidden>{placeholder}</option>
        {#each options as option}
            <option value={option}>{option}</option>
        {/each}
    </select>
</FormField>