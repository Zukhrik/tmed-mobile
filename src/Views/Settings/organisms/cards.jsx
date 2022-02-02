import React, {useState} from 'react'
import {Col, Row} from 'antd'
import {useStore} from 'effector-react'
import {ChangeCard} from './change-card'
import payment from '../../../Service/payment'
import {cardImages} from '../../../data/card-bg-images'
import {OverlaySettings} from '../../../Components/Overlay'
import {$paymentModel} from '../../../Models/payment-model'
import {CreditCardItem} from '../../../Components/Cards/CreditCard'


export const Cards = ({cardId, setCardId, setCreateCard}) => {
    const [openOverlay, setOpenOverlay] = useState(false)
    const {$accountCard: {data}} = useStore($paymentModel)
    const [cardName, setCardName] = useState('')
    
    
    const handleClickOnCard = (item) => {
        setOpenOverlay(true)
        setCardName(item.name)
        setCardId(item.id)
    }
    
    const handleActivate = (item) => {
        payment.resendPayMeCode({id: item.id})
            .then(res => {
                if (res) {
                    setCreateCard(true)
                    setCardId(null)
                }
            })
            .finally(() => {
                setCardId(item.id)
            })
    }
    
    return (
        <>
            <OverlaySettings
                onClose={() => setOpenOverlay(false)}
                openSettings={openOverlay}
                content={<ChangeCard
                    cardId={cardId}
                    setCardId={setCardId}
                    cardName={cardName}
                    setCardName={setCardName}
                    setOpenOverlay={setOpenOverlay}
                />}
            />
            <Row gutter={[12, 12]}>
                {
                    data?.map((item, idx) => (
                        <Col
                            span={24}
                            key={`${idx + 1}`}
                        >
                            <CreditCardItem
                                valid={item.verified}
                                name={item.name}
                                bgImage={cardImages[idx]}
                                number={item.card_number}
                                handleClick={() => handleClickOnCard(item)}
                                expireDate={item.expire}
                                handleActivate={() => handleActivate(item)}
                            />
                        </Col>
                    ))
                }
            </Row>
        </>
    )
}