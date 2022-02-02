import React from 'react'
import {Col, Row} from 'antd'
import {Description} from '../atoms'
import {useStore} from 'effector-react'
import {useTranslation} from 'react-i18next'
import {Text} from '../../../UIComponents/Typography/Text'
import {SkeletonUI} from '../../../UIComponents/GlobalStyles'
import {$offeringsModel} from '../../../Models/offerings-model'

export const OfferingDescription = () => {
    const {t} = useTranslation()
    const {$offeringInfo: {data, forceLoading}} = useStore($offeringsModel)
    
    return (
        <Row className='padding'>
            <Col span={24} className='container'>
                <Text level={5} color='var(--grey-dwed)'>{`${t('description')}:`}</Text>
            </Col>
            <Col span={24} className='container'>
                {
                    forceLoading === 2
                        ? (
                            <Description>
                                <Text>{data?.description}</Text>
                            </Description>
                        )
                        : <>
                            <SkeletonUI variant='text' width='100%' height={12}/>
                            <SkeletonUI variant='text' width='100%' height={12}/>
                            <SkeletonUI variant='text' width='100%' height={12}/>
                            <SkeletonUI variant='text' width='100%' height={12}/>
                            <SkeletonUI variant='text' width='100%' height={12}/>
                        </>
                }
            </Col>
        </Row>
    )
}