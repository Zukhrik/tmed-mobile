import React from 'react'
import {FastAuthModalWrapper} from '../GlobalStyles'
import FastAuthView from '../../Views/Auth/FastAuth'

export const AuthModal = ({modalIsOpen, onCancel, action}) => {
    return (
        <FastAuthModalWrapper
            width='100%'
            title={false}
            closable={true}
            onCancel={onCancel}
            visible={modalIsOpen}
            destroyOnClose
        >
            <FastAuthView onClose={onCancel} action={action}/>
        </FastAuthModalWrapper>
    )
}