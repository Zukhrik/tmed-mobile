import React from 'react'
import {
    OfferInfoItemWrapper,
    OfferingColorItem,
    OfferingColorItemWrapper,
    OfferShortInfoWrapper,
    PropertyDescription,
    PropertyName
} from '../atoms'
import {Col, Row} from 'antd'
import {useStore} from 'effector-react'
import {useTranslation} from 'react-i18next'
import {$appModel} from '../../../Models/app'
import {InfinitySvg} from '../../../Icons/infinity'
import {numberFormat} from '../../../utils/number-utils'
import {PARAMS_CHARACTER_TYPE} from '../../../Constants'
import {Text} from '../../../UIComponents/Typography/Text'
import {$accountModel} from '../../../Models/account-model'
import {Title} from '../../../UIComponents/Typography/Title'
import {$offeringsModel} from '../../../Models/offerings-model'
import {IconBox, SkeletonUI, SkeletonWrapper} from '../../../UIComponents/GlobalStyles'


export const OfferingInfo = ({loading, name, cost, qty}) => {
    const {t} = useTranslation()
    const {$detectLocationInfo} = useStore($appModel)
    const {$profiles: {currentProfile}} = useStore($accountModel)
    const {$offeringsCharacs: {data: paramData}} = useStore($offeringsModel)
    
    let colorsParam = paramData.length > 0 && paramData.find(
        item => item.character.character_type === PARAMS_CHARACTER_TYPE.COLOUR_FIELD
    )
    const currency = currentProfile
        ? (currentProfile.currency && currentProfile.currency.code)
        : $detectLocationInfo.currency || ''
    const getColor = (value) => {
        return `#${value.split('|')[1]}`
    }
    
    return (
        <OfferShortInfoWrapper>
            <Row gutter={[0, 12]}>
                <Col span={24} className='offering-description container'>
                    {
                        !loading
                            ? <Text>{name}</Text>
                            : <SkeletonWrapper height={25.14}>
                                <SkeletonUI variant='text' width='100%' height={12}/>
                            </SkeletonWrapper>
                    }
                </Col>
                <Col span={24} className='offering-description container'>
                    <Title level={3}>
                        {
                            !loading
                                ? `${numberFormat(cost)} ${currency?.toUpperCase()}`
                                : <SkeletonWrapper height={18}>
                                    <SkeletonUI variant='text' width='100%' height={12}/>
                                </SkeletonWrapper>
                        }
                    </Title>
                </Col>
                <Col span={24} className='container'>
                    <OfferInfoItemWrapper>
                        <PropertyName>
                            <Text>{t('quantity')}</Text>
                        </PropertyName>
                        <PropertyDescription>
                            <Text>
                                {
                                    !loading
                                        ? qty
                                            ? <span style={{marginLeft: 10}}>{`${qty} ${t('peaces')}`}</span>
                                            : <IconBox><InfinitySvg/></IconBox>
                                        : ''
                                }
                            </Text>
                        </PropertyDescription>
                    </OfferInfoItemWrapper>
                </Col>
                {
                    colorsParam && colorsParam?.value && (
                        <Col span={24} className='container'>
                            <OfferingColorItemWrapper>
                                <PropertyName>
                                    <Text>{t('color')}</Text>
                                </PropertyName>
                                <PropertyDescription>
                                    {
                                        colorsParam.value.map((item, idx) => (
                                            <OfferingColorItem
                                                key={`${idx + 1}`}
                                                backgroundColor={getColor(item)}
                                            />
                                        ))
                                    }
                                </PropertyDescription>
                            </OfferingColorItemWrapper>
                        </Col>
                    )
                }
                <Col span={24} className='info-bottom-line container'/>
            </Row>
        </OfferShortInfoWrapper>
    )
}