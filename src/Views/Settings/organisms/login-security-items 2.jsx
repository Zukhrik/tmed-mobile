import React from 'react'
import {Col, Row} from 'antd'
import {SettingLink} from '../atoms'
import {useTranslation} from 'react-i18next'
import {PasswordSvg} from '../../../Icons/Password'
import {LocationSvg} from '../../../Icons/Location'
import {ShieldDoneSvg} from '../../../Icons/Shield'

const loginSecurityData = [
    {
        title: 'change_password',
        icon: PasswordSvg
    },
    {
        title: 'login_activity',
        icon: LocationSvg
    },
    {
        title: 'two_factor_authentication',
        icon: ShieldDoneSvg
    }
]

export const LoginSecurityItems = () => {
    const {t} = useTranslation()
    
    return (
        <Row gutter={[0, 12]}>
            {
                loginSecurityData.map((item, idx) => {
                    const Icon = item.icon
                    
                    return (
                        <Col
                            span={24}
                            key={`${idx + 1}`}
                        >
                            <SettingLink
                                to={`?${item.title}`}
                            >
                                <Icon/>
                                {t(item.title)}
                            </SettingLink>
                        </Col>
                    )
                })
            }
        </Row>
    )
}