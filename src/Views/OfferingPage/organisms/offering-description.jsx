import React, {useState} from 'react'
import {Col, Row} from 'antd'
import {Description} from '../atoms'
import {useTranslation} from 'react-i18next'
import {Text} from '../../../UIComponents/Typography/Text'
import {SkeletonUI} from '../../../UIComponents/GlobalStyles'
import {truncateString} from '../../../utils/stringUtils'

export const OfferingDescription = ({description, loading}) => {
    const {t} = useTranslation()
    const [truncate, setTruncate] = useState(false)
    
    return (
        <Row className='padding'>
            <Col span={24}>
                <Text level={5} color='var(--grey-dwed)'>{`${t('description')}:`}</Text>
            </Col>
            <Col span={24}>
                {
                    !loading
                        ? (
                            <Description>
                                {
                                    description.length > 150
                                        ? !truncate
                                            ? <Text>
                                                {truncateString(description, 150)}
                                                <span onClick={() => setTruncate(true)}>{t('more')}</span>
                                            </Text>
                                            : <Text>
                                                {description}
                                                <span onClick={() => setTruncate(false)}>{t('hide')}</span>
                                            </Text>
                                        : <Text>
                                            {description}
                                        </Text>
                                }
                            </Description>
                        )
                        : (
                            <>
                                <SkeletonUI variant='text' width='100%' height={12}/>
                                <SkeletonUI variant='text' width='100%' height={12}/>
                                <SkeletonUI variant='text' width='100%' height={12}/>
                                <SkeletonUI variant='text' width='100%' height={12}/>
                                <SkeletonUI variant='text' width='100%' height={12}/>
                            </>
                        )
                }
            </Col>
        </Row>
    )
}