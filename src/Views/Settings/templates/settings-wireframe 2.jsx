import React from 'react'
import {SettingsContentWrapper} from '../atoms'
import {FixedHeader} from '../../../Components/FixedHeader'
import {RootContent} from '../../../UIComponents/GlobalStyles'

export const SettingsWireframe = ({goBack, title, content}) => {
    
    return (
        <RootContent
            height='100vh'
            paddingTop='62px'
        >
            <FixedHeader
                goBack={goBack}
                title={title}
            />
            <SettingsContentWrapper>
                {content}
            </SettingsContentWrapper>
        </RootContent>
    )
}