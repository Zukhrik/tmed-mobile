import React from 'react'
import {Col, Row} from 'antd'
import {FixedHeader} from '../../../Components/FixedHeader'
import {ShortCardSkeleton} from '../../../Components/Cards'
import {useTranslation} from 'react-i18next'
import {StreamPageWireframeWrapper} from '../atoms'
import {SkeletonUI} from '../../../UIComponents/GlobalStyles'
import {Text} from '../../../UIComponents/Typography/Text'

export const StreamPageSkeleton = () => {
    const {t} = useTranslation()
    
    return (
        <StreamPageWireframeWrapper>
            <FixedHeader/>
            <Row
                gutter={[0, 12]}
                className='stream-info-wrapper'
            >
                <Col span={24}>
                    <SkeletonUI variant='rect' height={210} width='100%'/>
                </Col>
                <Col span={24} className='padding'>
                    <ShortCardSkeleton
                        size={48}
                    />
                </Col>
                
                <Col span={24} className='description padding'>
                    <Text className='description-title'>{t('description')}</Text>
                    <SkeletonUI variant='text' width='100%' height={12}/>
                    <SkeletonUI variant='text' width='100%' height={12}/>
                </Col>
            </Row>
        </StreamPageWireframeWrapper>
    )
}