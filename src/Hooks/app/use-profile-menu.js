import {useCallback} from 'react'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'
import {useHistory} from 'react-router-dom'
import account from '../../Service/account'
import {tokenMount} from '../../Models/app'
import {PROFILE_TYPE} from '../../Constants'
import {getCurrentAccount} from '../../Models/account-model'
import {showMessage} from '../../UIComponents/MessageNotification'

export function useProfileMenu() {
    const {push} = useHistory()
    const tokens = Cookies.get('users') && JSON.parse(Cookies.get('users'))
    
    const changeOrgProfile = useCallback((item) => {
        getCurrentAccount({slug_name: item.slug_name, type: PROFILE_TYPE.ORGANIZATION})
        push(`/${item.slug_name}/offerings`)
    }, [push])
    
    const changeUserProfile = useCallback((username) => {
        if (tokens && tokens[username]) {
            account.refreshToken({refresh: tokens[username].refresh})
                .then(response => {
                    const data = response.data
                    if (tokens) {
                        tokens[jwtDecode(data.access).username] = {
                            access: data.access,
                            refresh: data.refresh
                        }
                        
                    }
                    Cookies.set('users', JSON.stringify(tokens))
                    Cookies.set('token', data.access)
                    Cookies.set('refresh-token', data.refresh)
                    tokenMount(data.access)
                    getCurrentAccount({slug_name: username, type: PROFILE_TYPE.USER})
                    // if (!pathname.includes('create-organization') || !pathname.includes('sign-in')) {
                    //     push(`/@${username}/tape`)
                    // }
                    
                    // if (pathname.includes('sign-in')) {
                    //     push('/')
                    // }
                    
                    
                })
                .catch(() => {
                    push('/sign-in')
                })
        } else {
            push({
                pathname: '/sign-in',
                state: {username}
            })
        }
    }, [push, tokens])
    
    const changeAccount = useCallback((username, messageText = null, redirect = false) => {
        if (!messageText) {
            changeUserProfile(username)
        } else {
            showMessage(messageText, 'danger')
        }
    }, [changeUserProfile])
    
    const handleExit = () => {
        Cookies.remove('token')
        Cookies.remove('refresh-token')
        Cookies.remove('users')
        getCurrentAccount(null)
        tokenMount(null)
    }
    return {changeAccount, changeOrgProfile, handleExit}
    
}