import React from 'react'
import {Col, Row} from 'antd'
import {ListBody} from './ListBody'
import {ListHeader} from './ListHeader'
import {ListFooter} from './ListFooter'
import {useCategory} from '../../Hooks/category'

export const SelectionList = ({listType, onChange, onClose, formik}) => {
    const {
        list,
        onSelect,
        selected,
        loadMore,
        breadcrumb,
        getChildren,
        searchValue,
        handleClick,
        handleSubmit,
        handleAccept,
        setSearchValue
    } = useCategory({listType, onChange, onClose})
    
    return (
        <Row gutter={[0, 12]}>
            <Col span={24}>
                <ListHeader
                    breadcrumb={breadcrumb}
                    searchValue={searchValue}
                    handleClick={handleClick}
                    handleSubmit={handleSubmit}
                    setSearchValue={setSearchValue}
                />
            </Col>
            <Col span={24}>
                <ListBody
                    list={list}
                    onSelect={onSelect}
                    selected={selected}
                    loadMore={loadMore}
                    getChildren={getChildren}
                />
            </Col>
            <Col span={24}>
                <ListFooter
                    formik={formik}
                    onClose={onClose}
                    handleAccept={handleAccept}
                />
            </Col>
        </Row>
    )
}