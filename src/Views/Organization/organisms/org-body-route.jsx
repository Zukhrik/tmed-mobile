import React from 'react'
import {Route, Switch} from 'react-router-dom'
import {OfferingsList} from './offering-list'

export const OrgBodyRoute = () => {
    return (
        <Switch>
            <Route path='/:organization/offerings' component={OfferingsList}/>
        </Switch>
    )
}