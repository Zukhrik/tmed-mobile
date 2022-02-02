import React from 'react'
import {useStore} from 'effector-react'
import {$appModel} from '../../../Models/app'
import {$accountModel} from '../../../Models/account-model'
import {useGoBack} from '../../../Hooks/app'
import {Container, RootContent} from '../../../UIComponents/GlobalStyles'
import {INFO_MAT} from '../../../Constants/app'
import {FixedHeader} from '../../../Components/FixedHeader'
import {Switch} from 'react-router-dom'
import {PrivateRoute} from '../../../Routes'
import {Approved, Awaiting, Canceled, Finished, RecordsFixedHeader, Unregistered} from '../organisms'

export const RecordsMainPage = () => {
    const {$device, $app: {saveURL}} = useStore($appModel)
    const {$profiles: {currentProfile}} = useStore($accountModel)
    const {goBack} = useGoBack({pathname: saveURL ? saveURL : `/@${currentProfile && currentProfile.slug_name}/tape`})
    
    return (
        <RootContent
            height='100vh'
            paddingTop={$device && $device === INFO_MAT ? '100px' : '101px'}
        >
            <FixedHeader
                height='auto'
                component={<RecordsFixedHeader goBack={goBack}/>}
            />
            <Container>
                <Switch>
                    <PrivateRoute path='/records/unregistered' component={Unregistered}/>
                    <PrivateRoute path='/records/approved' component={Approved}/>
                    <PrivateRoute path='/records/awaiting' component={Awaiting}/>
                    <PrivateRoute path='/records/canceled' component={Canceled}/>
                    <PrivateRoute path='/records/finished' component={Finished}/>
                </Switch>
            </Container>
        </RootContent>
    )
}