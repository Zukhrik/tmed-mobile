import React from 'react'
import {RootContent} from '../../../UIComponents/GlobalStyles'
import {FixedHeader} from '../../../Components/FixedHeader'
import {AccountFallsFixedHeader} from '../organisms'

export const AccountFallsWireframe = ({title, goBack, followers, followings, list}) => {
    
    
    return (
        <RootContent
            paddingTop='112px'
        >
            <FixedHeader
                height='auto'
                component={<AccountFallsFixedHeader
                    followers={followers}
                    followings={followings}
                    goBack={goBack}
                    title={title}
                />}
            />
            {list}
        </RootContent>
    )
}