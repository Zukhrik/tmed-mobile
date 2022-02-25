import React from 'react'
import {RecordsCardWrapper} from '../atoms'
import {Col, Row} from 'antd'
import {Text} from '../../../UIComponents/Typography/Text'
import {ShortCard} from '../../../Components/Cards'

export const AccountRecordsCard = ({meetTime, imgUrl, orgName, orgCat, handlePush}) => {
    return (
        <RecordsCardWrapper onClick={handlePush}>
            <Row gutter={[0, 12]}>
                <Col span={24}>
                    <Text level={5}>{meetTime}</Text>
                </Col>
                <Col span={24}>
                    <ShortCard
                        imgSize={40}
                        imgUrl={imgUrl}
                        name={orgName}
                        text={orgCat}
                    />
                </Col>
            </Row>
        </RecordsCardWrapper>
    )
}