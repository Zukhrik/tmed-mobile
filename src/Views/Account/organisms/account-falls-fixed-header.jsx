import React, {useCallback} from 'react'
import {Col, Row} from 'antd'
import {IconBox} from '../../../UIComponents/GlobalStyles'
import {Title} from '../../../UIComponents/Typography/Title'
import {useTranslation} from 'react-i18next'
import {AccountFallsFixedHeaderWrapper} from '../atoms'
import {ArrowLeftSvg} from '../../../Icons/Arrow'
import {useHistory, useLocation, useParams} from 'react-router-dom'

export const AccountFallsFixedHeader = ({title, goBack, followers, followings}) => {
    const {push} = useHistory()
    const {t} = useTranslation()
    const {username} = useParams()
    const {pathname} = useLocation()
    
    const generateActiveLink = useCallback((evt) => {
        if (pathname === `/@${username}/${evt}`) {
            return 'active'
        } else if (pathname === `/@${username}/${evt}`) {
            return 'active'
        } else {
            return ''
        }
    }, [pathname, username])
    
    const handleLinkClick = (evt) => {
        if (evt === 'followers') {
            push(`/@${username}/followers`)
        } else if (evt === 'followings') {
            push(`/@${username}/followings`)
        }
    }
    
    return (
        <AccountFallsFixedHeaderWrapper>
            <Row>
                <Col span={24} className='padding-x'>
                    <Row wrap={false} gutter={[12, 0]}>
                        <Col onClick={goBack}>
                            <IconBox>
                                <ArrowLeftSvg/>
                            </IconBox>
                        </Col>
                        <Col flex={1}>
                            <Title level={4}>{title}</Title>
                        </Col>
                    </Row>
                </Col>
                <Col span={24}>
                    <Row wrap={false} justify='space-around'>
                        <Col
                            span={12}
                            className={`links ${generateActiveLink('followers')}`}
                            onClick={() => handleLinkClick('followers')}
                        >
                            {`${followers} ${t('followers')}`}
                        </Col>
                        <Col
                            span={12}
                            className={`links ${generateActiveLink('followings')}`}
                            onClick={() => handleLinkClick('followings')}
                        >
                            {`${followings} ${t('followings')}`}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </AccountFallsFixedHeaderWrapper>
    )
}
