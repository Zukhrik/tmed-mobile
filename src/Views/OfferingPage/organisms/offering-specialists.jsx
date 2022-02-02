import React, {useState} from 'react'
import {Col, Row} from 'antd'
import {useStore} from 'effector-react'
import {DescriptionWrapper} from '../atoms'
import {URL_KEYS} from '../../../Constants'
import {useTranslation} from 'react-i18next'
import {$appModel} from '../../../Models/app'
import {INFO_MAT} from '../../../Constants/app'
import {useUrlGenerate} from '../../../Hooks/org'
import {Button} from '../../../UIComponents/Button'
import {Text} from '../../../UIComponents/Typography/Text'
import {$offeringsModel} from '../../../Models/offerings-model'
import {useOfferingOrderInOfferPage} from '../../../Hooks/order'
import {ShortCard, ShortCardSkeleton} from '../../../Components/Cards'
import {DataWrapper, SpecialistNavLink} from '../../../Components/Offering/OrgOfferings/style'
import {OverlaySettings} from '../../../Components/Overlay'
import {OverlayAuth} from '../../../UIComponents/OverlayAuth'


export const OfferSpecialists = () => {
    const {t} = useTranslation()
    const {$device} = useStore($appModel)
    const {$app: {token}} = useStore($appModel)
    const {getActive, generateUrl} = useUrlGenerate()
    const [auth, setAuth] = useState(false)
    const {$offeringInfo: {data, forceLoading}} = useStore($offeringsModel)
    const {handleRequest, setOpenModal, openModal} = useOfferingOrderInOfferPage()
    
    const handleClose = () => {
        if (auth) {
            setAuth(false)
        }
        setOpenModal(false)
    }
    
    return (
        <>
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
            <Row className='padding'>
                <Col span={24}>
                    <DescriptionWrapper>
                        <Text>{`${t('select_specialist')}:`}</Text>
                    </DescriptionWrapper>
                </Col>
                <Col span={24}>
                    <DataWrapper>
                        {
                            forceLoading === 2
                                ? data && data.responsible.map((item, idx) => (
                                <SpecialistNavLink
                                    key={`${idx + 1}`}
                                    to={generateUrl(URL_KEYS.SPECIALIST_ID, item.id)}
                                    isActive={() => getActive(URL_KEYS.SPECIALIST_ID, item.id)}
                                >
                                    <ShortCard
                                        imgSize={56}
                                        direction='vertical'
                                        text={item.job.name}
                                        imgUrl={item.user.avatar}
                                        name={item.user.full_name}
                                        containerPath={`/@${item.user.username}`}
                                        active={getActive(URL_KEYS.SPECIALIST_ID, item.id)}
                                    />
                                </SpecialistNavLink>
                            ))
                                : <ShortCardSkeleton
                                    size={56}
                                    nameWidth={60}
                                    nameHeight={24}
                                    textHeight={16}
                                    textWidth={40}
                                    nameSize={12}
                                    textSize={12}
                                    height={96}
                                    direction='vertical'
                                />
                        }
                    </DataWrapper>
                </Col>
            </Row>
            {
                $device && $device !== INFO_MAT && (
                    <Button
                        variant='primary'
                        className='add-to-cart-button'
                        onClick={() => token ? handleRequest() : setOpenModal(true)}
                    >
                        {t('checkout')}
                    </Button>
                )
            }
        </>
    )
}