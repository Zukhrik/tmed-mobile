import React from 'react'
import {useStore} from 'effector-react'
import {$catsModel} from '../../../Models/cats-model'
import {AllCatsButton, CategoriesItem, CategoriesWrapper} from '../atoms'
import {IconBox} from '../../../UIComponents/GlobalStyles'
import {ArrowIosBottomSvg} from '../../../Icons/Arrow'
import {useTranslation} from 'react-i18next'

export const OfferingCategories = ({handleClick, setOpenFilter, openFilter}) => {
    const {$catsOfferCats: {data}} = useStore($catsModel)
    const {t} = useTranslation()
    
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