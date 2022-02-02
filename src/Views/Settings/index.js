import React from 'react'
import {Route, Switch} from 'react-router-dom'
import {
    Account,
    Coupons,
    FollowInvite,
    Language,
    Notification,
    PaymentMethod,
    PrivacySecurity,
    SettingsPage
} from './pages'

export const Settings = () => {
    return (
        <Switch>
            <Route exact path='/settings' component={SettingsPage}/>
            <Route path='/settings/coupons' component={Coupons}/>
            <Route path='/settings/account' component={Account}/>
            <Route path='/settings/language' component={Language}/>
            <Route path='/settings/notification' component={Notification}/>
            <Route path='/settings/follow_invite' component={FollowInvite}/>
            <Route path='/settings/payment_method' component={PaymentMethod}/>
            <Route path='/settings/privacy_security' component={PrivacySecurity}/>
        </Switch>
    )
}