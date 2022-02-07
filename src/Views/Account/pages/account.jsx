import React from 'react'
import {useUser} from '../../../Hooks/user'
import {useHistory, useParams} from 'react-router-dom'
import {useStore} from 'effector-react'
import {$userModel} from '../../../Models/user-model'
import {RootContent} from '../../../UIComponents/GlobalStyles'
import {FixedHeader} from '../../../Components/FixedHeader'
import {UserFixedHeaderComponent} from '../organisms/user-fixed-header-component'
import {Col, Row} from 'antd'
import Cookies from 'js-cookie'
import {getCurrentAccount} from '../../../Models/account-model'
import {tokenMount} from '../../../Models/app'
import {resetOrderCartList, resetOrgOrderCart} from '../../../Models/order-model'
import {AccountHeader, AccountInfoSkeleton} from '../molecules'
import {Text} from '../../../UIComponents/Typography/Text'
import {ArrowRightSvg} from '../../../Icons/Arrow'
import {useTranslation} from 'react-i18next'
import {AccountBlockItems} from '../atoms'


export const Account = () => {
    useUser()
    const {t} = useTranslation()
    const {push} = useHistory()
    const {username} = useParams()
    const {$user: {data, forceLoading}} = useStore($userModel)
    const userInfo = data && data?.[username]
    
    const handleClick = (evt) => {
        if (evt === 'logo') {
            push('/')
        } else if (evt === 'logout') {
            Cookies.remove('token')
            Cookies.remove('users')
            Cookies.remove('refresh-token')
            getCurrentAccount()
            localStorage.removeItem('currentProfile')
            tokenMount(null)
            push('/')
            resetOrgOrderCart()
            resetOrderCartList()
        }
    }
    
    return (
        <RootContent height='100vh' paddingTop={50}>
            <FixedHeader
                component={<UserFixedHeaderComponent
                    logoClick={() => handleClick('logo')}
                    logoutClick={() => handleClick('logout')}
                />}
            />
            <Row gutter={[0, 16]}>
                {
                    forceLoading === 2 && userInfo
                        ? (
                            <Col span={24}>
                                <AccountHeader
                                    imgUrl={userInfo.avatar}
                                    name={`${userInfo.name} ${userInfo.lastname}`}
                                    category={userInfo.main_cat.name}
                                />
                            </Col>
                        )
                        : (
                            <Col span={24}>
                                <AccountInfoSkeleton/>
                            </Col>
                        )
                }
                <Col span={24} onClick={() => push(`/@${username}/about_me`)}>
                    <AccountBlockItems>
                        <Row wrap={false} justify='space-between' align='middle'>
                            <Col>
                                <Text level={4}>{t('about_me')}</Text>
                                <Text level={5} className='item-description'>
                                    {t(('passport_number_birth_living_place'))}
                                </Text>
                            </Col>
                            <Col className='icon'>
                                <ArrowRightSvg/>
                            </Col>
                        </Row>
                    </AccountBlockItems>
                </Col>
                <Col span={24} onClick={() => push(`/@${username}/records`)}>
                    <AccountBlockItems>
                        <Row wrap={false} justify='space-between' align='middle'>
                            <Col>
                                <Text level={4}>{t('records')}</Text>
                                <Text level={5} className='item-description'>records count</Text>
                            </Col>
                            <Col className='icon'>
                                <ArrowRightSvg/>
                            </Col>
                        </Row>
                    </AccountBlockItems>
                </Col>
            </Row>
        </RootContent>
    )
}