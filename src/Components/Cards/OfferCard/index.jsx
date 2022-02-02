import React from 'react'
import Text from 'antd/es/typography/Text'
import {useHistory} from 'react-router-dom'
import {Avatar} from '../../../UIComponents/Avatar'
import {Title} from '../../../UIComponents/Typography/Title'
import {AvatarWrapper, OfferCardWrapper, OfferInfoWrapper} from './style'

export const OfferCard = ({imgUrl, offerName, cost, item}) => {
    const {push} = useHistory()
    const handleClick = (event) => {
        push(`/${event.org.slug_name}/offerings/${event.id}`)
    }
    return (
        <OfferCardWrapper onClick={() => handleClick(item)}>
            <AvatarWrapper>
                <Avatar
                    shape='square'
                    imgUrl={imgUrl}
                    size={138}
                />
                {/*<IconBox><ShoppingBagSvg/></IconBox>*/}
            </AvatarWrapper>
            <OfferInfoWrapper>
                <Text level={5}>{offerName}</Text>
                <Title level={4}>{cost}</Title>
            </OfferInfoWrapper>
        </OfferCardWrapper>
    )
}