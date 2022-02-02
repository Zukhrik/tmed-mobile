import React from 'react'
import {RootContent} from '../../../UIComponents/GlobalStyles'
import {FixedHeader} from '../../../Components/FixedHeader'
import {useTranslation} from 'react-i18next'
import {useGoBack} from '../../../Hooks/app'
import {useStore} from 'effector-react'
import {$accountModel} from '../../../Models/account-model'
import {Col, Row} from 'antd'

export const OrderRecordsPage = () => {
    const {$profiles: {currentProfile}} = useStore($accountModel)
    const {t} = useTranslation()
    const {goBack} = useGoBack(currentProfile && {pathname: `/@${currentProfile.slug_name}/tape`})
    
    return (
        <RootContent
            paddingTop='62px'
        >
            <FixedHeader
                title={t('order_records')}
                goBack={goBack}
            />
            <Row gutter={[0, 12]}>
                <Col span={24}>
                    order records
                </Col>
            </Row>
        </RootContent>
    )
}