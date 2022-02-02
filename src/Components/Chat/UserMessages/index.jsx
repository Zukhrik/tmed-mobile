import React from 'react'
import {MessagesRoot} from '../style'
import {MessagesHeader} from '../MessagesHeader'
import {useStore} from 'effector-react'
import {$chatModel} from '../../../Models/chat-model'
import {useChatAction, useChatInput, useUserMessages} from '../../../Hooks/chat'
import {useParams} from 'react-router-dom'
import {useUserOnline} from '../../../Hooks/user/use-user-online'
import {MessagesList} from '../MessagesList'
import {MessageInput} from '../MessageInput'
import {PopoverUI} from '../../../UIComponents/Popover'
import {MessageAction} from '../MessageAction'
import {Modal} from '../../../UIComponents/Modal'
import {MessageSendFile} from '../MessageSendFile'

export const UserMessages = () => {
    const {partner_slug} = useParams()
    const {onlineText} = useUserOnline({username: partner_slug})
    const {$userMessages: {partner, typing, messages}, $temporaryMessage: tmpMsg} = useStore($chatModel)
    const {
        uploadRef,
        inputRef,
        formik,
        inputWrapperRef,
        iosHeight,
        handleFocus,
        setModalIsOpen,
        modalIsOpen,
        handleCancelModal,
        getTitle,
        handleGetFile
    } = useChatInput({partner_slug})
    const {loadMore} = useUserMessages()
    const {
        msgInfo,
        anchorEl,
        handleCopy,
        handleEdit,
        handleReply,
        showDelMenu,
        handleRemove,
        handleMsgClick,
        handleClosePopup,
        handleCancelEditAndReply,
    } = useChatAction({formik, partner_slug, inputRef})

    const partnerData = partner[partner_slug] || {
        avatar: undefined,
        full_name: undefined,
        is_official: undefined
    }

    const actionHeight = tmpMsg ? 48 : 0
    const height = inputWrapperRef.current
        ? inputWrapperRef.current.clientHeight + actionHeight + iosHeight
        : 60 + iosHeight + actionHeight

    return (
        <>
            <Modal
                centered
                title={getTitle()}
                modalIsOpen={modalIsOpen}
                setModalIsOpen={setModalIsOpen}
                onCancel={handleCancelModal}
                component={(
                    <MessageSendFile
                        rType='user'
                        id={partner_slug}
                        formik={formik}
                        onClose={() => setModalIsOpen(false)}
                    />
                )}
                width='80%'
            />
            <PopoverUI
                anchorEl={anchorEl ? anchorEl.el : null}
                onClose={handleClosePopup}
                left={anchorEl && !anchorEl.me}
                component={<MessageAction
                    me={anchorEl && anchorEl.me}
                    showDelMenu={showDelMenu}
                    actions={{
                        handleCopy,
                        handleEdit,
                        handleReply,
                        handleRemove
                    }}/>}
            />
            <MessagesRoot>
                <MessagesHeader
                    avatar={partnerData.avatar}
                    name={partnerData.full_name}
                    isOfficial={partnerData.is_official}
                    text={typing[partner_slug] || onlineText || ''}
                />
                <MessagesList
                    loadMore={loadMore}
                    handleMsgClick={handleMsgClick}
                    popupShowed={msgInfo}
                    data={messages[partner_slug] || []}
                    height={height}
                />
                <MessageInput
                    formik={formik}
                    inputRef={inputRef}
                    uploadRef={uploadRef}
                    handleFocus={handleFocus}
                    handleGetFile={handleGetFile}
                    inputWrapperRef={inputWrapperRef}
                    handleCancelEditAndReply={handleCancelEditAndReply}
                />
            </MessagesRoot>
        </>
    )
}