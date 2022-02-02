import React from 'react'
import {ArrowIosRightSvg} from '../../../Icons/Arrow'
import {IconBox} from '../../../UIComponents/GlobalStyles'
import {BodyItemWrapper, ItemCheckBox, ItemCheckBoxWrapper, LoadingSpinWrapper, SelectionListBody} from '../style'
import InfiniteScroll from 'react-infinite-scroll-component'
import {Spin} from 'antd'

export const ListBody = ({loadMore, list, getChildren, onSelect, selected}) => {
    const {loading, data, result} = list
    
    const handleClick = (item) => {
        if (item.has_subs) {
            getChildren(item)
        } else {
            onSelect(item)
        }
    }
    
    return (
        <SelectionListBody id='scrollableDiv'>
            {
                loading
                    ? (
                        <LoadingSpinWrapper>
                            <Spin/>
                        </LoadingSpinWrapper>
                    )
                    : (
                        <InfiniteScroll
                            next={loadMore}
                            dataLength={result?.nextOffset || 10}
                            hasMore={!loading && !!result?.next}
                            loader={<>...loading</>}
                            scrollableTarget='scrollableDiv'
                        >
                            {
                                data?.length > 0 && data?.length > 0 && data.map((item) => (
                                    <BodyItemWrapper
                                        key={item.id}
                                        onClick={() => handleClick(item)}
                                    >
                                        {
                                            item.has_subs && (
                                                <IconBox>
                                                    <ArrowIosRightSvg/>
                                                </IconBox>
                                            )
                                        }
                                        <ItemCheckBoxWrapper>
                                            {item.name}
                                            {
                                                !item.has_subs && (
                                                    <ItemCheckBox checked={selected && selected.id === item.id}/>
                                                )
                                            }
                                        </ItemCheckBoxWrapper>
                                    </BodyItemWrapper>
                                ))
                            }
                        </InfiniteScroll>
                    )
            }
        </SelectionListBody>
    )
}