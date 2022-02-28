import React from 'react'
import {Col, Row} from 'antd'
import {SkeletonUI} from '../../../UIComponents/GlobalStyles'
import {Text} from '../../../UIComponents/Typography/Text'
import {useTranslation} from 'react-i18next'

export const AccountRecordOfferIdSkeleton = () => {
    const {t} = useTranslation()
    
    return (
        <Row gutter={[0, 12]} className='container'>
            <Col span={24}>
                <Row wrap={false} gutter={[8, 0]} align='middle'>
                    <Col>
                        <SkeletonUI variant='rect' width={48} height={48}/>
                    </Col>
                    <Col flex={1}>
                        <SkeletonUI variant='text' width='100%'/>
                    </Col>
                </Row>
            </Col>
            <Col
                span={24}
                style={{display: 'flex', flexDirection: 'column', borderBottom: '1px solid #f2f2f2'}}
            >
                <Text color='var(--grey-dwed)' level={4}>{`${t('conclusion')}:`}</Text>
                <SkeletonUI varinat='text' width='100%'/>
                <SkeletonUI varinat='text' width='100%'/>
                <SkeletonUI varinat='text' width='100%'/>
                <SkeletonUI varinat='text' width='100%'/>
                <SkeletonUI varinat='text' width='100%'/>
            </Col>
            <Col span={24}>
                <Row wrap={false} justify='space-between'>
                    <Col>
                        <Text color='var(--grey-dwed)' level={4}>{`${t('specialist')}: `}</Text>
                    </Col>
                    <Col>
                        <SkeletonUI variant='text' width={200}/>
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row wrap={false} justify='space-between'>
                    <Col>
                        <Text color='var(--grey-dwed)' level={4}>{`${t('cost')}: `}</Text>
                    </Col>
                    <Col>
                        <SkeletonUI variant='text' width={200}/>
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row wrap={false} justify='space-between'>
                    <Col>
                        <Text color='var(--grey-dwed)' level={4}>{`${t('date')}: `}</Text>
                    </Col>
                    <Col>
                        <SkeletonUI variant='text' width={200}/>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}