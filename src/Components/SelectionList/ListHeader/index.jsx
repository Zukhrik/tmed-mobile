import React from 'react'
import {Breadcrumb, Col, Row} from 'antd'
import {SelectionListHeader} from '../style'
import {useTranslation} from 'react-i18next'
import {SearchSvg} from '../../../Icons/Search'
import {Input} from '../../../UIComponents/Inputs'

export const ListHeader = ({breadcrumb, handleSubmit, searchValue, setSearchValue, handleClick}) => {
    const {t} = useTranslation()
    
    
    return (
        <SelectionListHeader>
            <Row gutter={[0, 12]}>
                <Col span={24}>
                    <form onSubmit={handleSubmit}>
                        <Input
                            placeholder={`${t('search')}...`}
                            icon={<SearchSvg/>}
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                    </form>
                </Col>
                {
                    (breadcrumb.length > 0 || searchValue.trim().length > 0)
                    && (
                        <Col span={24}>
                            <Breadcrumb>
                                <Breadcrumb.Item>
                                    <a
                                        href='/'
                                        onClick={(e) => handleClick(e, 0)}
                                    >
                                        Home
                                    </a>
                                </Breadcrumb.Item>
                                {
                                    searchValue.trim().length > 0 && breadcrumb.length === 0 && (
                                        <Breadcrumb.Item>
                                            {searchValue}
                                        </Breadcrumb.Item>
                                    )
                                }
                                {
                                    breadcrumb.map((item, idx, arr) => (
                                        <Breadcrumb.Item key={`${idx + 1}`}>
                                            {
                                                idx + 1 === arr.length
                                                    ? item.name
                                                    : <a
                                                        href='/'
                                                        onClick={(e) => handleClick(e, item.id)}
                                                    >
                                                        {item.name}
                                                    </a>
                                            }
                                        </Breadcrumb.Item>
                                    ))
                                }
                            </Breadcrumb>
                        </Col>
                    )
                }
            </Row>
        </SelectionListHeader>
    )
}