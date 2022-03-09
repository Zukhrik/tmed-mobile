import React from 'react';
import {useTranslation} from 'react-i18next';
import {Button} from '../../../UIComponents/Button';
import {PopUpInfo, PopUpInfoLi, PopUpInfoP, PopUpInfoUl, VerifyPopUpInner} from '../style';
import {useHistory} from 'react-router-dom';
import {URL_KEYS} from '../../../Constants';

export const ActivatePopUp = () => {
    const {t} = useTranslation()
    const history = useHistory()

    return (
        <VerifyPopUpInner>
            <PopUpInfo>
                <PopUpInfoP>{t('verification_sentence')}</PopUpInfoP>
                <PopUpInfoUl>
                    {t('you_will_have_access_to')}
                    <PopUpInfoLi>{t('1_publishing_content')}</PopUpInfoLi>
                    <PopUpInfoLi>{t('2_purchase_offers')}</PopUpInfoLi>
                    <PopUpInfoLi>{t('3_comments')}</PopUpInfoLi>
                    <PopUpInfoLi>{t('4_subscriptions')}</PopUpInfoLi>
                    <PopUpInfoLi>{t('5_post_management')}</PopUpInfoLi>
                </PopUpInfoUl>
                <PopUpInfoP>{t('important_without_moderation_sentence')}</PopUpInfoP>
            </PopUpInfo>
            <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                <Button variant='primary'>{t('i_do_not_want')}</Button>
                <Button
                    onClick={() => history.push(`/settings?${URL_KEYS.VERIFICATION_STEP}=1`)}
                    variant='primary'
                >
                    {t('try')}
                </Button>
            </div>
        </VerifyPopUpInner>
    )
}