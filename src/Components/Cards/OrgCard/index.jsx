import React from 'react'
import {Avatar} from '../../../UIComponents/Avatar'
import {OrgCardInfoWrapper, OrgCardsWrapper} from './style'

export const OrgCard = ({imgUrl}) => {
    return (
        <OrgCardsWrapper>
            <OrgCardInfoWrapper>
                <Avatar
                    size={134}
                    shape='square'
                    imgUrl={imgUrl}
                />
            </OrgCardInfoWrapper>
        </OrgCardsWrapper>
    )
}