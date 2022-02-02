import {useInView} from 'react-intersection-observer'
import {useEffect} from 'react'
import {useStore} from 'effector-react'
import {$chatModel} from '../../Models/chat-model'
import {$accountModel} from '../../Models/account-model'

export function useChatIsRead({item}) {
    const {$chatSocketActions: {chatActionSendMessage}} = useStore($chatModel)
    const {$profiles: {currentProfile}} = useStore($accountModel)
    const {ref, inView, entry} = useInView({
        threshold: 0.25,
        delay: 300
    })


    useEffect(() => {
        if (inView && item && currentProfile) {
            const {target} = entry
            const id = Number(target.getAttribute('data-id'))
            const {id: message_id, sender, is_read} = item
            if (id === message_id && !is_read && sender.username !== currentProfile.slug_name) {
                const data = {action: 'read', message_id}
                if (chatActionSendMessage) {
                    chatActionSendMessage(JSON.stringify(data))
                }
            }
        }
    }, [entry, inView, item, chatActionSendMessage, currentProfile])

    return {ref}
}