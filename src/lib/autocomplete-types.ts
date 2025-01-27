// src/lib/autocomplete-types.ts
export type AutocompleteType =
    | 'off'
    | 'on'
    | 'name'
        | 'honorific-prefix'
        | 'given-name'
        | 'additional-name'
        | 'family-name'
        | 'honorific-suffix'
        | 'nickname'
    | 'sex'
    | 'username'
    | 'new-password'
    | 'one-time-code'
    | 'current-password'
    | 'tel'
        | 'tel-country-code'
        | 'tel-national'
        | 'tel-area-code'
        | 'tel-local'
        | 'tel-extension'
    | 'email'
    | 'url'
    | 'photo'
    | 'language'
    | 'organization-title'
    | 'organization'
    | 'bday'
        | 'bday-day'
        | 'bday-month'
        | 'bday-year'
    | 'street-address'
        | 'address-line1'
        | 'address-line2'
        | 'address-line3'
    | 'country-name'
    | 'country'
    | 'postal-code'
    | 'cc-name'
        | 'cc-given-name'
        | 'cc-additional-name'
        | 'cc-family-name'
    | 'cc-number'
    | 'cc-exp'
        | 'cc-exp-month'
        | 'cc-exp-year'
    | 'cc-csc'
    | 'cc-type'
    | 'transaction-currency'
    | 'transaction-amount';