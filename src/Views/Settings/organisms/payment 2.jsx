import React, {useState} from 'react'
import {Col, Row} from 'antd'
import {Cards} from './cards'
import {useStore} from 'effector-react'
import {PaymentBodyWrapper} from '../atoms'
import {useTranslation} from 'react-i18next'
import {CurrencyItems} from './currency-items'
import {PlusSquareSvg} from '../../../Icons/Plus'
import {ArrowIosRightSvg} from '../../../Icons/Arrow'
import {Text} from '../../../UIComponents/Typography/Text'
import {IconBox} from '../../../UIComponents/GlobalStyles'
import {OverlaySettings} from '../../../Components/Overlay'
import {$accountModel} from '../../../Models/account-model'
import {useCreateAccountCard} from '../../../Hooks/account'
import {CreateCard} from '../../Checkout/InfoCard/CheckoutDetail/CreditCardDetail/CreateCard'


export const Payment = () => {
    const {t} = useTranslation()
    const {$profiles: {currentProfile}} = useStore($accountModel)
    const [openCurrency, setOpenCurrency] = useState(false)
    const [createCard, setCreateCard] = useState(false)
    const [currency, setCurrency] = useState(currentProfile?.currency?.code)
    
    const onClose = () => {
        setCreateCard(false)
    }
    
    const {
        formik,
        cardId,
        deadline,
        setCardId,
        codeFormik,
        showResend,
        resendCode,
        handleChange,
        setShowResend,
        disabledButton,
        handleChangeCode,
        disabledButtonCode
    } = useCreateAccountCard({onClose})
    
    const renderCurrencies = (item) => {
        if (item === 'uzs') {
            return 'UZS - Uzbek sum'
        } else if (item === 'usd') {
            return 'USD - United States dollar'
        } else if (item === 'rub') {
            return 'RUB - Russian ruble'
        } else if (item === 'eur') {
            return 'EUR - The Euro'
        }
    }
    
    
    return (
        <PaymentBodyWrapper>
            <OverlaySettings
                openSettings={openCurrency}
                onClose={() => setOpenCurrency(false)}
                content={<CurrencyItems
                    currency={currency}
                    setOpenOverlay={setOpenCurrency}
                    setCurrency={setCurrency}
                />}
            />
            <OverlaySettings
                openSettings={createCard}
                onClose={() => onClose()}
                content={<CreateCard
                    cardId={cardId}
                    formik={formik}
                    deadline={deadline}
                    showResend={showResend}
                    resendCode={resendCode}
                    codeFormik={codeFormik}
                    handleChange={handleChange}
                    setShowResend={setShowResend}
                    disabledButton={disabledButton}
                    handleChangeCode={handleChangeCode}
                    disabledButtonCode={disabledButtonCode}
                />}
            />
            <Row
                gutter={[0, 12]}
                className='payment-wrapper'
            >
                <Col span={24} className='payment-title'>
                    <Text>{t('system_currency')}</Text>
                </Col>
                <Col
                    span={24}
                    className='payment-item'
                    onClick={() => setOpenCurrency(true)}
                >
                    <Row justify='space-between'>
                        <Col>
                            <Text>{renderCurrencies(currency)}</Text>
                        </Col>
                        <Col>
                            <ArrowIosRightSvg/>
                        </Col>
                    </Row>
                </Col>
                <Col
                    span={24}
                    className='payment-text'
                >
                    <Text>
                        The prices of all products and offers are automatically converted into the exchange rate of the
                        Central Bank
                    </Text>
                </Col>
                <Col span={24}>
                    <Row gutter={[12, 0]} justify='space-between' align='middle'>
                        <Col>
                            <Text color='var(--grey-dwed)'>{t('my_cards')}</Text>
                        </Col>
                        <Col onClick={() => setCreateCard(true)}>
                            <IconBox>
                                <PlusSquareSvg/>
                                {t('add_card')}
                            </IconBox>
                        </Col>
                    </Row>
                </Col>
                <Col span={24}>
                    <Cards
                        cardId={cardId}
                        setCardId={setCardId}
                        setCreateCard={setCreateCard}
                    />
                </Col>
            </Row>
        </PaymentBodyWrapper>
    )
}