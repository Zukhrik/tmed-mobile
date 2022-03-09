import React, {useState} from 'react'
import {
    useChannelSchedule,
    useCurrentAnons,
    useStream,
    useStreamChatWs,
    useStreamViewerCountWs
} from '../../../Hooks/stream'
import {useStore} from 'effector-react'
import {useParams} from 'react-router-dom'
import FastAuth from '../../Auth/FastAuth'
import {useGoBack} from '../../../Hooks/app'
import {StreamPageSkeleton} from '../templates'
import {URL_KEYS, URL_VALUES} from '../../../Constants'
import {ChatComponent, ScheduleList} from '../organisms'
import {$streamModel} from '../../../Models/stream-model'
import {AuthModal} from '../../../UIComponents/AuthModal'
import {StreamPageComponent} from './stream-page-component'
import {useStreamChannelChat} from '../../../Hooks/stream/use-stream-channel-chat'


export const StreamPage = () => {
    useStream()
    useStreamChatWs()
    useStreamViewerCountWs()
    const {slug_name} = useParams()
    const {loadMore} = useChannelSchedule()
    const {currentStream} = useCurrentAnons()
    const {loadMore: chatLoadMore} = useStreamChannelChat()
    const [openChat, setOpenChat] = useState(false)
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const {goBack} = useGoBack({pathname: '/search', search: `${URL_KEYS.SEARCH_TYPE}=${URL_VALUES.STREAM}`})
    const {
        $stream: {data, forceLoading: streamForceLoading},
        $channelStreamScheduleList: {forceLoading}
    } = useStore($streamModel)
    
    
    return (
        <>
            <AuthModal
                title={false}
                modalIsOpen={modalIsOpen}
                onCancel={() => setModalIsOpen(false)}
                content={<FastAuth onClose={() => setModalIsOpen(false)}/>}
            />
            {
                forceLoading && streamForceLoading === 2
                    ? (
                        <>
                            {
                                data && currentStream && (
                                    <StreamPageComponent
                                        setOpenChat={setOpenChat}
                                        openChat={openChat}
                                        logoPushUrl={'/tape'}
                                        goBack={goBack}
                                        text={data?.user?.full_name}
                                        live={data.live_at}
                                        title={currentStream.title ? currentStream.title : data.channel_name}
                                        thumbnail={currentStream.image || data.logo}
                                        description={data.channel_description}
                                        videoUlr={`https://py.dwed.biz/v1.0/api/streaming/${slug_name}/live.m3u8`}
                                        logo={data.logo}
                                        viewers={data.live_watchers}
                                        name={data.channel_name}
                                        chatComponent={<ChatComponent
                                            loadMore={chatLoadMore}
                                            setModalIsOpen={setModalIsOpen}
                                            setOpenChat={setOpenChat}
                                            owner={data.user?.username}
                                        />}
                                        scheduleCard={<ScheduleList loadMore={loadMore}/>}
                                    />
                                )
                            }
                        </>
                    ) : <StreamPageSkeleton/>
            }
        </>
    )
}