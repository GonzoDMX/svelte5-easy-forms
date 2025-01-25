<!-- src/lib/components/PasswordInput.svelte -->
<script lang="ts">
    import type { InputProps } from '$lib/types.js';
    import FormField from '$lib/components/FormField.svelte';

    let { 
        name,
        label = 'Password',
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
    
    // At least 12 characters, 1 uppercase, 1 lowercase, 1 number, 1 non-alphanumeric symbol
    const builtin_validator: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]{12,}$/

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
            error = 'Please enter a valid password';
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
        type='password'
        {placeholder}
        autocomplete='off'
        {required}
        bind:value={value}
        oninput={() => validate(value)}
        class="block w-full rounded-md border-gray-300 shadow-sm 
            focus:border-indigo-500 focus:ring-indigo-500"
    />
</FormField>