import React from 'react'
import {Route, Switch} from 'react-router-dom'
import {NoOfferingSvg} from '../../../Icons/NoOffering'
import {EmptyContainerWrapper} from '../../../UIComponents/GlobalStyles'

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
        </Switch>
    )
}