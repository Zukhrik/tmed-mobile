import React from 'react'
import i18next from "i18next";
import {message} from 'antd'
import {AlertCircleSvg} from '../../Icons/Alert';
import {CheckMarkSquareCheckedSvg} from '../../Icons/CheckMark';

const getIcon = (type) => {
    switch (type) {
        case 'danger':
            return <AlertCircleSvg style={{color: '#FF3D71'}}/>
        default:
            return <CheckMarkSquareCheckedSvg style={{color: '#2BCBBA'}}/>
    }
}

export const showMessage = (content, type = 'success', translate = true) => {
    const config = {
        content: translate ? i18next.t(content) : content,
        icon: getIcon(type),
        duration: 1
    }
    switch (type) {
        default:
            message.success({...config})
    }
}