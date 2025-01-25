// src/lib/forms/types.ts
import type { AutocompleteType } from '$lib/autocomplete-types.js'
export type FormStyle = 'default' | 'compact' | 'bordered';

export type FormProps = {
    title?: string;
    description?: string;
    style?: FormStyle;
    submit_label?: string;
    on_submit: (event: SubmitEvent) => void;
    is_submitting?: boolean;
    children: () => any;
};

export type Width = 'full' | 'half';

export interface FormFieldProps {
    name: string;
    label: string;
    required?: boolean;
    error?: string;
    children: () => any; // Function that returns child content
}

export type TextInputType = 'text' | 'email' | 'url' | 'tel' | 'country' | 'password';

export type TextInputErrorMessages = {
    required?: string;
    invalid?: string;
    type?: Record<Exclude<TextInputType, 'text'>, string>;
};

export type TextInputProps = {
    name: string;
    type: TextInputType;
    label: string;
    placeholder?: string;
    value?: string;
    autocomplete?: AutocompleteType;
    validator?: RegExp;
    error_messages?: TextInputErrorMessages;
    required?: boolean;
};

export type TextAreaErrorMessages = {
    invalid?: string;
    required?: string;
};

export type TextAreaProps = {
    name: string;
    label: string;
    placeholder?: string;
    value?: string;
    autocomplete?: AutocompleteType;
    validator?: RegExp;
    error_messages?: TextAreaErrorMessages;
    min_height?: number;
    height?: number;
    max_height?: number;
    resize?: boolean;
    required?: boolean;
};

export type NumberInputErrorMessages = {
    required?: string;
    min?: string;
    max?: string;
    invalid?: string;
};

export type NumberInputProps = {
    name: string;
    label: string;
    prefix?: string;
    suffix?: string;
    decimal_places?: number;
    steps?: number;
    bind_value: number | null;
    value?: number;
    max?: number;
    min?: number;
    required?: boolean;
    error_messages?: NumberInputErrorMessages;
};

export type ConsentCheckProps = {
    required?: boolean;
    name: string;
    text: string;
    checked: boolean;
};

export type DateRangeErrorMessages = {
    required?: string;
    min_date?: string;
    max_date?: string;
    invalid_range?: string;
};

export type DateRangeProps = {
    name: string;
    label: string;
    bind_start_date: Date | null;
    bind_end_date: Date | null;
    start_value?: Date;
    end_value?: Date;
    min_date?: Date;
    max_date?: Date;
    required?: boolean;
    error_messages?: DateRangeErrorMessages;
};

export type DateInputErrorMessages = {
    required?: string;
    min_date?: string;
    max_date?: string;
};

export type DateInputProps = {
    name: string;
    label: string;
    bind_value: Date | null;
    value?: Date;
    min_date?: Date;
    max_date?: Date;
    required?: boolean;
    error_messages?: DateInputErrorMessages;
};

export type CheckboxGroupProps = {
    name: string;
    label: string;
    options: string[];
    group: string[];
    required?: boolean;
    columns?: 2 | 3 | 4;
    error_messages?: {
        required?: string;
    };
};

export type DropdownSelectProps = {
    name: string;
    label: string;
    options: string[];
    value: string;
    required?: boolean;
    placeholder?: string;
    error_messages?: {
        required?: string;
    };
};