import React from 'react'
import {
    AutocompleteSelect,
    DateInput,
    MaskedInput,
    NormalInput,
    PasswordInput,
    PhoneInput,
    SelectInput,
    TextareaInput,
    UploadInput
} from '../maleculas'
import {KeyboardDateInput} from '../maleculas/keyboard-date-input'

export const InputUI = ({inputType, ...props}) => {
    const renderInput = () => {
        switch (inputType) {
            case 'phone':
                return <PhoneInput {...props} />
            case 'autocomplete-select':
                return <AutocompleteSelect {...props}/>
            case 'textarea':
                return <TextareaInput {...props} />
            case 'select':
                return <SelectInput {...props} />
            case 'date':
                return <DateInput {...props} />
            case 'masked':
                return <MaskedInput {...props}/>
            case 'upload':
                return <UploadInput {...props} />
            case 'password':
                return <PasswordInput {...props}/>
            case 'keyboardDate':
                return <KeyboardDateInput {...props} />
            default:
                return <NormalInput {...props}/>
        }
    }
    return (
        <>
            {renderInput()}
        </>
    )
}