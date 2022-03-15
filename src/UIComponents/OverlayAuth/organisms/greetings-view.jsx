import React from 'react'
import {Col, Row} from 'antd'
import {IconBox} from '../../GlobalStyles'
import {Button} from '../../Button'
import {useTranslation} from 'react-i18next'
import {useHistory} from 'react-router-dom'
import {LogoSvg} from '../../../Icons/Logo'

export const GreetingsView = ({setAuth}) => {
    const {t} = useTranslation()
    const {push} = useHistory()
    
    return (
        <Row gutter={[0, 12]}>
            <Col span={24}>
                <IconBox color='var(--primary-dwed)'>
                    <LogoSvg/>
                </IconBox>
            </Col>
            <Col
                span={24}
                onClick={() => setAuth(true)}
            >
                <Button variant='primary'>
                    {t('enter')}
                </Button>
            </Col>
            <Col
                span={24}
                className='sign-up-btn-wrapper'
                onClick={() => push('/sign-up')}
            >
                <Button>
                    {t('sign_up')}
                </Button>
            </Col>
        </Row>
    )
}