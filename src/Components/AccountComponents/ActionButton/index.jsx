import React, {useState} from 'react'
import {PlusSvg} from '../../../Icons/Plus'
import {PopUpContainer} from '../PopUpContainer'
import {ActionPlusWrapper, ActionWrapper} from '../style'

export const ActionButton = () => {
    const [container, setContainer] = useState(null)
    
    return (
        <ActionWrapper onClick={() => setContainer(!container)}>
            <ActionPlusWrapper active={container}>
                <PlusSvg/>
            </ActionPlusWrapper>
            {
                container && (
                    <PopUpContainer/>
                )
            }
        </ActionWrapper>
    )
}