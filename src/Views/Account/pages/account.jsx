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


export const Account = () => {
    useUser()
    const {push} = useHistory()
    const {username} = useParams()
    const {$user: {data, forceLoading}} = useStore($userModel)
    const userInfo = data && data?.[username]
    
    return (
        <RootContent height='100vh' paddingTop={62}>
            <FixedHeader
                component={<UserFixedHeaderComponent
                    logoClick={() => push('/')}
                    cartClick={() => push('/records/unregistered')}
                />}
            />
            <Row className='container'>
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
            </Row>
        </RootContent>
    )
}