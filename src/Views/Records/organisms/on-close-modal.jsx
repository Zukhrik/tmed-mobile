import React from 'react'
import {Col, Row} from 'antd'
import Cookies from 'js-cookie'
import {useStore} from 'effector-react'
import {useHistory} from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import {ModalActionsWrapper, OnCloseModalWrapper} from '../atoms'
import {$appModel, tokenMount} from '../../../Models/app'
import {Title} from '../../../UIComponents/Typography/Title'
import {getCurrentAccount} from '../../../Models/account-model'

export const OnCloseModal = ({data}) => {
    const {t} = useTranslation()
    const {push} = useHistory()
    const {$app: {saveURL}} = useStore($appModel)
    
    const handleOrderMore = () => {
        push(saveURL ? saveURL : '/search')
    }
    
    const handleLogOut = () => {
        Cookies.remove('token')
        Cookies.remove('users')
        Cookies.remove('refresh-token')
        localStorage.removeItem('currentProfile')
        getCurrentAccount()
        tokenMount(null)
        push(`/${data && data.responsible.org.slug_name}/offerings`)
    }
    
    return (
        <OnCloseModalWrapper>
            <ModalActionsWrapper>
                <Row gutter={[0, 28]}>
                    <Col span={24} className='justify'>
                        <Title
                            onClick={() => handleOrderMore()}
                            color='var(--primary-dwed)'
                            className='order-more'
                        >
                            {t('order_more')}
                        </Title>
                    </Col>
                    <Col span={24} className='justify'>
                        <Title
                            onClick={() => handleLogOut()}
                            color='var(--danger-dwed)'
                            className='log-out'
                        >
                            {t('log_out')}
                        </Title>
                    </Col>
                </Row>
            </ModalActionsWrapper>
        </OnCloseModalWrapper>
    )
}