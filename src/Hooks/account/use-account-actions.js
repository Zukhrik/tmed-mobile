import Cookies from 'js-cookie'
import {useCallback} from 'react'
import {useStore} from 'effector-react'
import {tokenMount} from '../../Models/app'
import {useHistory} from 'react-router-dom'
import {$accountModel, getCurrentAccount} from '../../Models/account-model'
import {resetOrderCartList, resetOrgOrderCart} from '../../Models/order-model'
import account from '../../Service/account'

export function useAccountActions(setProfiles) {
    const {push} = useHistory()
    const {$profiles: {currentProfile}} = useStore($accountModel)
    
    const handleClickItem = useCallback((e) => {
        if (e.name === 'change_account') {
            setProfiles(true)
        }
        
        if (e.name === 'settings') {
            push('/settings')
        }
        
        if (e.name === 'order_records') {
            push('/records/order_records')
        }
        
        if (e.name === 'logout') {
            Cookies.remove('token')
            Cookies.remove('users')
            Cookies.remove('refresh-token')
            getCurrentAccount()
            localStorage.removeItem('currentProfile')
            tokenMount(null)
            push('/')
            resetOrgOrderCart()
            resetOrderCartList()
        }
    }, [push, setProfiles])
    
    
    const handleClickLinkedUsers = useCallback((item) => {
        if (currentProfile.slug_name !== item.slug_name) {
            if (Cookies.get('users')) {
                let users = JSON.parse(Cookies.get('users'))
                let result = null
                
                for (let i in users) {
                    if (users.hasOwnProperty(i)) {
                        if (i === item.slug_name) {
                            result = users[i]
                            break
                        } else {
                            push('/sign-in')
                        }
                    }
                }
                
                const data = {
                    refresh: result.refresh
                }
                
                account.refreshToken(data)
                    .then(res => {
                        if (res) {
                            let users = {}
                            if (Cookies.get('users')) {
                                const oldUsers = JSON.parse(Cookies.get('users'))
                                users = oldUsers ? {...oldUsers} : {}
                            }
                            users[item.slug_name] = res.data
                            Cookies.set('users', JSON.stringify(users))
                            Cookies.set('token', res.data.access)
                            Cookies.set('refresh-token', res.data.refresh)
                            tokenMount(res.data.access)
                            getCurrentAccount()
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            } else {
                push('/sign-in')
            }
        }
    }, [currentProfile, push])
    
    return {handleClickItem, handleClickLinkedUsers}
}