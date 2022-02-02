import React, {useCallback} from 'react'
import {PostCard} from '../../Post'
import {useChangeDateLang} from '../../../Hooks/app'
import {useHistory, useLocation} from 'react-router-dom'
import {saveURLMount} from '../../../Models/app'

export const TapePost = ({data}) => {
    const {push} = useHistory()
    const {changeDateLang} = useChangeDateLang()
    const {pathname} = useLocation()
    
    const getPostHeader = useCallback(() => {
        let tmp = {}
        if (data.stream_schedule) {
            tmp = {
                isOfficial: undefined,
                anons: data.stream_schedule.date,
                imgUrl: data.stream_schedule.stream.logo,
                name: data.stream_schedule.stream.channel_name
            }
        } else {
            tmp = {
                name: data.author.name,
                imgUrl: data.author.avatar,
                isOfficial: data.author.is_official
            }
        }
        
        return tmp
    }, [data])
    
    const handlePush = (item) => {
        if (item.author.type === 'user') {
            push(`/@${data.author.slug_name}/tape`) && saveURLMount(pathname)
        } else {
            push(`/${data.author.slug_name}/offerings`) && saveURLMount(pathname)
        }
    }
    
    return (
        <>
            {
                data && Object.values(data).length > 0 && (
                    <PostCard
                        data={data}
                        author={data.author}
                        date={changeDateLang(data.date)}
                        postHeaderInfo={getPostHeader()}
                        handlePush={() => handlePush(data)}
                        postOwner={data.repost || false}
                        newAvatar={data.action && data.action.key === 'new_avatar'}
                        newDuty={data.action && data.action.key === 'new_duty' && data.action.data.new_specialism}
                    />
                )
            }
        </>
    )
}