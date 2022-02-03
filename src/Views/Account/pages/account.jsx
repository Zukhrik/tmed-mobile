import React from 'react'
import {useHistory, useParams} from 'react-router-dom'
import {useStore} from 'effector-react'
import {$userModel} from '../../../Models/user-model'
import {useUser} from '../../../Hooks/user'
import {RootContent} from '../../../UIComponents/GlobalStyles'
import {FixedHeader} from '../../../Components/FixedHeader'
import {AccountFixedHeader} from '../organisms'
import {Col, Row} from 'antd'
import {ShortCard, ShortCardSkeleton} from '../../../Components/Cards'
import {Title} from '../../../UIComponents/Typography/Title'
import {useTranslation} from 'react-i18next'
import Cookies from 'js-cookie'
import {getCurrentAccount} from '../../../Models/account-model'
import {tokenMount} from '../../../Models/app'
import {resetOrderCartList, resetOrgOrderCart} from '../../../Models/order-model'


export const Account = () => {
    useUser()
    const {push} = useHistory()
    const {t} = useTranslation()
    const {username} = useParams()
    const {$user: {data, forceLoading}} = useStore($userModel)
    const userInfo = data && data?.[username]
    
    const handleClick = (text) => {
        if (text === 'logout') {
            Cookies.remove('token')
            Cookies.remove('users')
            Cookies.remove('refresh-token')
            getCurrentAccount()
            localStorage.removeItem('currentProfile')
            tokenMount(null)
            push('/')
            resetOrgOrderCart()
            resetOrderCartList()
        } else if (text === 'logoClick') {
            push('/')
        }
    }
    
    return (
        <RootContent
            paddingTop={62}
            paddingBottom={60}
        >
            <FixedHeader
                component={
                    <AccountFixedHeader
                        logoClick={() => handleClick('logoClick')}
                        logOutClick={() => handleClick('logout')}
                    />
                }
            />
            <Row gutter={[0, 12]} className='container'>
                {
                    forceLoading === 2 && data
                        ? (
                            <Col span={24}>
                                <ShortCard
                                    imgSize={48}
                                    imgUrl={userInfo && Object.values(userInfo) && userInfo?.avatar}
                                    name={
                                        userInfo && Object.values(userInfo) && !userInfo?.name
                                            ? userInfo?.username
                                            : `${userInfo?.name} ${userInfo?.lastname}`
                                    }
                                    text={userInfo && Object.values(userInfo) && userInfo?.main_cat?.name}
                                />
                            </Col>
                        ) : (
                            <Col span={24}>
                                <ShortCardSkeleton size={48}/>
                            </Col>
                        )
                }
                <Col span={24}>
                    <Title>{t('records')}</Title>
                </Col>
            </Row>
        </RootContent>
    )
}