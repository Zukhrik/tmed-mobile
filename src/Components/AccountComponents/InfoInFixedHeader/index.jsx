import React from 'react'
import {Col, Row} from 'antd'
import {useTranslation} from 'react-i18next'
import {useParams} from 'react-router-dom'
import {ArrowLeftSvg} from '../../../Icons/Arrow'
import {OfferingSvg} from '../../../Icons/Offering'
import {IconBox} from '../../../UIComponents/GlobalStyles'
import {Text} from '../../../UIComponents/Typography/Text'
import {Title} from '../../../UIComponents/Typography/Title'
import {CartCountIndicator, InfoInFixedHeaderWrapper} from '../style'

export const InfoInFixedHeader = ({subscription, goBack, title, cartCount, handleCartClick}) => {
    const {t} = useTranslation()
    const {organization} = useParams()
    
    return (
        <InfoInFixedHeaderWrapper>
            <Row align='middle' justify='space-between' wrap={false}>
                <Col>
                    <IconBox
                        onClick={goBack}
                        style={{color: 'var(--dark-dwed)', marginRight: 12}}
                    >
                        <ArrowLeftSvg/>
                    </IconBox>
                </Col>
                {
                    title && (
                        <Col flex={1} className='title-wrapper'>
                            <Title>
                                {title}
                            </Title>
                        </Col>
                    )
                }
                {
                    subscription && subscription.text && (
                        <Col>
                            <Text
                                level={5}
                                onClick={() => subscription.toggle()}
                                color={subscription.text === t('subscribe') ? 'var(--primary-dwed)' : ''}
                            >
                                {t(subscription.text)}
                            </Text>
                        </Col>
                    )
                }
                {
                    organization && cartCount > 0 && (
                        <Col className='shopping-bag-wrapper' onClick={handleCartClick}>
                            <IconBox>
                                <OfferingSvg/>
                                {
                                    cartCount > 0 && (
                                        <CartCountIndicator>
                                            {cartCount}
                                        </CartCountIndicator>
                                    )
                                }
                            </IconBox>
                        </Col>
                    )
                }
            </Row>
        </InfoInFixedHeaderWrapper>
    )
}