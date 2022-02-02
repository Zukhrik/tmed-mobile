import React from 'react'
import {AuthContainer, ImageWrapper} from '../../style'
import {Title} from '../../../../UIComponents/Typography/Title'

export const Agreement = () => {
    return (
        <AuthContainer>
            <ImageWrapper>
                <Title level={3}>Пользовательское соглашение</Title>
            </ImageWrapper>
        </AuthContainer>
    )
}