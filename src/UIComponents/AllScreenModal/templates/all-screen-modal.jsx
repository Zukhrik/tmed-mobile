import React from 'react'
import {FastAuthModal} from '../../GlobalStyles'

export const AllScreenModal = ({modalIsOpen, onCancel, content}) => {
    return (
        <FastAuthModal
            width='100%'
            title={false}
            closable={true}
            onCancel={onCancel}
            visible={modalIsOpen}
            destroyOnClose
        >
            {content}
        </FastAuthModal>
    )
}