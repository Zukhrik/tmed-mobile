import React from 'react'
import {OverlaySignUpWrapper} from '../atoms'
import {LoginView} from './index'
import {GreetingsView} from './greetings-view'

export const OverlayAuth = ({onClose, auth, setAuth, action}) => {
    
    return (
        <OverlaySignUpWrapper>
            {
                auth
                    ? <LoginView onClose={onClose} action={action}/>
                    : <GreetingsView setAuth={setAuth}/>
            }
        </OverlaySignUpWrapper>
    )
}