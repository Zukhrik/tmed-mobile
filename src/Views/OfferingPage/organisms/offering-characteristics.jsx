import React, {useState} from 'react'
import {
    ActionArrowWrapper,
    BetweenWrapper,
    CharacsTitleWrapper,
    CharacteristicsList,
    OfferInfoItemWrapper
} from '../atoms'
import {Col, Row} from 'antd'
import SlideDown from 'react-slidedown'
import {useStore} from 'effector-react'
import {useTranslation} from 'react-i18next'
import {$appModel} from '../../../Models/app'
import {INFO_MAT} from '../../../Constants/app'
import {ArrowIosTopSvg} from '../../../Icons/Arrow'
import {PARAMS_CHARACTER_TYPE} from '../../../Constants'
import {Text} from '../../../UIComponents/Typography/Text'
import {Container} from '../../../UIComponents/GlobalStyles'
import {Title} from '../../../UIComponents/Typography/Title'
import {$offeringsModel} from '../../../Models/offerings-model'
import moment from 'moment'


export const OfferingCharacteristics = () => {
    const {t} = useTranslation()
    const {$device} = useStore($appModel)
    const [show, setShow] = useState(false)
    const {$offeringsCharacs: {data}} = useStore($offeringsModel)
    const params = data.filter(item => item.character.character_type !== PARAMS_CHARACTER_TYPE.COLOUR_FIELD)
    
    return (
        <>
            {
                params.length > 0 && (
                    <Container>
                        <Row gutter={[0, 12]}>
                            <Col span={24}>
                                <CharacsTitleWrapper onClick={() => setShow(!show)}>
                                    <Text>{t('product_characteristics')}</Text>
                                    {
                                        $device && $device === INFO_MAT
                                            ? ''
                                            : <ActionArrowWrapper status={!show}>
                                                <ArrowIosTopSvg/>
                                            </ActionArrowWrapper>
                                    }
                                </CharacsTitleWrapper>
                            </Col>
                            <Col span={24}>
                                <CharacteristicsList>
                                    {
                                        $device && $device === INFO_MAT
                                            ? <>
                                                {
                                                    params.map((item, idx) => (
                                                        <OfferInfoItemWrapper key={`${idx + 1}`}>
                                                            <Text>{item.character.name}</Text>
                                                            <BetweenWrapper/>
                                                            <Title style={{fontWeight: 400}} level={5}>{item.value}</Title>
                                                        </OfferInfoItemWrapper>
                                                    ))
                                                }
                                            </>
                                            : <SlideDown transitionOnAppear={false} closed={!show}>
                                                {
                                                    params.map((item, idx) => (
                                                        <OfferInfoItemWrapper key={`${idx + 1}`}>
                                                            <Text alignType='left'>{item.character.name}</Text>
                                                            <BetweenWrapper/>
                                                            <Title
                                                                level={5}
                                                                alignType='right'
                                                                style={{fontWeight: 400}}
                                                            >
                                                                {item.character.character_type === 10
                                                                    ? moment(item.value).format('DD-MM-YYYY')
                                                                    : item.value
                                                                }
                                                            </Title>
                                                        </OfferInfoItemWrapper>
                                                    ))
                                                }
                                            </SlideDown>
                                    }
                                </CharacteristicsList>
                            </Col>
                        </Row>
                    </Container>
                )
            }
        </>
    )
}