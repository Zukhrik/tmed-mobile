import React from 'react'
import {useStore} from 'effector-react'
import {useParams} from 'react-router-dom'
import {$appModel} from '../../../Models/app'
import {INFO_MAT} from '../../../Constants/app'
import {AuthorPageWireframeWrapper} from './style'
import {MobileViewWireframe} from './MobileViewWireframe'
import {FixedHeader} from '../../../Components/FixedHeader'
import {InfoMatViewWireframe} from './InfoMatViewWireframe'
import {$accountModel} from '../../../Models/account-model'
import {AccountFixedHeaderComponent} from './AccountFixedHeaderComponent'
import {InfoInFixedHeader} from '../../../Components/AccountComponents'

export const AuthorPageWireframe = (
    {
        logo,
        cart,
        menu,
        create,
        title,
        goBack,
        cartCount,
        menuClick,
        cartClick,
        logoClick,
        specPanel,
        pageHeader,
        pageContent,
        filterPanel,
        handleCreate,
        offeringGroup,
        orgGroupPanel,
        handleCartClick
    }
) => {
    const {username} = useParams()
    const {$device} = useStore($appModel)
    const {$app: {token}} = useStore($appModel)
    const {$profiles: {currentProfile}} = useStore($accountModel)
    
    
    return (
        <AuthorPageWireframeWrapper
            paddingTop={$device && $device === INFO_MAT && token ? '' : '50px'}
        >
            {
                currentProfile && token
                    ? <FixedHeader
                        component={currentProfile?.slug_name !== username
                            ? <InfoInFixedHeader
                                title={title}
                                goBack={goBack}
                                cartCount={cartCount}
                                handleCartClick={handleCartClick}
                            />
                            : <AccountFixedHeaderComponent
                                logo={logo}
                                cart={cart}
                                menu={menu}
                                title={title}
                                create={create}
                                logoClick={logoClick}
                                cartClick={cartClick}
                                menuClick={menuClick}
                                handleCreate={handleCreate}
                            />
                        }
                    />
                    : <FixedHeader
                        hideBorder='0'
                        goBack={goBack}
                        title={title}
                    />
            }
            {
                $device && $device === INFO_MAT
                    ? <InfoMatViewWireframe
                        pageHeader={pageHeader}
                        pageContent={pageContent}
                        filterPanel={filterPanel}
                        offeringGroup={offeringGroup}
                    />
                    : <MobileViewWireframe
                        specPanel={specPanel}
                        pageHeader={pageHeader}
                        pageContent={pageContent}
                        filterPanel={filterPanel}
                        orgGroupPanel={orgGroupPanel}
                        // offeringGroup={offeringGroup}
                    />
            }
        </AuthorPageWireframeWrapper>
    )
}