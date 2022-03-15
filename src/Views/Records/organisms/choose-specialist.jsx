import React from 'react'
import {generateSkeleton} from '../../../utils/skeleton-utils'
import {useParams} from 'react-router-dom'
import {useStore} from 'effector-react'
import {useUrlGenerate} from '../../../Hooks/org'
import {$orderModel} from '../../../Models/order-model'
import {AccountScrollWrapper, SpecialistNavLink} from '../atoms'
import {URL_KEYS} from '../../../Constants'
import {ShortCard} from '../../../Components/Cards'
import {Col, Row} from 'antd'
import {SkeletonUI} from '../../../UIComponents/GlobalStyles'

const skeleton = generateSkeleton(1)
export const ChooseSpecialist = () => {
    const {organization} = useParams()
    const {generateUrl, getActive} = useUrlGenerate()
    const {$orderCartList: {data, forceLoading}} = useStore($orderModel)
    const currentOrg = data.find(item => item.seller.slug_name === organization)
    const specList = currentOrg ? currentOrg.seller.specialists : []
    
    console.log()
    
    return (
        <>
            {
                forceLoading === 2
                    ? (
                        <AccountScrollWrapper display='flex'>
                            {
                                specList.map((item, idx) => (
                                    <SpecialistNavLink
                                        key={`${idx + 1}`}
                                        to={generateUrl(URL_KEYS.SPECIALIST_ID, item.id)}
                                        isActive={() => getActive(URL_KEYS.SPECIALIST_ID, item.id)}
                                    >
                                        <ShortCard
                                            direction='vertical'
                                            imgUrl={item.user.avatar}
                                            name={item.user.full_name}
                                            text={item.job.name}
                                        />
                                    </SpecialistNavLink>
                                ))
                            }
                        </AccountScrollWrapper>
                    ) : (
                        <Row gutter={[12, 0]} style={{padding: 3}}>
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
                        </Row>
                    )
            }
        </>
    )
}