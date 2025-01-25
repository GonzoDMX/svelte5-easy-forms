<!-- src/lib/forms/components/TextInput.svelte -->
<script lang="ts">
    import type { TextInputProps, TextInputType } from '../types';
    import FormField from './FormField.svelte';
    import { getLocale, getCountryData, standardizeCountry } from '../utils/country';

    let { 
        name,
        type,
        label,
        placeholder = '',
        value = $bindable(''),
        autocomplete = 'off',
        validator,
        error_messages = {
            required: 'This field is required',
            invalid: 'Invalid input',
            type: {
                email: 'Please enter a valid email address',
                url: 'Please enter a valid URL',
                tel: 'Please enter a valid phone number',
                country: 'Please enter a valid country name',
                password: 'Please enter a valid password'
            }
        },
        required = false
    } : TextInputProps = $props();

    let userLanguage = getLocale();
    let countryOptions = $state<{ name: string }[]>([]); // Filtered country options for autocomplete
    let allCountryOptions = getCountryData(userLanguage); 
    let error = $state('');
    
    // Built-in validators for special types
    const validators: Record<Exclude<TextInputType, 'text'>, RegExp> = {
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        url: /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
        tel: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
        country: /^[a-zA-Z\s]+$/,
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]{12,}$/ // At least 12 characters, 1 uppercase, 1 lowercase, 1 number, 1 non-alphanumeric symbol
    };

    function validate(value: string): void {
        if (required && !value.trim()) {
            error = error_messages.required || 'Error';
            return;
        }

        if (type !== 'text') {
            const validatorType = type as Exclude<TextInputType, 'text'>;
            if (validatorType in validators && !validators[validatorType].test(value)) {
                error = error_messages.type?.[validatorType] ?? `Please enter a valid ${type}`;
                return;
            }
        }
        
        if (validator && !validator.test(value)) {
            error = error_messages.invalid || 'Invalid';
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
            countryOptions = allCountryOptions.filter(({ name }) =>
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
    {#if type === 'country'}
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
    {:else}
        <input
            id={name}
            {name}
            {type}
            {placeholder}
            {autocomplete}
            {required}
            bind:value={value}
            oninput={() => validate(value)}
            class="block w-full rounded-md border-gray-300 shadow-sm 
                focus:border-indigo-500 focus:ring-indigo-500"
        />
    {/if}
</FormField>