import React from 'react'
import {useTranslation} from 'react-i18next'
import {useOrganization} from '../../../Hooks/org'
import {AccountWireframeContentWrapper, ContentWrapper, HeaderWrapper} from './style'
import {FixedHeaderPageWireframe} from '../FixedHeaderPageWireframe'

export const AccountWireframe = ({header, content}) => {
    const {t} = useTranslation()
    useOrganization()
    
    return (
        <AccountWireframeContentWrapper>
            <FixedHeaderPageWireframe
                goBack={{path: '/tape'}}
                title={t('subscribe')}
                content={
                    <div>
                        <HeaderWrapper>
                            {header}
                        </HeaderWrapper>
                        <ContentWrapper>
                            {content}
                        </ContentWrapper>
                    </div>
                }
            />
        </AccountWireframeContentWrapper>
    )
}