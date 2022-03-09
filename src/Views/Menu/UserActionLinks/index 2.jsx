import React from 'react'
import {ProfileMenuLink} from '../style'
import {profMenuData} from '../../../data'
import {useHistory} from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import Masorny from 'react-responsive-masonry'
import {IconBox} from '../../../UIComponents/GlobalStyles'

export const UserActionLinks = () => {
    const {t} = useTranslation()
    const {push} = useHistory()
    
    return (
        <Masorny columnsCount={2} gutter='20px'>
            {
                profMenuData.map((item) => {
                    const Icon = item.icon
                    return (
                        <ProfileMenuLink
                            key={item.path}
                            variant='primary'
                            style={{height: item.height}}
                            onClick={() => push(item.path)}
                        >
                            <IconBox style={{marginBottom: item.marginBottom}}>
                                <Icon/>
                            </IconBox>
                            {t(item.name)}
                        </ProfileMenuLink>
                    )
                })
            }
        </Masorny>
    )
}