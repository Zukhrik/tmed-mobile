import {useEffect} from 'react'
import {useStore} from 'effector-react'
import {useParams} from 'react-router-dom'
import {$userModel, resetUser, userMount} from '../../Models/user-model'

export function useUser() {
    const {username} = useParams()
    const {$user: {data}} = useStore($userModel)
    
    useEffect(() => {
        if (username && !data[username]) {
            userMount(username)
        }
        
        return () => {
            resetUser()
        }
    }, [username, data])
}