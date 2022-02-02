import React from 'react'
import {StyledTitle} from '../style'

export const Title = ({children, ...props}) => {
    return (
        <StyledTitle {...props}>
            {children}
        </StyledTitle>
    )
}