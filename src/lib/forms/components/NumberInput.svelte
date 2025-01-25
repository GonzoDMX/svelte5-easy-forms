<!-- src/lib/forms/components/NumberInput.svelte -->
<script lang="ts">
    import type { NumberInputProps } from '../types';
    import FormField from './FormField.svelte';

    let {
        name,
        label,
        prefix,
        suffix,
        decimal_places,
        steps = 1,
        bind_value,
        value,
        max,
        min,
        required = false,
        error_messages = {
            required: 'This field is required',
            min: 'Value is below minimum allowed',
            max: 'Value is above maximum allowed',
            invalid: 'Please enter a valid number'
        }
    } : NumberInputProps = $props();

    let error = $state('');

    // Set initial value if provided
    $effect(() => {
        if (value !== undefined && bind_value === null) {
            bind_value = value;
        }
    });

    function formatValue(val: number | null): string {
        if (val === null) return '';
        return decimal_places !== undefined 
            ? val.toFixed(decimal_places)
            : Math.round(val).toString();
    }

    function validateNumber(num: number | null) {
        if (required && (num === null || num === undefined)) {
            error = error_messages.required || 'Error';
            return;
        }

        if (num !== null) {
            if (min !== undefined && num < min) {
                error = error_messages.min || 'Error';
                return;
            }

            if (max !== undefined && num > max) {
                error = error_messages.max || 'Error';
                return;
            }
        }

        error = '';
    }

    function handleInput(event: Event) {
        const input = (event.target as HTMLInputElement).value;
        
        if (input === '') {
            bind_value = required ? 0 : null;
        } else {
            const num = Number(input);
            if (isNaN(num)) {
                error = error_messages.invalid || 'Error';
                return;
            }
            bind_value = num;
        }
        
        validateNumber(bind_value);
    }

    // Initial validation
    $effect(() => {
        validateNumber(bind_value);
    });
</script>

<FormField {name} {label} {required} {error}>
    <div class="relative rounded-md shadow-sm">
        {#if prefix}
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span class="text-gray-500 sm:text-sm">{prefix}</span>
            </div>
        {/if}
        <input
            type="number"
            {name}
            {required}
            value={formatValue(bind_value)}
            oninput={handleInput}
            step={steps}
            {max}
            {min}
            class="block w-full rounded-md border-gray-300 shadow-sm
                   focus:border-indigo-500 focus:ring-indigo-500
                   {prefix ? 'pl-7' : ''} {suffix ? 'pr-7' : ''}"
        />
        {#if suffix}
            <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span class="text-gray-500 sm:text-sm">{suffix}</span>
            </div>
        {/if}
    </div>
</FormField>