import React from 'react'
import {useStore} from 'effector-react'
import {useTranslation} from 'react-i18next'
import {useGoBack} from '../../../Hooks/app'
import {$appModel} from '../../../Models/app'
import {useRecommendUsers} from '../../../Hooks/user'
import {FixedHeader} from '../../../Components/FixedHeader'
import {Container, RootContent} from '../../../UIComponents/GlobalStyles'
import {PeopleList} from '../organisms'

export const RecommendUsers = () => {
    const {loadMore} = useRecommendUsers()
    const {$app: {saveURL}} = useStore($appModel)
    const {t} = useTranslation()
    const {goBack} = useGoBack({pathname: saveURL ? saveURL : '/'})
    
    return (
        <RootContent
            height='100vh'
            paddingTop='62px'
        >
            <FixedHeader
                goBack={goBack}
                title={t('recommend_users')}
            />
            <Container>
                <PeopleList loadMore={loadMore}/>
            </Container>
        </RootContent>
    )
}