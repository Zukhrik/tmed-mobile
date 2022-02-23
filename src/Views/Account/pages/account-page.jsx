import React from 'react'
import {Route, Switch} from 'react-router-dom'
import {Account} from './account'
import {AccountInformationPage} from './account-information-page'
import {AccountRecordOfferId, AccountRecords, AccountRecordsDetail} from '../organisms'
import PrivateRoute from '../../../Routes/PrivateRoute'

export const AccountPage = () => {
    return (
        <Switch>
            <PrivateRoute path='/@:username/records/:order_id/:offer_id' component={AccountRecordOfferId}/>
            <PrivateRoute path='/@:username/records/:order_id' component={AccountRecordsDetail}/>
            <PrivateRoute path='/@:username/about_me' component={AccountInformationPage}/>
            <PrivateRoute path='/@:username/records' component={AccountRecords}/>
            <Route path='/@:username' component={Account}/>
        </Switch>
    )
}