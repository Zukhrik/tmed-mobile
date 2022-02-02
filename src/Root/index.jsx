import React from 'react'
import {Home} from '../Views/Home'
import {Account} from '../Views/Account'
import {Checkout} from '../Views/Checkout'
import {Route, Switch} from 'react-router-dom'
import PrivateRoute from '../Routes/PrivateRoute'
import {OfferingPage} from '../Views/OfferingPage'
import {RootContent} from '../UIComponents/GlobalStyles'
import {OrganizationPage} from '../Views/OrganizationPage'

export const Root = () => {
    return (
        <RootContent>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/@:username' component={Account}/>
                <Route path='/:organization/offerings/:offering_id' component={OfferingPage}/>
                <PrivateRoute path='/checkout/:organization' component={Checkout}/>
                <Route path='/:organization' component={OrganizationPage}/>
            </Switch>
        </RootContent>
    )
}