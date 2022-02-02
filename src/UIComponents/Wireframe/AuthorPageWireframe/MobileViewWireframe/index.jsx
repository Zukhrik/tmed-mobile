import React from 'react'
import {Col, Row} from 'antd'
import {useStore} from 'effector-react'
import {SlideDown} from 'react-slidedown'
import {$appModel} from '../../../../Models/app'

export const MobileViewWireframe = (
    {
        specPanel,
        pageHeader,
        filterPanel,
        pageContent,
        offeringGroup,
        orgGroupPanel,
    }
) => {
    const {$app: {showSpecPanel, changeOrgGroupPanel}} = useStore($appModel)
    
    return (
        <Row gutter={[0, 20]}>
            <Col span={24}>
                {pageHeader}
            </Col>
            {
                filterPanel && (
                    <Col span={24}>
                        {filterPanel}
                    </Col>
                )
            }
            {
                specPanel && (
                    <SlideDown closed={!showSpecPanel}>
                        {specPanel}
                    </SlideDown>
                )
            }
            {
                orgGroupPanel && (
                    <SlideDown closed={!changeOrgGroupPanel}>
                        {orgGroupPanel}
                    </SlideDown>
                )
            }
            {
                offeringGroup &&
                <Col span={24}>
                    {offeringGroup}
                </Col>
            }
            <Col span={24}>
                {pageContent}
            </Col>
        </Row>
    )
}