import React, {useState} from 'react'
import {useParams} from 'react-router-dom'
import {useGoBack} from '../../../Hooks/app'
import {useOfferingOrderInOfferPage} from '../../../Hooks/order'
import {useOfferingDetail, useOfferingsCharacs, useOfferingSpecIdPush} from '../../../Hooks/offerings'
import {OfferingCharacteristics, OfferingInfo, OfferSpecialists} from '../organisms'
import {RootContent, SkeletonUI} from '../../../UIComponents/GlobalStyles'
import {FixedHeader} from '../../../Components/FixedHeader'
import {Col, Row} from 'antd'
import {OfferingCreateButton, ProductInfoContentWrapper} from '../atoms'
import {OfferingDescription} from '../organisms/offering-description'
import {useStore} from 'effector-react'
import {$offeringsModel} from '../../../Models/offerings-model'
import {PARAMS_CHARACTER_TYPE} from '../../../Constants'
import {ImageLazyLoad} from '../../../UIComponents/ImageLazyLoad'
import {SliderWrapper} from '../../../Components/Slider/style'
import {Button} from '../../../UIComponents/Button'
import {useTranslation} from 'react-i18next'
import {$appModel} from '../../../Models/app'
import {OverlaySettings} from '../../../Components/Overlay'
import {OverlayAuth} from '../../../UIComponents/OverlayAuth'

export const OfferingPage = () => {
    useOfferingsCharacs()
    useOfferingSpecIdPush()
    const {t} = useTranslation()
    const {$app: {token}} = useStore($appModel)
    const {$offeringsCharacs: {data}} = useStore($offeringsModel)
    const {organization, offering_id} = useParams()
    const [auth, setAuth] = useState(false)
    const {res, isLoading} = useOfferingDetail(offering_id)
    const {handleRequest, setOpenModal, openModal, buttonLoad} = useOfferingOrderInOfferPage()
    const params = data.filter(item => item.character.character_type !== PARAMS_CHARACTER_TYPE.COLOUR_FIELD)
    
    const {goBack} = useGoBack({
        pathname: `/${organization}/offerings`
    })
    
    const handleClose = () => {
        if (auth) {
            setAuth(false)
        }
        setOpenModal(false)
    }
    
    return (
        <RootContent paddingTop={50} height='100vh'>
            <OverlaySettings
                openSettings={openModal}
                onClose={handleClose}
                content={<OverlayAuth
                    action={handleRequest}
                    auth={auth}
                    setAuth={setAuth}
                    onClose={handleClose}
                />}
            />
            <FixedHeader
                title={res?.data?.organization?.name}
                goBack={goBack}
            />
            <Row gutter={[0, 12]}>
                <Col span={24}>
                    <SliderWrapper>
                        {
                            !isLoading
                                ? <ImageLazyLoad alt={res?.data?.image} src={`${res?.data?.image}`}/>
                                : <SkeletonUI variant='rect' height={300} width='100%'/>
                        }
                    </SliderWrapper>
                </Col>
                <Col span={24}>
                    <ProductInfoContentWrapper>
                        <Row gutter={[0, 12]}>
                            <Col span={24}>
                                <OfferingInfo
                                    loading={isLoading}
                                    name={res?.data?.name}
                                    cost={res?.data?.cost}
                                    qty={res?.data?.qty}
                                />
                            </Col>
                            <Col span={24}>
                                <OfferSpecialists
                                    res={res}
                                    isLoading={isLoading}
                                    buttonLoad={buttonLoad}
                                    openModal={openModal}
                                    handleRequest={handleRequest}
                                    setOpenModal={setOpenModal}
                                />
                            </Col>
                            <Col span={24}>
                                <OfferingDescription description={res?.data?.description} loading={isLoading}/>
                            </Col>
                            <Col span={24}>
                                <OfferingCharacteristics params={params}/>
                            </Col>
                        </Row>
                        <OfferingCreateButton>
                            <Button
                                loading={buttonLoad}
                                disabled={buttonLoad}
                                variant='primary'
                                className='add-to-cart-button'
                                onClick={() => token ? handleRequest() : setOpenModal(true)}
                            >
                                {t('checkout')}
                            </Button>
                        </OfferingCreateButton>
                    </ProductInfoContentWrapper>
                </Col>
            </Row>
        </RootContent>
    )
}