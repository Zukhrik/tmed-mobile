import React from 'react'
import {GroupItemNavLink} from '../style'
import {Text} from '../../../../UIComponents/Typography/Text'

export const OfferingGroupItem = ({imgUrl, path, isActive, name}) => {
    
    return (
        <GroupItemNavLink
            to={path}
            isActive={() => isActive()}
        >
            <img src={imgUrl} alt={imgUrl}/>
            <Text level={5}>
                {name}
            </Text>
        </GroupItemNavLink>
    )
}