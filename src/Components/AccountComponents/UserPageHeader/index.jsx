import React from 'react'
import {Col, Row} from 'antd'
import {AccountInfoWrap} from '../style'
import {ShortCard, ShortCardSkeleton} from '../../Cards'


export const UserPageHeader = (
    {
        name,
        category,
        imgUrl,
        forceLoading
    }
) => {
    
    return (
        <AccountInfoWrap>
            <Row justify='space-between'>
                <Col span={24} className='padding'>
                    {
                        forceLoading === 2
                            ? <ShortCard
                                imgSize={48}
                                imgUrl={imgUrl}
                                name={name}
                                text={category}
                            />
                            : <ShortCardSkeleton size={48}/>
                    }
                </Col>
            </Row>
        </AccountInfoWrap>
    )
}