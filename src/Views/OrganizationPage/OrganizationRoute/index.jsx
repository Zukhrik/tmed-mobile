import React from 'react'
import {Route, Switch} from 'react-router-dom'
import {OfferingsList} from '../OfferingsList'
import {Container} from '../../../UIComponents/GlobalStyles'

export const OrganizationRoute = () => {
    
    return (
        <Switch>
            <Container>
                <Route path='/:organization/offerings' component={OfferingsList}/>
            </Container>
        </Switch>
    )
}