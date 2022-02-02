import React from 'react'
import {Col, Row} from 'antd'
import {useStore} from 'effector-react'
import {CloseSvg} from '../../../Icons/Close'
import {$appModel} from '../../../Models/app'
import {INFO_MAT} from '../../../Constants/app'
import {Avatar} from '../../../UIComponents/Avatar'
import {IconBox} from '../../../UIComponents/GlobalStyles'
import {Text} from '../../../UIComponents/Typography/Text'
import {Title} from '../../../UIComponents/Typography/Title'
import {CloseButtonWrapper, OfferingHorizontalCardWrapper} from './style'

export const OfferingHorizontalCard = ({imgUrl, name, cost, manageCount, id, handleDelete}) => {
    // const {push, location: {pathname}} = useHistory()
    // const {organization} = useParams()
    const {$device} = useStore($appModel)
    
    // const handlePush = () => {
    //     if (organization) {
    //         saveURLMount(pathname)
    //         push(`/${organization}/offerings/${id}`)
    //     }
    // }
    
    return (
        <OfferingHorizontalCardWrapper>
            {
                $device && $device !== INFO_MAT
                    ? <IconBox onClick={() => handleDelete(id)}>
                        <CloseSvg/>
                    </IconBox>
                    : ''
            }
            <Row justify='space-between' align='middle' wrap={false}>
                <Col
                    // onClick={handlePush}
                >
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
                    <Text
                        // onClick={handlePush}
                    >
                        {name}
                    </Text>
                    <div className='cost-manage-wrapper'>
                        <Title>
                            {cost.toUpperCase()}
                        </Title>
                        {manageCount}
                    </div>
                </Col>
                {
                    $device && $device === INFO_MAT
                        ? <Col>
                            <CloseButtonWrapper onClick={() => handleDelete(id)}>
                                <CloseSvg/>
                            </CloseButtonWrapper>
                        </Col>
                        : ''
                }
            </Row>
        </OfferingHorizontalCardWrapper>
    )
}