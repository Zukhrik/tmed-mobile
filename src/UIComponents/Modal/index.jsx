import React from 'react'
import {ModalCustom} from './style'

export const Modal = (
    {
        title,
        centered,
        onCancel,
        component,
        modalIsOpen,
        setModalIsOpen,
        ...otherProps
    }
) => {
    
    return (
        <ModalCustom
            title={title}
            footer={null}
            destroyOnClose
            centered={centered}
            visible={modalIsOpen}
            onCancel={() => onCancel ? onCancel() : setModalIsOpen(false)}
            {...otherProps}
        >
            {component}
        </ModalCustom>
    )
}