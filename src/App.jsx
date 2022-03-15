import React, {useEffect} from 'react'
import {Root} from './Root'
import {useStore} from 'effector-react'
import {Records} from './Views/Records'
import {useTranslation} from 'react-i18next'
import {SignInPage, SignUpPage} from './Views/Auth'
import {BottomNavBar} from './Components/BottomNavBar'
import {accountInfoMount} from './Models/account-model'
import {$appModel, detectLocationMount} from './Models/app'
import {Route, Switch, useLocation} from 'react-router-dom'
import {useAppDb, useIsMobile} from './Hooks/app'
import {QueryClient, QueryClientProvider} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false
        }
    }
})


export const App = () => {
    const {pathname} = useLocation()
    
    const generateBottomNavbar = (
        pathname.indexOf('sign-in') === -1 &&
        pathname.indexOf('sign-up') === -1 &&
        pathname.match(/([^/]*)\/[^/]*$/)[1] !== 'offerings' &&
        pathname.match(/([^/]*)\/[^/]*$/)[1] !== 'unregistered' &&
        pathname.match(/([^/]*)\/[^/]*$/)[1] !== 'checkout'
    )
    
    useAppDb()
    // useChatWs()
    // useCommonWs()
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
        <QueryClientProvider client={queryClient}>
            <Switch>
                <Route exact path='/sign-in' component={SignInPage}/>
                <Route exact path='/sign-up' component={SignUpPage}/>
                <Route path='/records' component={Records}/>
                <Route path='/' component={Root}/>
            </Switch>
            {generateBottomNavbar && <BottomNavBar/>}
            <ReactQueryDevtools position='bottom-left'/>
        </QueryClientProvider>
    )
}