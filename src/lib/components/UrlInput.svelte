<!-- src/lib/components/UrlInput.svelte -->
<script lang="ts">
    import type { InputProps } from '$lib/types.js';
    import FormField from '$lib/components/FormField.svelte';

    let { 
        name,
        label,
        placeholder = '',
        value = $bindable(''),
        validator,
        error_messages = {
            required: 'This field is required',
            invalid: 'Invalid input'
        },
        required = false
    } : InputProps = $props();

    let error = $state('');
    
    // Built-in validators for special types
    const builtin_validator: RegExp = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/

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
        } else if (!builtin_validator.test(value)) {
            error = 'Please enter a valid URL';
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
</script>

<FormField {name} {label} {required} {error}>
    <input
        id={name}
        {name}
        type='url'
        {placeholder}
        autocomplete='url'
        {required}
        bind:value={value}
        oninput={() => validate(value)}
        class="block w-full rounded-md border-gray-300 shadow-sm 
            focus:border-indigo-500 focus:ring-indigo-500"
    />
</FormField>