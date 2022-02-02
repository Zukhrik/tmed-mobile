import React from 'react'
import {Col, Radio, Row} from 'antd'
import {useStore} from 'effector-react'
import {useTranslation} from 'react-i18next'
import {accountSettings} from '../../../data'
import {AccountSettingsWrapper} from '../atoms'
import {PlusFillSvg} from '../../../Icons/Plus'
import {ShortCard} from '../../../Components/Cards'
import {useHistory, useParams} from 'react-router-dom'
import {IconBox} from '../../../UIComponents/GlobalStyles'
import {$accountModel} from '../../../Models/account-model'
import {useAccountActions} from '../../../Hooks/account'

export const AccountSettings = ({profiles, setProfiles}) => {
    const {push} = useHistory()
    const {t} = useTranslation()
    const {username} = useParams()
    const {$profiles: {linkedUsers}} = useStore($accountModel)
    const {$profiles: {currentProfile}} = useStore($accountModel)
    const {handleClickItem, handleClickLinkedUsers} = useAccountActions(setProfiles)
    
    return (
        <AccountSettingsWrapper>
            {
                profiles && linkedUsers && linkedUsers.length > 0
                    ? <Row gutter={[0, 12]}>
                        <Col span={24} className='linked-users-title'>
                            {t('profiles')}
                        </Col>
                        {
                            linkedUsers.map((item, idx) => (
                                <Col span={24} key={`${idx + 1}`}>
                                    <Row
                                        align='middle'
                                        gutter={[4, 0]}
                                        justify='space-between'
                                        onClick={() => handleClickLinkedUsers(item)}
                                    >
                                        <Col>
                                            <ShortCard
                                                imgSize={36}
                                                nameSize={5}
                                                name={item.name}
                                                imgUrl={item.avatar}
                                                text={item.category?.name}
                                            />
                                        </Col>
                                        <Col>
                                            <Radio checked={item.slug_name === username}/>
                                        </Col>
                                    </Row>
                                </Col>
                            ))
                        }
                        <Col
                            span={24}
                            className='add-account-wrapper'
                            onClick={() => push('/sign-in')}
                        >
                            <PlusFillSvg/>
                            {t('add_account')}
                        </Col>
                    </Row>
                    : <>
                        {
                            currentProfile && currentProfile?.slug_name === username && (
                                <Row gutter={[0, 12]}>
                                    {
                                        accountSettings.map((item, idx) => {
                                            const Icon = item.icon
                                            return (
                                                <Col
                                                    span={24}
                                                    key={`${idx + 1}`}
                                                    onClick={() => handleClickItem(item)}
                                                >
                                                    <Row align='middle' gutter={[12, 0]}>
                                                        <Col>
                                                            <IconBox
                                                                color={item.name === 'logout' ? 'var(--danger-dwed)' : ''}
                                                            >
                                                                <Icon/>
                                                            </IconBox>
                                                        </Col>
                                                        <Col>
                                                            <IconBox
                                                                color={item.name === 'logout' ? 'var(--danger-dwed)' : ''}
                                                            >
                                                                {`${t(item.name)}`}
                                                            </IconBox>
                                                        </Col>
                                                        {
                                                            item.name === 'logout' && (
                                                                <Col className='logout'>
                                                                    {`[ ${currentProfile?.name !== `${null} ` ? currentProfile.name : currentProfile.slug_name} ]`}
                                                                </Col>
                                                            )
                                                        }
                                                    </Row>
                                                </Col>
                                            )
                                        })
                                    }
                                </Row>
                            )
                        }
                    </>
            }
        </AccountSettingsWrapper>
    )
}