import React from 'react'
import {PostCardWrapper} from './style'
import {PostHeader} from './PostHeader'
import {PostActions} from './PostActions'
import {PostContent} from './PostContent'

export const PostCard = ({postOwner, data, postHeaderInfo, newDuty, newAvatar, date, author, handlePush}) => {
    
    return (
        <PostCardWrapper>
            <PostHeader
                data={data}
                date={date}
                newDuty={newDuty}
                postOwner={postOwner}
                newAvatar={newAvatar}
                handlePush={handlePush}
                {...postHeaderInfo}
            />
            <PostContent
                data={data}
                author={author}
            />
            <PostActions data={data}/>
        </PostCardWrapper>
    )
}