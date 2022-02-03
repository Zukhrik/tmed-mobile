import React from 'react'
import {useUser} from '../../../Hooks/user'
import {useHistory, useParams} from 'react-router-dom'
import {useStore} from 'effector-react'
import {$userModel} from '../../../Models/user-model'
import {RootContent} from '../../../UIComponents/GlobalStyles'
import {FixedHeader} from '../../../Components/FixedHeader'
import {UserFixedHeaderComponent} from '../organisms/user-fixed-header-component'
import {Col, Row} from 'antd'
import {ShortCard, ShortCardSkeleton} from '../../../Components/Cards'
import Cookies from 'js-cookie'
import {getCurrentAccount} from '../../../Models/account-model'
import {tokenMount} from '../../../Models/app'
import {resetOrderCartList, resetOrgOrderCart} from '../../../Models/order-model'
import {Title} from '../../../UIComponents/Typography/Title'
import {useTranslation} from 'react-i18next'


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
        <RootContent height='100vh' paddingTop={62}>
            <FixedHeader
                component={<UserFixedHeaderComponent
                    logoClick={() => handleClick('logo')}
                    logoutClick={() => handleClick('logout')}
                />}
            />
            <Row className='container' gutter={[0, 12]}>
                {
                    forceLoading === 2 && userInfo
                        ? (
                            <Col span={24}>
                                <ShortCard
                                    imgSize={48}
                                    imgUrl={userInfo.avatar}
                                    name={`${userInfo.name} ${userInfo.lastname}`}
                                    text={userInfo.main_cat.name}
                                />
                            </Col>
                        )
                        : (
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