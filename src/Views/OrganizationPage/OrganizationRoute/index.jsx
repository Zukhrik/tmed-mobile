import React from 'react'
import {Route, Switch} from 'react-router-dom'
import {OfferingsList} from '../OfferingsList'

export const OrganizationRoute = () => {
    
    return (
        <Switch>
            <Route path='/:organization/offerings' component={OfferingsList}/>
        </Switch>
    )
}