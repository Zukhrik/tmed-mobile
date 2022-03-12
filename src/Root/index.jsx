import React from 'react'
import {Home} from '../Views/Home'
import {AccountPage} from '../Views/Account'
import {Checkout} from '../Views/Checkout'
import {Route, Switch} from 'react-router-dom'
import PrivateRoute from '../Routes/PrivateRoute'
import {OfferingPage} from '../Views/OfferingPage'
import {RootContent} from '../UIComponents/GlobalStyles'
import {OrganizationPage} from '../Views/Organization'

export const Root = () => {
    return (
        <RootContent>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/@:username' component={AccountPage}/>
                <Route path='/:organization/offerings/:offering_id' component={OfferingPage}/>
                <PrivateRoute path='/checkout/:organization' component={Checkout}/>
                <Route path='/:organization' component={OrganizationPage}/>
            </Switch>
        </RootContent>
    )
}