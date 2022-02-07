import React from 'react'
import {Route, Switch} from 'react-router-dom'
import {Account} from './account'
import {AccountInformationPage} from './account-information-page'

export const AccountPage = () => {
    return (
        <Switch>
            <Route path='/@:username/about_me' component={AccountInformationPage}/>
            <Route path='/@:username/records' component={() => <>account records</>}/>
            <Route path='/@:username' component={Account}/>
        </Switch>
    )
}