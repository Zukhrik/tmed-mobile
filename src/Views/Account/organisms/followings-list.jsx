import React, {useState} from 'react'
import {FollsListWrapper} from '../atoms'
import {useStore} from 'effector-react'
import {$userModel, userSubsMyMount} from '../../../Models/user-model'
import {Col, Row} from 'antd'
import {ShortCard, ShortCardSkeleton} from '../../../Components/Cards'
import InfiniteScroll from 'react-infinite-scroll-component'
import {AccountSearchInput} from '../molecules'
import {useParams} from 'react-router-dom'
import {Button} from '../../../UIComponents/Button'
import {$accountModel} from '../../../Models/account-model'
import {useTranslation} from 'react-i18next'
import {useUnfollowFollsUser} from '../../../Hooks/user/use-unfollow-folls-user'
import {generateSkeleton} from '../../../utils/skeleton-utils'

const initialParams = {
    limit: 5,
    offset: 0
}
const skeleton = generateSkeleton(5)
export const FollowingsList = ({loadMore}) => {
    const {t} = useTranslation()
    const {username} = useParams()
    const {$profiles: {currentProfile}} = useStore($accountModel)
    const {handleUnfollow} = useUnfollowFollsUser('followings')
    const {$userSubsMy: {data, result, loading, forceLoading}} = useStore($userModel)
    const [search, setSearch] = useState('')
    
    const handleSubmit = (e) => {
        e.preventDefault()
        if (search.trim().length > 2) {
            const data = {
                clear: true,
                username: username,
                params: {
                    ...initialParams,
                    search: search
                }
            }
            userSubsMyMount(data)
        }
    }
    
    
    return (
        <FollsListWrapper>
            <InfiniteScroll
                next={loadMore}
                dataLength={result?.nextOffset || 20}
                hasMore={!loading && !!result?.next}
                loader={<>...loading</>}
                style={{overflow: 'hidden'}}
            >
                <Row gutter={[0, 12]}>
                    <Col span={24}>
                        <AccountSearchInput
                            search={search}
                            setSearch={setSearch}
                            handleSubmit={handleSubmit}
                        />
                    </Col>
                    {
                        forceLoading === 2
                            ? <>
                                {
                                    data && data.map((item, idx) => (
                                        <Col
                                            span={24}
                                            key={`${idx + 1}`}
                                        >
                                            <Row justify='space-between' align='middle' wrap={false}>
                                                <Col flex={1}>
                                                    <ShortCard
                                                        imgSize={48}
                                                        imgUrl={!item.to_org ? item.to_user?.avatar : item.to_org?.logo}
                                                        name={!item.to_org ? item.to_user?.full_name : item.to_org?.name}
                                                        text={!item.to_org ? item.to_user?.main_cat.name : item.to_org?.category.name}
                                                    />
                                                </Col>
                                                {
                                                    !!currentProfile && currentProfile.slug_name === username && (
                                                        <Col onClick={() => handleUnfollow(item)}>
                                                            <Button>
                                                                {
                                                                    !item.to_org
                                                                        ? item.to_user?.subs?.subscribed
                                                                            ? t('unfollow')
                                                                            : t('follow')
                                                                        : item.to_org?.subs?.subscribed
                                                                            ? t('unfollow')
                                                                            : t('follow')
                                                                }
                                                            </Button>
                                                        </Col>
                                                    )
                                                }
                                            </Row>
                                        </Col>
                                    ))
                                }
                            </>
                            : <>
                                {
                                    skeleton.map((item, idx) => (
                                        <Col
                                            span={24}
                                            key={`${idx + 1}`}
                                        >
                                            <ShortCardSkeleton size={48}/>
                                        </Col>
                                    ))
                                }
                            </>
                    }
                </Row>
            </InfiniteScroll>
        </FollsListWrapper>
    )
}