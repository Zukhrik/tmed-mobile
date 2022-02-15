import React from 'react'
import {AllScreenModalWrapper} from '../atoms'

export const AllScreenModal = ({close, visible, body}) => {
    return (
        <AllScreenModalWrapper
            width='100%'
            title={false}
            closable={true}
            onCancel={close}
            visible={visible}
            destroyOnClose
        >
            {body}
        </AllScreenModalWrapper>
    )
}