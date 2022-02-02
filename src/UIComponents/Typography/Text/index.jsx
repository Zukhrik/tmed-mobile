import React from 'react'
import {StyledText} from '../style'

export const Text = ({children, ...props}) => {
    return (
        <StyledText {...props}>
            {children}
        </StyledText>
    )
}