import React from 'react'
import {generateSkeleton} from '../../../utils/skeleton-utils'
import {useParams} from 'react-router-dom'
import {useStore} from 'effector-react'
import {$appModel} from '../../../Models/app'
import {useUrlGenerate} from '../../../Hooks/org'
import {$orderModel} from '../../../Models/order-model'
import {INFO_MAT} from '../../../Constants/app'
import {AccountScrollWrapper, SpecialistNavLink} from '../atoms'
import {URL_KEYS} from '../../../Constants'
import {ShortCard, ShortCardSkeleton} from '../../../Components/Cards'
import {Avatar} from '../../../UIComponents/Avatar'
import {Col, Row} from 'antd'
import {SkeletonUI} from '../../../UIComponents/GlobalStyles'

const skeleton = generateSkeleton(1)
export const ChooseSpecialist = () => {
    const {organization} = useParams()
    const {$device} = useStore($appModel)
    const {generateUrl, getActive} = useUrlGenerate()
    const {$orderCartList: {data, forceLoading}} = useStore($orderModel)
    const currentOrg = data.find(item => item.seller.slug_name === organization)
    const specList = currentOrg ? currentOrg.seller.specialists : []
    
    return (
        <>
            {
                forceLoading === 2
                    ? (
                        <>
                            {
                                $device && $device === INFO_MAT
                                    ? (
                                        <AccountScrollWrapper style={{display: 'flex'}}>
                                            {
                                                specList.map((item, idx) => (
                                                    <SpecialistNavLink
                                                        key={`${idx + 1}`}
                                                        to={generateUrl(URL_KEYS.SPECIALIST_ID, item.id)}
                                                        isActive={() => getActive(URL_KEYS.SPECIALIST_ID, item.id)}
                                                    >
                                                        <ShortCard
                                                            imgSize={80}
                                                            direction='vertical'
                                                            imgUrl={item.user.avatar}
                                                            name={item.user.full_name}
                                                            text={item.job.name}
                                                        />
                                                    </SpecialistNavLink>
                                                ))
                                            }
                                        </AccountScrollWrapper>
                                    )
                                    : (
                                        <AccountScrollWrapper style={{display: 'flex'}}>
                                            {
                                                specList.map((item, idx) => (
                                                    <SpecialistNavLink
                                                        key={`${idx + 1}`}
                                                        to={generateUrl(URL_KEYS.SPECIALIST_ID, item.id)}
                                                        isActive={() => getActive(URL_KEYS.SPECIALIST_ID, item.id)}
                                                    >
                                                        <Avatar
                                                            size={40}
                                                            imgUrl={item.user.avatar}
                                                        />
                                                    </SpecialistNavLink>
                                                ))
                                            }
                                        </AccountScrollWrapper>
                                    )
                            }
                        </>
                    )
                    : <Row gutter={[12, 0]} style={{padding: 3}}>
                        {
                            $device && $device === INFO_MAT
                                ? <>
                                    {
                                        skeleton.map((item, idx) => (
                                            <Col key={`${idx + 1}`}>
                                                <ShortCardSkeleton
                                                    direction='vertical'
                                                    textWidth={60}
                                                />
                                            </Col>
                                        ))
                                    }
                                </>
                                : <>
                                    {
                                        skeleton.map((item, idx) => (
                                            <Col key={`${idx + 1}`}>
                                                <SkeletonUI
                                                    width={40}
                                                    height={40}
                                                    variant='circle'
                                                />
                                            </Col>
                                        ))
                                    }
                                </>
                        }
                    </Row>
            }
        </>
    )
}