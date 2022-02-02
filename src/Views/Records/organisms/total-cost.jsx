import React from 'react'
import {useHistory, useParams} from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import {useUrlParams} from '../../../Hooks/app'
import {useStore} from 'effector-react'
import {$orderModel} from '../../../Models/order-model'
import {$accountModel} from '../../../Models/account-model'
import {OrgOrderCartButtonWrapper, TotalCostContainerWrapper, TotalCostItem} from '../atoms'
import {Title} from '../../../UIComponents/Typography/Title'
import {Button} from '../../../UIComponents/Button'
import {URL_KEYS} from '../../../Constants'

export const TotalCost = () => {
    const {push} = useHistory()
    const {t} = useTranslation()
    const {urlData} = useUrlParams()
    const {organization} = useParams()
    const {$orgOrderCartList: {result}} = useStore($orderModel)
    const {$profiles: {currentProfile}} = useStore($accountModel)
    
    return (
        <TotalCostContainerWrapper>
            <TotalCostItem>
                <Title color='var(--grey-dwed)'>
                    {`${t('total_cost')}:`}
                </Title>
                {
                    organization && result?.[organization]?.total_cost > 0
                        ? (
                            <Title>
                                {`${result?.[organization]?.total_cost.toLocaleString('fi-Fi')}
                            ${currentProfile?.currency?.code?.toUpperCase()}`}
                            </Title>
                        )
                        : <Title>-</Title>
                }
            </TotalCostItem>
            <OrgOrderCartButtonWrapper>
                <Button
                    variant='primary'
                    onClick={() => push(`/checkout/${organization}?${URL_KEYS.SPECIALIST_ID}=${urlData.specialist_id}`)}
                >
                    {t('select_time')}
                </Button>
            </OrgOrderCartButtonWrapper>
        </TotalCostContainerWrapper>
    )
}