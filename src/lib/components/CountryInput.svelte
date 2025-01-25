<!-- src/lib/components/TextInput.svelte -->
<script lang="ts">
    import type { InputProps} from '$lib/types.js';
    import FormField from '$lib/components/FormField.svelte';
    import { getLocale, getCountryData, standardizeCountry } from '$lib/utils/country.js';

    let { 
        name,
        label,
        placeholder = '',
        value = $bindable(''),
        validator,
        error_messages = {
            required: 'This field is required',
            invalid: 'Invalid input',
        },
        required = false
    } : InputProps = $props();

    let userLanguage = getLocale();
    let countryOptions = $state<{ name: string }[]>([]); // Filtered country options for autocomplete
    let allCountryOptions = getCountryData(userLanguage); 
    let error = $state('');
    
    // Built-in validator
    const builtin_validator: RegExp = /^[a-zA-Z\s]+$/;

    function validate(value: string): void {
        if (required && !value.trim()) {
            error = error_messages.required || 'Error';
            return;
        }
        if (validator) {
            if (!validator.test(value)) {
                error = error_messages.invalid || 'Invalid';
                return;
            }
        }
        else if (!builtin_validator.test(value)) {
            error = 'Please enter a valid country name';
            return;
        }
        error = '';
    }

    // Initial validation
    $effect(() => {
        if (value) {
            validate(value);
        }
    });

    function handleCountryInput(event: Event) {
        const input = (event.target as HTMLInputElement).value.trim();

        // Show autocomplete only after two characters
        if (input.length >= 2) {
            countryOptions = allCountryOptions.filter(({ name }: { name: string }) =>
            name.toLowerCase().startsWith(input.toLowerCase())
            );
        } else {
            countryOptions = []; // Clear options if input is too short
        }

        // Validate and standardize input
        const standardizedCode = standardizeCountry(input, userLanguage);
        if (!standardizedCode) {
            value = ''; // Clear the code if invalid
        } else {
            value = standardizedCode; // Store the ISO Alpha-2 code
        }
    }
</script>

<FormField {name} {label} {required} {error}>
    <input
        list="countries"
        id={name}
        {name}
        {placeholder}
        autocomplete="off"
        {required}
        oninput={handleCountryInput}
        class="block w-full rounded-md border-gray-300 shadow-sm 
            focus:border-indigo-500 focus:ring-indigo-500"
    />
    <datalist id="countries">
        {#each countryOptions as { name }}
            <option value={name}></option>
        {/each}
    </datalist>
    <input type="hidden" bind:value={value} />
</FormField>