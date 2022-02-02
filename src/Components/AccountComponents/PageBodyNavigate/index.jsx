import React from 'react'
import {Col, Row} from 'antd'
import {TapeSvg} from '../../../Icons/Tape'
import {useTranslation} from 'react-i18next'
import {OfferingSvg} from '../../../Icons/Offering'
import {useHistory, useParams} from 'react-router-dom'
import {Button} from '../../../UIComponents/Button'
import {useStore} from 'effector-react'
import {$appModel} from '../../../Models/app'
import {INFO_MAT} from '../../../Constants/app'
import {IconBox} from '../../../UIComponents/GlobalStyles'
import {UserBodyLinkWrapper} from '../style'
import {StarSvg} from '../../../Icons/Start'

export const PageBodyNavigate = () => {
    const {username, organization} = useParams()
    const {location: {pathname}} = useHistory()
    const {$device} = useStore($appModel)
    const {t} = useTranslation()
    
    return (
        <Row align='middle'>
            <Col span={12}>
                <UserBodyLinkWrapper
                    className={!organization && 'title'}
                    border_bottom={organization && '1px solid var(--primary-dwed)'}
                    to={username ? `/@${username}/tape` : `/${organization}/tape`}
                    isActive={() => pathname === `/@${username}/tape` || pathname === `/${organization}/tape`}
                >
                    <Button fontSize={$device && $device === INFO_MAT ? '20px' : ''}>
                        <IconBox color='var(--grey-dwed)'>
                            <TapeSvg/>
                        </IconBox>
                        {t('tape')}
                    </Button>
                </UserBodyLinkWrapper>
            </Col>
            {
                !username
                    ? <Col span={12}>
                        <UserBodyLinkWrapper
                            border_bottom='1px solid var(--primary-dwed)'
                            to={`/${organization}/offerings`}
                            isActive={() => pathname === `/${organization}/offerings`}
                        >
                            <Button fontSize={$device && $device === INFO_MAT ? '20px' : ''}>
                                <IconBox color='var(--grey-dwed)'>
                                    <OfferingSvg/>
                                </IconBox>
                                {t('offerings')}
                            </Button>
                        </UserBodyLinkWrapper>
                    </Col>
                    : <Col span={12}>
                        <UserBodyLinkWrapper
                            border_bottom='1px solid var(--primary-dwed)'
                            to={`/@${username}/overview`}
                            isActive={() => pathname === `/@${username}/overview`}
                        >
                            <Button fontSize={$device && $device === INFO_MAT ? '20px' : ''}>
                                <IconBox color='var(--grey-dwed)'>
                                    <StarSvg/>
                                </IconBox>
                                {t('overview')}
                            </Button>
                        </UserBodyLinkWrapper>
                    </Col>
            }
        </Row>
    )
}