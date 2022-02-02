import React from 'react'
import {Col, Row} from 'antd'
import {SettingLink} from '../atoms'
import {accountData} from '../../../data'
import {useTranslation} from 'react-i18next'
import {Text} from '../../../UIComponents/Typography/Text'


export const AccountItems = () => {
    const {t} = useTranslation()
    
    return (
        <Row gutter={[0, 12]}>
            {
                accountData.map((item, idx) => {
                    const Icon = item.icon
                    
                    return (
                        <Col span={24} key={`${idx + 1}`}>
                            <SettingLink
                                to={`?${item.title}`}
                            >
                                <Icon/>
                                <Text>{`${t(item.title)}`}</Text>
                            </SettingLink>
                        </Col>
                    )
                })
            }
        </Row>
    )
}