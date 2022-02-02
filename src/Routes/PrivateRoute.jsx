import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {useStore} from 'effector-react';
import {$appModel} from '../Models/app';

export default ({component: Component, ...rest}) => {
    const {$app: {token}} = useStore($appModel);

    const getComponent = (props) => {
        return token ? <Component {...props}/> : <Redirect to={'/sign-in'}/>;
    };

    return (
        <Route
            {...rest}
            render={getComponent}
        />
    );
}