import React from 'react'
import {Col, Row} from 'antd'
import {useTranslation} from 'react-i18next'
import {ChangeCardForm} from '../atoms/style'
import payment from '../../../Service/payment'
import {Button} from '../../../UIComponents/Button'
import {InputUI} from '../../../UIComponents/mu-inputs'
import {Title} from '../../../UIComponents/Typography/Title'
import {accountCardMount} from '../../../Models/payment-model'

export const ChangeCard = ({cardName, setCardName, setOpenOverlay, cardId, setCardId}) => {
    const {t} = useTranslation()
    
    const handleSubmit = (e) => {
        e.preventDefault()
        if (cardName.trim().length > 0) {
            const params = {
                id: cardId,
                data: {
                    name: cardName
                }
            }
            payment.changeAccountCard(params)
                .then(res => {
                    if (res) {
                        accountCardMount()
                        setOpenOverlay(false)
                    }
                })
                .finally(() => {
                    setCardId(null)
                })
            
        }
    }
    
    const handleChange = (e) => {
        setCardName(e)
    }
    
    const handleDeleteCard = () => {
        payment.deleteAccountCard({id: cardId})
            .then(res => {
                if (res) {
                    accountCardMount()
                    setOpenOverlay(false)
                }
            })
            .finally(() => {
                setCardId(null)
            })
    }
    
    return (
        <ChangeCardForm
            onSubmit={(e) => handleSubmit(e)}
        >
            <Row
                gutter={[0, 24]}
                justify='center'
            >
                <Col span={24}>
                    <Title>{t('change_card')}</Title>
                </Col>
                <Col span={24}>
                    <InputUI
                        name='card-name'
                        value={cardName}
                        label={t('card_name')}
                        onChange={(e) => handleChange(e.target.value)}
                    />
                </Col>
                <Col span={24}>
                    <Button
                        size='l'
                        variant='primary'
                        htmlType='submit'
                    >
                        {t('save')}
                    </Button>
                </Col>
                <Col span={24}>
                    <Button
                        size='l'
                        variant='danger'
                        onClick={handleDeleteCard}
                    >
                        {t('delete_card')}
                    </Button>
                </Col>
            </Row>
        </ChangeCardForm>
    )
}