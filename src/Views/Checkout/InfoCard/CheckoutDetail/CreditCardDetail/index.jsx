import React from 'react'
import {CreateCard} from './CreateCard'
import {PaymentMethod} from './PaymentMethod'
import {useAccountCard} from '../../../../../Hooks/payment'
import {useCreateAccountCard} from '../../../../../Hooks/account'


export const CreditCardDetail = ({cardWrapper, setCardWrapper, onClose, payment, setPayment}) => {
    useAccountCard()
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
    } = useCreateAccountCard({onClose, setPayment, payment})
    
    const handleAdd = () => {
        setCardWrapper(true)
        setCardId(undefined)
    }
    
    
    return (
        <>
            {
                cardWrapper
                    ? (
                        <CreateCard
                            deadline={deadline}
                            showResend={showResend}
                            cardId={cardId}
                            setShowResend={setShowResend}
                            formik={formik}
                            setPayment={setPayment}
                            resendCode={resendCode}
                            codeFormik={codeFormik}
                            handleChange={handleChange}
                            disabledButton={disabledButton}
                            handleChangeCode={handleChangeCode}
                            disabledButtonCode={disabledButtonCode}
                        />
                    )
                    : <PaymentMethod
                        setCardId={setCardId}
                        setCardWrapper={setCardWrapper}
                        onClose={onClose}
                        handleAddCard={handleAdd}
                        setPayment={setPayment}
                        payment={payment}
                    />
            }
        </>
    )
}