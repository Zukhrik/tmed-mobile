import React from 'react'
import {UserTape} from '../UserTape'
import {Route, Switch} from 'react-router-dom'
import {NoOfferingSvg} from '../../../Icons/NoOffering'
import {EmptyContainerWrapper} from '../../../UIComponents/GlobalStyles'
import {AccountOverview} from '../AccountOverview'

export const UserPageBody = () => {
    
    return (
        <Switch>
            <Route
                path={`/@:username/offerings`}
                component={() =>
                    <EmptyContainerWrapper>
                        <NoOfferingSvg/>
                    </EmptyContainerWrapper>}
            />
            <Route
                path={'/@:username/tape'}
                component={UserTape}
            />
            <Route path='/@:username/overview' component={AccountOverview} />
        </Switch>
    )
}