import React, {Fragment, useCallback, useState} from 'react'
import {useStore} from 'effector-react'
import {$appModel} from '../../Models/app'
import {useLocation} from 'react-router-dom'
import {INFO_MAT} from '../../Constants/app'
import {useChatCommon} from '../../Hooks/chat'
import {IconBox} from '../../UIComponents/GlobalStyles'
import {$accountModel} from '../../Models/account-model'
import {bottomNavbarWithoutToken, bottomNavbarWithToken} from '../../data'
import {BottomNavbarCounter, BottomNavbarItem, BottomNavWrapper, NavLinkItem, NavLinkWrapper} from './style'
import {OverlayAuth} from '../../UIComponents/OverlayAuth'
import {OverlaySettings} from '../Overlay'


export const BottomNavBar = () => {
    const {pathname} = useLocation()
    const {getChatList} = useChatCommon()
    const [auth, setAuth] = useState(false)
    const {$profiles: {currentProfile}} = useStore($accountModel)
    const {$app: {token}, $socketCounters, $device} = useStore($appModel)
    
    const generateCustomPath = (id) => {
        const customPath = currentProfile && `${currentProfile.url}`
        return id.indexOf('profile') !== -1 && customPath
    }
    
    const generateAction = (id) => {
        switch (id) {
            case 'chat':
                return getChatList
            default:
                return false
        }
    }
    
    const getActive = useCallback((id) => {
        if (id === '/profile') {
            if (currentProfile) {
                return pathname.indexOf(currentProfile.slug_name) !== -1
            }
        } else {
            return pathname === id
        }
    }, [currentProfile, pathname])
    
    
    return (
        <>
            <OverlaySettings
                openSettings={auth}
                onClose={() => setAuth(false)}
                content={<OverlayAuth
                    auth={auth}
                    setAuth={setAuth}
                    onClose={() => setAuth(false)}
                />}
            />
            <BottomNavWrapper
                borderBottom
                style={{display: $device && $device === INFO_MAT && 'none'}}
            >
                <NavLinkWrapper>
                    {
                        $device && $device !== INFO_MAT ? (
                            token && currentProfile ? (
                                bottomNavbarWithToken.map((item) => {
                                    const Icon = item.icon
                                    return (
                                        <Fragment key={item.icon}>
                                            <NavLinkItem
                                                isActive={() => getActive(`${item.id === 'tape' ? '/' : `/${item.id}`}`)}
                                                onClick={() => item.onClick(generateAction(item.id))}
                                                to={item.generatePath(item.path, generateCustomPath(item.id))}
                                            >
                                                <IconBox>
                                                    <Icon/>
                                                    {
                                                        item.socketKey && !!$socketCounters[item.socketKey] && (
                                                            <BottomNavbarCounter>
                                                                {$socketCounters[item.socketKey]}
                                                            </BottomNavbarCounter>
                                                        )
                                                    }
                                                </IconBox>
                                            </NavLinkItem>
                                        </Fragment>
                                    )
                                })
                            ) : (
                                <>
                                    {
                                        bottomNavbarWithoutToken.map((item, idx) => {
                                            const Icon = item.icon
                                            return (
                                                <Fragment key={`${idx + 1}`}>
                                                    {
                                                        item.path === '/sign-in'
                                                            ? <BottomNavbarItem onClick={() => setAuth(true)}>
                                                                <Icon/>
                                                            </BottomNavbarItem>
                                                            : (<NavLinkItem
                                                                    isActive={() => getActive(`${item.id === 'tape' ? '/' : `/${item.id}`}`)}
                                                                    onClick={() => item.onClick(generateAction(item.id))}
                                                                    to={item.generatePath(item.path, generateCustomPath(item.id))}
                                                                >
                                                                    <Icon/>
                                                                </NavLinkItem>
                                                            )
                                                    }
                                                </Fragment>
                                            )
                                        })
                                    }
                                </>
                            )
                        ) : ''
                    }
                </NavLinkWrapper>
            </BottomNavWrapper>
        </>
    )
}