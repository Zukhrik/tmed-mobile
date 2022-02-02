import React from 'react'
import {GridSvg} from '../../../Icons/Grid'
import {useTranslation} from 'react-i18next'
import {PeopleSvg} from '../../../Icons/People'
import {PersonSvg} from '../../../Icons/Person'
import {Text} from '../../../UIComponents/Typography/Text'
import {IconBox} from '../../../UIComponents/GlobalStyles'
import {LinkWrapper, PopUpButtonsWrapper, PopUpInner, PopUpWrapper} from '../style'
import {OfferingSvg} from '../../../Icons/Offering'

export const PopUpContainer = () => {
    const {t} = useTranslation()
    return (
        <PopUpWrapper>
            <PopUpInner>
                <PopUpButtonsWrapper>
                    <LinkWrapper>
                        <Text>{t('add_a_specialist_section')}</Text>
                        <IconBox><PeopleSvg/></IconBox>
                    </LinkWrapper>
                    <LinkWrapper>
                        <Text>{t('add_specialist')}</Text>
                        <IconBox><PersonSvg/></IconBox>
                    </LinkWrapper>
                    <LinkWrapper>
                        <Text>{t('add_suggestions_section')}</Text>
                        <IconBox><GridSvg/></IconBox>
                    </LinkWrapper>
                    <LinkWrapper>
                        <Text>Добавить предложение</Text>
                        <IconBox><OfferingSvg/></IconBox>
                    </LinkWrapper>
                </PopUpButtonsWrapper>
            </PopUpInner>
        </PopUpWrapper>
    )
}