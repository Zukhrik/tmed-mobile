import React, {useCallback} from 'react'
import {OfferCard} from '../../Cards'
import {CommonPost} from './CommonPost'
import {StreamPost} from './StreamPost'
import {useStore} from 'effector-react'
import {ActionPost} from './ActionPost'
import {OfferingPost} from './OfferingPost'
import {$postModel} from '../../../Models/post-model'
import {truncateString} from '../../../utils/stringUtils'
import {CardPostWrapper, HasOfferingsCardWrapper} from '../style'

export const PostContent = ({data, author}) => {
    const {$postOfferings: {data: postData}} = useStore($postModel)
    
    const renderPostType = useCallback(() => {
        const {stream_schedule, medias, text, has_offerings, action, repost} = data
        
        if (action) {
            if (action.key === 'new_duty') {
                return <ActionPost
                    size1={170}
                    size2={130}
                    type={action.key}
                    imgUrl1={data.author.avatar}
                    imgUrl2={data.action.data.new_specialism.org.logo}
                />
            }
            
            if (action.key === 'new_avatar') {
                return <ActionPost
                    imgUrl1={data.action.data.old}
                    size1={150}
                    imgUrl2={data.action.data.new}
                    size2={170}
                    type={action.key}
                />
            }
        } else {
            
            if (stream_schedule) {
                return <StreamPost data={stream_schedule} author={author}/>
            }
            
            if (has_offerings) {
                return <OfferingPost data={data}/>
            }
            
            if (repost) {
                return <CommonPost mediaData={repost.medias} repostText={text} post={repost.text}/>
            } else {
                return <CommonPost mediaData={medias} post={text}/>
            }
            
        }
        
    }, [data, author])
    
    const offerings = data.has_offerings && postData[data.id]
    
    return (
        <CardPostWrapper>
            {renderPostType()}
            <HasOfferingsCardWrapper>
                {
                    offerings && offerings.length > 0 && offerings.map((item, idx) => (
                        <OfferCard
                            key={`${idx + 1}`}
                            imgUrl={item.offering.image}
                            offerName={truncateString(item.offering.name, 16)}
                            cost={item.offering.cost.toLocaleString('fi-Fi')}
                        />
                    ))
                }
            </HasOfferingsCardWrapper>
        </CardPostWrapper>
    )
}