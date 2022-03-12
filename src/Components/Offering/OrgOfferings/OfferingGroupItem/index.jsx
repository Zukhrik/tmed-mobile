import React from 'react'
import {useStore} from 'effector-react'
import {GroupItemNavLink} from '../style'
import {$appModel} from '../../../../Models/app'
import {INFO_MAT} from '../../../../Constants/app'
import {Text} from '../../../../UIComponents/Typography/Text'
import {Avatar} from '../../../../UIComponents/Avatar'

export const OfferingGroupItem = ({imgUrl, path, isActive, name}) => {
    const {$device} = useStore($appModel)
    
    return (
        <GroupItemNavLink
            to={path}
            isActive={() => isActive()}
        >
            <Avatar size={60} shape='circular' imgUrl={imgUrl}/>
            <Text
                className='offering-group-name'
                level={$device && $device === INFO_MAT ? 3 : 5}
            >
                {name}
            </Text>
        </GroupItemNavLink>
    )
}