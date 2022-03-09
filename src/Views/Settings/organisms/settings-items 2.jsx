import React from 'react'
import {Col, Row} from 'antd'
import {settingsData} from '../../../data'
import {useTranslation} from 'react-i18next'
import {Text} from '../../../UIComponents/Typography/Text'
import {SettingLink} from '../atoms'

export const SettingsItems = () => {
    const {t} = useTranslation()
    
    return (
        <Row gutter={[0, 24]}>
            {
                settingsData.map((item, idx) => {
                    const Icon = item.icon
                    return (
                        <Col
                            span={24}
                            key={`${idx + 1}`}
                        >
                            <SettingLink
                                to={`/settings/${item.title}`}
                            >
                                <Icon/>
                                <Text>{t(item.title)}</Text>
                            </SettingLink>
                        </Col>
                    )
                })
            }
        </Row>
    )
}