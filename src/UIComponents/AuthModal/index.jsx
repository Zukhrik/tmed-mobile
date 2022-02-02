import React from 'react'
import {FastAuthModal} from '../GlobalStyles'
import FastAuthView from '../../Views/Auth/FastAuth'

export const AuthModal = ({modalIsOpen, onCancel, action}) => {
    return (
        <FastAuthModal
            width='100%'
            title={false}
            closable={true}
            onCancel={onCancel}
            visible={modalIsOpen}
            destroyOnClose
        >
            <FastAuthView onClose={onCancel} action={action}/>
        </FastAuthModal>
    )
}