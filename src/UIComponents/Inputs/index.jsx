import React from 'react'
import {PhoneInput} from './PhoneInput'
import {NormalInput} from './NormalInput'
import {SelectInput} from './SelectInput'
import {MaskedInput} from './MaskedInput'
import {PasswordInput} from './PasswordInput'

export const Input = ({inputType, ...props}) => {
    
    const renderInput = () => {
        switch (inputType) {
            case 'password':
                return <PasswordInput {...props} />
            case 'phoneInput':
                return <PhoneInput {...props} />
            case 'selectInput':
                return <SelectInput {...props}/>
            case 'masked':
                return <MaskedInput {...props}/>
            default:
                return <NormalInput {...props} />
        }
    }
    
    return (
        <>
            {renderInput()}
        </>
    )
}