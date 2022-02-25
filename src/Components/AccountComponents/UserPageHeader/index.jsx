import React from 'react'
import {Col, Row} from 'antd'
import {AccountInfoWrap} from '../style'
import {useParams} from 'react-router-dom'
import {Avatar} from '../../../UIComponents/Avatar'
import {Text} from '../../../UIComponents/Typography/Text'
import {Title} from '../../../UIComponents/Typography/Title'
import {SkeletonUI, SkeletonWrapper} from '../../../UIComponents/GlobalStyles'
import {degreesData} from '../../../data'


export const UserPageHeader = (
    {
        name,
        category,
        imgUrl,
        forceLoading,
        subscription,
        aesthetics,
        esthetics,
        professional
    }
) => {
    const {username} = useParams()
    
    const generateOrgRating = (item) => {
        switch (item.id) {
            case 'aesthetics':
                return aesthetics
            case 'ethics':
                return esthetics
            case 'professional':
                return professional
            default:
                return null
        }
    }
    
    return (
        <AccountInfoWrap>
            <Row justify='space-between'>
                <Col span={24} className='padding'>
                    <Row gutter={[12, 0]} justify='space-between' align='middle'>
                        <Col>
                            {
                                forceLoading === 2
                                    ? <Avatar
                                        imgUrl={imgUrl}
                                        shape='circle'
                                        size={70}
                                    />
                                    : <SkeletonUI
                                        variant='circle'
                                        width={70}
                                        height={70}
                                    />
                            }
                        </Col>
                        {
                            !username && (
                                <Col flex={1}>
                                    <Row justify='space-around'>
                                        {
                                            degreesData.map((item, idx) => {
                                                const Icon = item.icon
                                                return (
                                                    <Col
                                                        key={`${idx + 1}`}
                                                        className='account-subs-wrapper'
                                                        style={{color: item.color, boxShadow: item.shadow_color}}
                                                    >
                                                        <Icon/>
                                                        {generateOrgRating(item)}
                                                    </Col>
                                                )
                                            })
                                        }
                                    </Row>
                                </Col>
                            )
                        }
                    </Row>
                </Col>
                <Col
                    span={24}
                    className='short-info-wrapper'
                >
                    {
                        forceLoading === 2
                            ? <Row
                                gutter={[0, 4]}
                            >
                                <Col span={24}>
                                    <Title
                                        level={5}
                                    >
                                        {name}
                                    </Title>
                                </Col>
                                <Col span={24}>
                                    <Text>
                                        {category}
                                    </Text>
                                </Col>
                            </Row>
                            : <Row gutter={[0, 4]}>
                                <Col
                                    span={24}
                                >
                                    <SkeletonWrapper height={22}>
                                        <SkeletonUI
                                            variant='rect'
                                            width='100%'
                                            height={12}
                                        />
                                    </SkeletonWrapper>
                                </Col>
                                <Col span={24}>
                                    <SkeletonWrapper height={18.84}>
                                        <SkeletonUI
                                            variant='rect'
                                            width='100%'
                                            height={12}
                                        />
                                    </SkeletonWrapper>
                                </Col>
                            </Row>
                    }
                </Col>
            </Row>
        </AccountInfoWrap>
    )
}