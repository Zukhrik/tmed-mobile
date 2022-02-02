import React, {useState} from 'react'
import {OverlaySettings} from '../../../Components/Overlay'
import {AccountSettings} from './account-settings'
import {AllScreenModal} from '../../../UIComponents/AllScreenModal'
import {CreateModalPost} from '../../../Components/Post/CreateModalPost'
import {AuthorPageWireframe} from '../../../UIComponents/Wireframe/AuthorPageWireframe'
import {PlusSquareSvg} from '../../../Icons/Plus'
import {DWEDSvg} from '../../../Icons/DWED'
import {OfferingSvg} from '../../../Icons/Offering'
import {MenuButtonSvg} from '../../../Icons/MenuButton'
import {UserPageBody, UserPageHeader} from '../../../Components/AccountComponents'
import {INFO_MAT} from '../../../Constants/app'
import {useParams} from 'react-router-dom'
import {useStore} from 'effector-react'
import {$appModel} from '../../../Models/app'
import {useUserPage} from '../../../Hooks/user/use-user-page'
import {$userModel} from '../../../Models/user-model'
import {$accountModel} from '../../../Models/account-model'
import {useUserHeaderAction} from '../../../Hooks/user'
import {useGoBack} from '../../../Hooks/app'

export const AccountPage = () => {
    const {username} = useParams()
    const {$device} = useStore($appModel)
    const {getSubscription} = useUserPage()
    const [createPost, setCreatePost] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const {$user: {data, forceLoading}} = useStore($userModel)
    const userInfo = data && data?.[username]
    const {$profiles: {currentProfile}} = useStore($accountModel)
    const {onLogoClick, onCartClick} = useUserHeaderAction(setOpenModal, openModal)
    const {goBack} = useGoBack({pathname: '/'})
    const [profiles, setProfiles] = useState(false)
    
    const handleClose = () => {
        if (profiles) {
            setProfiles(false)
        }
        setOpenModal(false)
    }
    
    return (
        <>
            <OverlaySettings
                content={<AccountSettings profiles={profiles} setProfiles={setProfiles}/>}
                openSettings={openModal}
                onClose={handleClose}
            />
            <AllScreenModal
                title='search'
                modalIsOpen={createPost}
                onCancel={() => setCreatePost(false)}
                content={<CreateModalPost setCreatePost={setCreatePost}/>}
            />
            <AuthorPageWireframe
                hideBorder
                title={
                    currentProfile
                        ? currentProfile.slug_name !== username
                            ? userInfo && `@${userInfo?.username}`
                            : ''
                        : userInfo && `@${userInfo?.username}`
                }
                create={<PlusSquareSvg/>}
                handleCreate={() => setCreatePost(true)}
                goBack={goBack}
                logo={<DWEDSvg/>}
                cart={<OfferingSvg/>}
                menu={<MenuButtonSvg/>}
                logoClick={onLogoClick}
                menuClick={() => setOpenModal(true)}
                cartClick={onCartClick}
                pageHeader={<UserPageHeader
                    subscription={$device && $device !== INFO_MAT && getSubscription()}
                    followers={userInfo && Object.values(userInfo) && userInfo?.subs?.me}
                    following={userInfo && Object.values(userInfo) && userInfo?.subs?.my}
                    forceLoading={forceLoading}
                    imgUrl={userInfo && Object.values(userInfo) && userInfo?.avatar}
                    category={userInfo && Object.values(userInfo) && userInfo?.main_cat?.name}
                    name={
                        userInfo && Object.values(userInfo) && !userInfo?.name
                            ? userInfo?.username
                            : `${userInfo?.name} ${userInfo?.lastname}`
                    }
                />}
                pageContent={<UserPageBody/>}
            />
        </>
    )
}