import React from 'react'
import {useStore} from 'effector-react'
import {$appModel} from '../../../Models/app'
import {$accountModel} from '../../../Models/account-model'
import {useGoBack} from '../../../Hooks/app'
import {RootContent} from '../../../UIComponents/GlobalStyles'
import {FixedHeader} from '../../../Components/FixedHeader'
import {Switch} from 'react-router-dom'
import {PrivateRoute} from '../../../Routes'
import {MyOrders, MyRecords, RecordsFixedHeader} from '../organisms'

export const RecordsMainPage = () => {
    const {$app: {saveURL}} = useStore($appModel)
    const {$profiles: {currentProfile}} = useStore($accountModel)
    const {goBack} = useGoBack({pathname: saveURL ? saveURL : `/@${currentProfile && currentProfile.slug_name}`})
    
    return (
        <RootContent
            height='100vh'
            paddingTop={84}
        >
            <FixedHeader
                height='auto'
                component={<RecordsFixedHeader goBack={goBack}/>}
            />
            <Switch>
                <PrivateRoute path='/records/my_orders' component={MyOrders}/>
                <PrivateRoute p='/records/my_records' component={MyRecords}/>
            </Switch>
        </RootContent>
    )
}