import React from 'react'
import {FastAuthModalWrapper} from '../../GlobalStyles'

export const FastAuthModal = ({modalIsOpen, onCancel, content}) => {
    return (
        <FastAuthModalWrapper
            width='100%'
            title={false}
            closable={true}
            onCancel={onCancel}
            visible={modalIsOpen}
            destroyOnClose
        >
            {content}
        </FastAuthModalWrapper>
    )
}