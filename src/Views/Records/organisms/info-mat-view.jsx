import React, {useRef, useState} from 'react'
import moment from 'moment'
import {Col, Image, Row} from 'antd'
import {useStore} from 'effector-react'
import {useParams} from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import {useReactToPrint} from 'react-to-print'
import {DetailImageWrapper, RecordDetailWrapper} from '../atoms'
import {$accountModel} from '../../../Models/account-model'
import {$orderModel} from '../../../Models/order-model'
import {Modal} from '../../../UIComponents/Modal'
import {IconBox, SkeletonUI} from '../../../UIComponents/GlobalStyles'
import {CloseSvg} from '../../../Icons/Close'
import {Text} from '../../../UIComponents/Typography/Text'
import {Title} from '../../../UIComponents/Typography/Title'
import {Button} from '../../../UIComponents/Button'
import {OnCloseModal} from './on-close-modal'
import {generateQrCodeBase64} from '../../../utils/qr_code'
import qrBlur from '../../../Assets/Images/qr-blur.png'

export const InfoMatView = () => {
    const {t} = useTranslation()
    const {order_id} = useParams()
    const [openModal, setModalOpen] = useState(false)
    const {$profiles: {currentProfile}} = useStore($accountModel)
    const {$orderDetail: {data, forceLoading, loading}} = useStore($orderModel)
    const {$orderIdOffers: {data: orderIdOffersData}} = useStore($orderModel)
    
    
    const ref = useRef(null)
    const handlePrint = useReactToPrint({
        content: () => ref.current
    })
    
    return (
        <>
            <Modal
                centered
                modalIsOpen={openModal}
                component={<OnCloseModal data={data?.[order_id]}/>}
                onCancel={() => setModalOpen(false)}
                width={940}
            />
            <RecordDetailWrapper>
                <IconBox
                    onClick={() => setModalOpen(true)}
                >
                    <CloseSvg/>
                </IconBox>
                <DetailImageWrapper ref={ref}>
                    <Row
                        gutter={[12, 4]}
                        className='check-form-wrapper'
                    >
                        <Col className='qr-code-wrapper'>
                            {
                                forceLoading === 2 && data?.[order_id]
                                    ? <>
                                        <Image
                                            width={210}
                                            height={210}
                                            preview={data?.[order_id]?.status !== 0 ? {mask: ''} : false}
                                            src={
                                                data?.[order_id]?.status !== 0
                                                    ? generateQrCodeBase64(data?.[order_id]?.qr_code)
                                                    : qrBlur
                                            }
                                        />
                                    </>
                                    : <SkeletonUI animation='wave' variant='rect' width={210} height={210}/>
                            }
                        </Col>
                        <Col className='display-style'>
                            <Text
                                className='static-width'
                            >
                                {`${t('Sana')}: `}
                            </Text>
                            {
                                data && order_id && data[order_id] && (
                                    <Title>
                                        {moment(data?.[order_id]?.date).format('DD-MM-YYYY HH:mm')}
                                    </Title>
                                )
                            }
                        </Col>
                        <Col className='display-style'>
                            <Text
                                className='static-width'
                            >
                                {`${t('Kvitansiya raqami')}: `}
                            </Text>
                            <Title alignType='right'>
                                {data?.[order_id]?.id}
                            </Title>
                        </Col>
                        <Col className='display-style'>
                            <Text
                                className='static-width'
                            >
                                {`${t('Tashkilot')}: `}
                            </Text>
                            <Title alignType='right'>
                                {data?.[order_id]?.responsible?.org?.name}
                            </Title>
                        </Col>
                        <Col className='display-style'>
                            <Text
                                className='static-width'
                            >
                                {`${t('Mutaxassis')}: `}
                            </Text>
                            <Title alignType='right'>
                                {data?.[order_id]?.responsible?.user?.full_name}
                            </Title>
                        </Col>
                        <Col className='display-style'>
                            <Text
                                className='static-width'
                            >
                                {`${t('Bo\'lim')}: `}
                            </Text>
                            <Title alignType='right'>
                                {data?.[order_id]?.responsible?.spec_cat?.name}
                            </Title>
                        </Col>
                        
                        <Col className='display-style'>
                            <Text
                                className='static-width'
                            >
                                {`${t('Foydalanuvchi')}: `}
                            </Text>
                            <Title alignType='right'>
                                {
                                    data?.[order_id] && currentProfile?.name === `${null} `
                                        ? currentProfile?.slug_name
                                        : currentProfile?.name
                                }
                            </Title>
                        </Col>
                        
                        <Col className='display-style'>
                            <Text
                                className='static-width'
                            >
                                {`${t('Uchrashuv vaqti')}: `}
                            </Text>
                            <Title>
                                {data?.[order_id] && moment(data?.[order_id]?.meet_date).format('DD-MM-YYYY HH:mm')}
                            </Title>
                        </Col>
                        <Col className='display-style'>
                            <Text
                                className='static-width'
                            >
                                {`${t('Umumiy narx')}: `}
                            </Text>
                            <Title>
                                {data?.[order_id] && `${data?.[order_id]?.total_cost?.toLocaleString('fi-Fi')}
                                                ${currentProfile?.currency?.code?.toUpperCase()}`}
                            </Title>
                        </Col>
                        <Col className='display-style'>
                            <Text
                                className='static-width'
                            >
                                {`${t('To\'lov turi')}: `}
                            </Text>
                            {data?.[order_id] && <Title>Naqd</Title>}
                        </Col>
                        <Col className='display-style'>
                            <Text
                                className='static-width'
                            >
                                {`${t('Takliflar')}: `}
                            </Text>
                        </Col>
                        {orderIdOffersData && orderIdOffersData.map((item, idx) => (
                            <Col
                                span={24}
                                key={`${idx + 1}`}
                                className='display-style'
                            >
                                <Title>
                                    {`${item.offering.name} ${item.qty}x${item.cost.toLocaleString('fi-Fi')}
                                    ${currentProfile?.currency?.code?.toUpperCase()}`}
                                </Title>
                            </Col>
                        ))}
                        <Col style={{display: 'flex', justifyContent: 'center'}}>
                            {data?.[order_id] && <Text>Haridingiz Uchun Rahmat!</Text>}
                        </Col>
                        <Col span={24}>
                            <br/>
                            <div style={{border: '1px dashed var(--dark-dwed)'}}/>
                        </Col>
                    </Row>
                </DetailImageWrapper>
                {
                    !loading && data[order_id] && data[order_id].status !== 0 && (
                        <Button
                            size='l'
                            variant='primary'
                            onClick={handlePrint}
                        >
                            {t('print_qr_code')}
                        </Button>
                    )
                }
            </RecordDetailWrapper>
        </>
    )
}