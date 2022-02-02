import React from 'react'
import {useStore} from 'effector-react'
import {useTranslation} from 'react-i18next'
import {$catsModel} from '../../../Models/cats-model'
import {ArrowIosBottomSvg} from '../../../Icons/Arrow'
import {AllCatsButton, CategoriesItem, CategoriesWrapper} from '../atoms'
import {IconBox} from '../../../UIComponents/GlobalStyles'

export const OrgCategories = ({handleClick, setOpenFilter, openFilter}) => {
    const {t} = useTranslation()
    const {$catsOrgCats: {data}} = useStore($catsModel)
    
    return (
        <>
            {
                data.length > 0 && (
                    <>
                        <CategoriesWrapper>
                            {
                                data.map((item, idx) => (
                                    <CategoriesItem
                                        key={`${idx + 1}`}
                                        onClick={() => handleClick(item)}
                                    >
                                        {item.name}
                                    </CategoriesItem>
                                ))
                            }
                        </CategoriesWrapper>
                        <AllCatsButton
                            status={openFilter}
                            onClick={() => setOpenFilter(true)}
                        >
                            {t('all')}
                            <IconBox>
                                <ArrowIosBottomSvg/>
                            </IconBox>
                        </AllCatsButton>
                    </>
                )
            }
        </>
    )
}