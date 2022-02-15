import React from 'react'
import {useStore} from 'effector-react'
import {GroupItemNavLink} from '../style'
import {$appModel} from '../../../../Models/app'
import {INFO_MAT} from '../../../../Constants/app'
import {Text} from '../../../../UIComponents/Typography/Text'

export const OfferingGroupItem = ({imgUrl, path, isActive, name}) => {
    const {$device} = useStore($appModel)
    
    return (
        <GroupItemNavLink
            to={path}
            isActive={() => isActive()}
            maxwidth={$device && $device === INFO_MAT ? '120px' : ''}
        >
            <img src={imgUrl} alt={name}/>
            <Text
                className='offering-group-name'
                level={$device && $device === INFO_MAT ? 3 : 5}
            >
                {name}
                {/*{truncateString(name, $device && $device === INFO_MAT ? 6 : 7)}*/}
            </Text>
        </GroupItemNavLink>
    )
}