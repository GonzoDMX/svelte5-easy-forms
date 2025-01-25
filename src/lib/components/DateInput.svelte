<!-- src/lib/forms/components/DateInput.svelte -->
<script lang="ts">
    import type { DateInputProps } from '../types';
    import FormField from './FormField.svelte';

    let {
        name,
        label,
        bind_value,
        value,
        min_date,
        max_date,
        required = false,
        error_messages = {
            required: 'This field is required',
            min_date: 'Date is before minimum allowed date',
            max_date: 'Date is after maximum allowed date'
        }
    } : DateInputProps = $props();

    // Set initial value if provided
    $effect(() => {
        if (value !== undefined && bind_value === null) {
            bind_value = value;
        }
    });

    let error = $state('');

    function formatDate(date: Date): string {
        return date.toISOString().split('T')[0];
    }

    function validateDate(date: Date) {
        if (required && !date) {
            error = error_messages.required || 'Error';
            return;
        }

        if (min_date && date < min_date) {
            error = error_messages.min_date || 'Error';
            return;
        }

        if (max_date && date > max_date) {
            error = error_messages.max_date || 'Error';
            return;
        }

        error = '';
    }

    function handleDateChange(event: Event) {
        const input = (event.target as HTMLInputElement).value;
        if (!input && !required) {
            bind_value = null;
            error = '';
            return;
        }
        
        bind_value = new Date(input);
        validateDate(bind_value);
    }

    // Initial validation
    $effect(() => {
        if (bind_value) {
            validateDate(bind_value);
        }
    });
</script>

<FormField {name} {label} {required} {error}>
    <input
        type="date"
        {name}
        {required}
        value={bind_value ? formatDate(bind_value) : ''}
        min={min_date ? formatDate(min_date) : undefined}
        max={max_date ? formatDate(max_date) : undefined}
        onchange={handleDateChange}
        class="block w-full rounded-md border-gray-300 shadow-sm
               focus:border-indigo-500 focus:ring-indigo-500"
    />
</FormField>