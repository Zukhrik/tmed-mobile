import React from 'react'
import {Col, Row} from 'antd'
import {ShortCard, ShortCardSkeleton} from '../../../Components/Cards'
import {AccountInfoWrap} from '../atoms'

export const OrgPageHeader = (
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