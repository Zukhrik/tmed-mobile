import React from 'react'
import {Avatar} from '../../../UIComponents/Avatar'
import {Title} from '../../../UIComponents/Typography/Title'
import {Text} from '../../../UIComponents/Typography/Text'
import {OrgSpecCatCardWrapper} from './style'

export const OrgSpecialistCard = ({src, name, category}) => {
    return (
        <OrgSpecCatCardWrapper>
            <Avatar size={60} imgUrl={src}/>
            <>
                <Text
                    color='var(--grey-dwed)'
                    level={6}
                >
                    {category}
                </Text>
                <Title>{name}</Title>
            </>
        </OrgSpecCatCardWrapper>
    )
}