import React, {useCallback} from 'react'
import {Col, Row} from 'antd'
import {Progress} from '../ProgressItem'
import {degreesData} from '../../../data'
import {SkeletonUI} from '../../../UIComponents/GlobalStyles'

export const AccountCardRatingList = ({rating, showSkeleton}) => {
    const renderItem = useCallback((item) => {
        let tmp = {
            ...item,
            score: 0,
            level: 0,
            remaining_score: 0
        }
        
        if (rating && rating[item.id]) {
            tmp = {
                ...item,
                ...rating[item.id]
            }
        }
        
        return tmp
    }, [rating])
    
    return (
        <Row gutter={12} style={{marginTop: 12}}>
            {
                degreesData.map((item) => (
                    <Col span={8} key={item.id}>
                        {
                            showSkeleton
                                ? <SkeletonUI height={14}/>
                                : <Progress item={renderItem(item)}/>
                        }
                    </Col>
                ))
            }
        </Row>
    )
}