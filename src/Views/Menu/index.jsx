import React from 'react'
import Cookies from 'js-cookie'
import {useStore} from 'effector-react'
import {useHistory} from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import {INFO_MAT} from '../../Constants/app'
import {useProfileMenu} from '../../Hooks/app'
import {UserActionLinks} from './UserActionLinks'
import {$appModel, tokenMount} from '../../Models/app'
import {Text} from '../../UIComponents/Typography/Text'
import {UserAvatarSwitching} from './UserAvatarSwitching'
import {getCurrentAccount} from '../../Models/account-model'
import {Container, RootContent} from '../../UIComponents/GlobalStyles'
import {LogOutButtonWrapper, MenuWrapper, UserInfoWrapper} from './style'
import {resetOrderCartList, resetOrgOrderCart} from '../../Models/order-model'

export const Menu = () => {
    const {push} = useHistory()
    const {t} = useTranslation()
    const {$device} = useStore($appModel)
    const {changeAccount} = useProfileMenu()
    
    const handleLogOut = () => {
        Cookies.remove('token')
        Cookies.remove('users')
        Cookies.remove('refresh-token')
        getCurrentAccount()
        localStorage.removeItem('currentProfile')
        tokenMount(null)
        push($device !== INFO_MAT ? '/' : '/search')
        resetOrgOrderCart()
        resetOrderCartList()
    }
    
    return (
        <RootContent
            paddingBottom={$device && $device === INFO_MAT ? 'unset' : '60px'}
            paddingTop={$device && $device === INFO_MAT && '102px'}
        >
            <Container>
                <MenuWrapper>
                    <UserInfoWrapper>
                        <UserAvatarSwitching changeAccount={changeAccount}/>
                        <UserActionLinks/>
                    </UserInfoWrapper>
                </MenuWrapper>
            </Container>
            <LogOutButtonWrapper onClick={handleLogOut}>
                <Text>{t('log_out')}</Text>
            </LogOutButtonWrapper>
        </RootContent>
    )
}