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
import {useTranslation} from 'react-i18next'
import {ArrowIosTopSvg} from '../../../Icons/Arrow'
import {Text} from '../../../UIComponents/Typography/Text'
import {Title} from '../../../UIComponents/Typography/Title'
import moment from 'moment'
import {Container} from '../../../UIComponents/GlobalStyles'


export const OfferingCharacteristics = ({params}) => {
    const {t} = useTranslation()
    const [show, setShow] = useState(false)
    
    return (
        <Container>
            {
                params.length > 0 && (
                    <Row gutter={[0, 12]}>
                        <Col span={24}>
                            <CharacsTitleWrapper onClick={() => setShow(!show)}>
                                <Text>{t('product_characteristics')}</Text>
                                <ActionArrowWrapper status={!show}>
                                    <ArrowIosTopSvg/>
                                </ActionArrowWrapper>
                            </CharacsTitleWrapper>
                        </Col>
                        <Col span={24}>
                            <CharacteristicsList>
                                {
                                    <SlideDown transitionOnAppear={false} closed={!show}>
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
                )
            }
        </Container>
    )
}