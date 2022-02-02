import React from 'react'
import {Route, Switch} from 'react-router-dom'
import {OfferingsList} from '../OfferingsList'
import {OrganizationTape} from '../OrganizationTape'

export const OrganizationRoute = () => {
    
    return (
        <Switch>
            <Route path='/:organization/offerings' component={OfferingsList}/>
            <Route path='/:organization/tape' component={OrganizationTape}/>
        </Switch>
    )
}