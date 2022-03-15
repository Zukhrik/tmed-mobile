import React from 'react'
import {Col, Row} from 'antd'
import {CloseSvg} from '../../../Icons/Close'
import {Avatar} from '../../../UIComponents/Avatar'
import {IconBox} from '../../../UIComponents/GlobalStyles'
import {Text} from '../../../UIComponents/Typography/Text'
import {Title} from '../../../UIComponents/Typography/Title'
import {CostManageWrapper, OfferingHorizontalCardWrapper, OfferNameActionWrapper} from './style'

export const OfferingHorizontalCard = ({imgUrl, name, cost, manageCount, id, handleDelete}) => {
    
    return (
        <OfferingHorizontalCardWrapper>
            <Row justify='space-between' align='middle' wrap={false}>
                <Col>
                    <Avatar
                        imgUrl={imgUrl}
                        shape='square'
                        size={95}
                    />
                </Col>
                <Col
                    flex={1}
                    className='offer-info-wrapper'
                >
                    <OfferNameActionWrapper>
                        <Text>
                            {name}
                        </Text>
                        <IconBox onClick={() => handleDelete(id)}>
                            <CloseSvg/>
                        </IconBox>
                    </OfferNameActionWrapper>
                    <CostManageWrapper>
                        <Title>
                            {cost.toUpperCase()}
                        </Title>
                        {manageCount}
                    </CostManageWrapper>
                </Col>
            </Row>
        </OfferingHorizontalCardWrapper>
    )
}