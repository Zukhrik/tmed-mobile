import {useCallback, useEffect} from 'react'
import {idbGet} from '../../Config/db'
import {onlineUserMountFromIDB} from '../../Models/user-model'
import {useStore} from 'effector-react'
import {$appModel} from '../../Models/app'

export function useAppDb() {
    const {$app: {token}} = useStore($appModel)
    const getOnlineAccounts = useCallback(() => {
        if (token) {
            idbGet('online_accounts', 'online_accounts')
                .then((res) => {
                    if (res) {
                        const data = JSON.parse(res)
                        onlineUserMountFromIDB(data)
                    }
                })
        }
    }, [token])

    useEffect(() => {
        getOnlineAccounts()
    }, [getOnlineAccounts])

    const setStyleProperty = useCallback(() => {
        let vh = window.innerHeight * 0.01
        document.documentElement.style.setProperty('--vh', `${vh}px`)
    }, [])


    useEffect(() => {
        setStyleProperty()
        window.addEventListener('resize', setStyleProperty)

        return () => {
            window.removeEventListener('resize', setStyleProperty)
        }
    }, [setStyleProperty])
}