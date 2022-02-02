import React from 'react'
import {Col, Row} from 'antd'
import {ArrowLeftSvg} from '../../../Icons/Arrow'
import {Button} from '../../../UIComponents/Button'
import {IconBox} from '../../../UIComponents/GlobalStyles'
import {Title} from '../../../UIComponents/Typography/Title'
import {useStore} from 'effector-react'
import {$appModel} from '../../../Models/app'
import {INFO_MAT} from '../../../Constants/app'

export const FixedHeaderComponent = ({title1, title2, title3, goBack, nextTo, disabled}) => {
    const {$device} = useStore($appModel)
    
    return (
        <Row
            align='middle'
            gutter={[12, 0]}
            justify='space-between'
            className='fixed-header-component'
        >
            <Col>
                <Row
                    align='middle'
                    onClick={goBack}
                >
                    <Col>
                        <IconBox marginRight={10}>
                            <ArrowLeftSvg/>
                        </IconBox>
                    </Col>
                    <Col>
                        <Title level={$device && $device === INFO_MAT ? 3 : ''}>{title1 && title1}</Title>
                    </Col>
                </Row>
            </Col>
            <Col>
                <Title>{title2 && title2}</Title>
            </Col>
            <Col onClick={nextTo}>
                <Button
                    style={{width: 165}}
                    variant='primary'
                    size='l'
                    disabled={disabled}
                >
                    {title3 && title3}
                </Button>
            </Col>
        </Row>
    )
}