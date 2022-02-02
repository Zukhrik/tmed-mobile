import React from 'react'
import {OverlayContentWrapper, OverlayWrapper, SettingsOverlayWrapper} from './style'

export const OverlaySettings = ({onClose, openSettings, content}) => {
    
    return (
        <OverlayWrapper status={openSettings}>
            <SettingsOverlayWrapper
                onClick={onClose}
                status={openSettings}
            />
            <OverlayContentWrapper>
                {content}
            </OverlayContentWrapper>
        </OverlayWrapper>
    )
}