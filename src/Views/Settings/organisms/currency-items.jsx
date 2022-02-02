import React from 'react'
import {Col, Row} from 'antd'
import {useStore} from 'effector-react'
import {$appModel} from '../../../Models/app'
import account from '../../../Service/account'
import {Text} from '../../../UIComponents/Typography/Text'
import {accountCardMount} from '../../../Models/payment-model'

export const CurrencyItems = ({setCurrency, setOpenOverlay}) => {
    const {$currenciesList: {data}} = useStore($appModel)
    
    
    const renderCurrencies = (item) => {
        if (item.code === 'uzs') {
            return 'UZS - Uzbek sum'
        } else if (item.code === 'usd') {
            return 'USD - United States dollar'
        } else if (item.code === 'rub') {
            return 'RUB - Russian ruble'
        } else if (item.code === 'eur') {
            return 'EUR - The Euro'
        }
    }
    
    const handleClick = (item) => {
        setCurrency(item.code)
        const params = {
            data: {
                currency: {
                    name: item.name,
                    code: item.code
                },
                currency_id: item.id
            }
        }
        account.updateAccount(params)
            .then(res => {
                if (res) {
                    setOpenOverlay(false)
                    accountCardMount()
                }
            })
    }
    
    return (
        <Row
            gutter={[0, 24]}
        >
            {
                data?.map((item, idx) => (
                    <Col
                        span={24}
                        key={`${idx + 1}`}
                        onClick={() => handleClick(item)}
                    >
                        <Text
                            level={4}
                            alignType='start'
                        >
                            {renderCurrencies(item)}
                        </Text>
                    </Col>
                ))
            }
        </Row>
    )
}