import React, {useEffect} from 'react'
import {Root} from './Root'
import {PrivateRoute} from './Routes'
import {useStore} from 'effector-react'
import {Settings} from './Views/Settings'
import {Records} from './Views/Records'
import {useTranslation} from 'react-i18next'
import {ScheduleIdPage, StreamPage} from './Views/StreamPage'
import {SignInPage, SignUpPage} from './Views/Auth'
import {BottomNavBar} from './Components/BottomNavBar'
import {accountInfoMount} from './Models/account-model'
import {$appModel, detectLocationMount} from './Models/app'
import {Route, Switch, useLocation} from 'react-router-dom'
import {useAppDb, useChatWs, useCommonWs, useIsMobile} from './Hooks/app'


export const App = () => {
    const {pathname} = useLocation()
    
    const generateBottomNavbar = (
        pathname.indexOf('sign-in') === -1 &&
        pathname.indexOf('sign-up') === -1 &&
        pathname.indexOf('records') === -1 &&
        pathname.match(/([^/]*)\/[^/]*$/)[1] !== 'chat' &&
        pathname.match(/([^/]*)\/[^/]*$/)[1] !== 'offerings' &&
        pathname.match(/([^/]*)\/[^/]*$/)[1] !== 'records' &&
        pathname.match(/([^/]*)\/[^/]*$/)[1] !== 'repost' &&
        pathname.match(/([^/]*)\/[^/]*$/)[1] !== 'tape' &&
        pathname.match(/([^/]*)\/[^/]*$/)[1] !== 'unregistered' &&
        pathname.match(/([^/]*)\/[^/]*$/)[1] !== 'checkout' &&
        pathname.match(/([^/]*)\/[^/]*$/)[1] !== 'stream'
    )
    
    useAppDb()
    useChatWs()
    useCommonWs()
    useIsMobile()
    
    const {i18n} = useTranslation()
    const {$app: {token}, $appLang: lang} = useStore($appModel)
    
    
    useEffect(() => {
        if (token) {
            accountInfoMount()
        } else {
            detectLocationMount()
        }
    }, [token])
    
    
    useEffect(() => {
        if (lang) {
            i18n.changeLanguage(lang)
        }
    }, [i18n, lang])
    
    
    return (
        <>
            <Switch>
                <Route exact path='/sign-in' component={SignInPage}/>
                <Route exact path='/sign-up' component={SignUpPage}/>
                <PrivateRoute path='/settings' component={Settings}/>
                <Route path='/records' component={Records}/>
                <Route path='/stream/:slug_name/:schedule_id' component={ScheduleIdPage}/>
                <Route path='/stream/:slug_name' component={StreamPage}/>
                <Route path='/' component={Root}/>
            </Switch>
            {generateBottomNavbar && <BottomNavBar/>}
        </>
    )
}