import React from 'react'
import {Col, Row} from 'antd'
import {useTranslation} from 'react-i18next'
import {CloseMiniSvg} from '../../../Icons/Close'
import {Button} from '../../../UIComponents/Button'
import {CreatePostFixedHeaderWrapper} from '../style'
import {Title} from '../../../UIComponents/Typography/Title'

export const CreatePostFixedHeader = ({handleCreate, goBack}) => {
    const {t} = useTranslation()
    
    
    return (
        <CreatePostFixedHeaderWrapper>
            <Row
                wrap={false}
                gutter={[12, 0]}
                align='middle'
                justify='space-between'
            >
                <Col
                    onClick={goBack}
                    className='close-icon-wrapper'
                >
                    <CloseMiniSvg/>
                </Col>
                <Col flex={1}>
                    <Title>{t('create_post')}</Title>
                </Col>
                <Col>
                    <Button
                        onClick={handleCreate}
                    >
                        {t('publish')}
                    </Button>
                </Col>
            </Row>
        </CreatePostFixedHeaderWrapper>
    )
}