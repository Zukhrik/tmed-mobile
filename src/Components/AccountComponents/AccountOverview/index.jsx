import React from 'react'
import {useStore} from 'effector-react'
import {$accountModel} from '../../../Models/account-model'
import {ShortCard} from '../../Cards'
import {Col, Row} from 'antd'

export const AccountOverview = () => {
    const {$accountInfo: {data}} = useStore($accountModel)
    
    return (
        <Row gutter={[0, 12]} style={{padding: '0 12px'}}>
            {
                data && data.specialisms.map((item, idx) => (
                    <Col
                        span={24}
                        key={`${idx + 1}`}
                    >
                        <ShortCard
                            imgUrl={item.org.logo}
                            name={item.org.name}
                            text={item.job.name}
                        />
                    </Col>
                ))
            }
        </Row>
    )
}