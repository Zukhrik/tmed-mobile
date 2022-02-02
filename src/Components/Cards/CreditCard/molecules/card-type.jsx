import React from 'react'
import {CardTypeItem} from '../atoms'
import {HUMOSvg, UZCARDSvg} from '../../../../Icons/Cards'

export const CardType = ({cardNum}) => {
    const generateCardType = (number) => {
        if (Number(number.substr(0, 4)) === 8600) {
            return <UZCARDSvg/>
        } else {
            return <HUMOSvg/>
        }
    }
    
    return (
        <CardTypeItem>
            {generateCardType(cardNum)}
        </CardTypeItem>
    )
}