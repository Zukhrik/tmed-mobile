import React from 'react'
import {Route, Switch} from 'react-router-dom'
import {PrivateRoute} from '../../../Routes'
import {UnregisteredAccountPage} from './unregistered-account-page'
import {RecordDetail} from './record-detail'
import {RecordsMainPage} from './records-main-page'
import {OrderRecordsPage} from './order-records-page'

export const Records = () => {
    
    return (
        <Switch>
            <PrivateRoute path='/records/order_records' component={OrderRecordsPage}/>
            <PrivateRoute path='/records/detail/:order_id' component={RecordDetail}/>
            <Route path='/records/unregistered/:organization' component={UnregisteredAccountPage}/>
            <PrivateRoute path='/records' component={RecordsMainPage}/>
        </Switch>
    )
}