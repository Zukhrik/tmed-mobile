import React from 'react'
import {useStore} from 'effector-react'
import {$appModel} from '../../../Models/app'
import {$accountModel} from '../../../Models/account-model'
import {useGoBack} from '../../../Hooks/app'
import {Container, RootContent} from '../../../UIComponents/GlobalStyles'
import {FixedHeader} from '../../../Components/FixedHeader'
import {Switch} from 'react-router-dom'
import {PrivateRoute} from '../../../Routes'
import {Approved, Awaiting, Canceled, Finished, RecordsFixedHeader, Unregistered} from '../organisms'

export const RecordsMainPage = () => {
    const {$app: {saveURL}} = useStore($appModel)
    const {$profiles: {currentProfile}} = useStore($accountModel)
    const {goBack} = useGoBack({pathname: saveURL ? saveURL : `/@${currentProfile && currentProfile.slug_name}`})
    
    return (
        <RootContent
            height='100vh'
            paddingTop={100}
        >
            <FixedHeader
                height='auto'
                component={<RecordsFixedHeader goBack={goBack}/>}
            />
            <Container>
                <Switch>
                    <PrivateRoute path='/records/approved' component={Approved}/>
                    <PrivateRoute path='/records/awaiting' component={Awaiting}/>
                    <PrivateRoute path='/records/canceled' component={Canceled}/>
                    <PrivateRoute path='/records/finished' component={Finished}/>
                    <PrivateRoute path='/records/unregistered' component={Unregistered}/>
                </Switch>
            </Container>
        </RootContent>
    )
}