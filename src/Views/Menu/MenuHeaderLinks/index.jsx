import React from 'react';
import {useStore} from 'effector-react';
import {useLocation} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {URL_KEYS, URL_VALUES} from '../../../Constants';
import {HeaderLinksItem, HeaderLinksWrapper} from '../style';
import {$accountModel} from '../../../Models/account-model';

export const MenuHeaderLinks = () => {
    const location = useLocation();
    const {t} = useTranslation();
    const {$profiles: {currentProfile}} = useStore($accountModel);

    return (
        <>
            {
                currentProfile && currentProfile.status === 5 && (
                    <HeaderLinksWrapper>
                        <HeaderLinksItem
                            to={`?${URL_KEYS.MENU_TYPE}=${URL_VALUES.ACCOUNT}`}
                            isActive={() => location.search === `?${URL_KEYS.MENU_TYPE}=${URL_VALUES.ACCOUNT}`}
                        >
                            {t('account')}
                        </HeaderLinksItem>
                        <HeaderLinksItem
                            to={`?${URL_KEYS.MENU_TYPE}=${URL_VALUES.WORK}`}
                            isActive={() => location.search === `?${URL_KEYS.MENU_TYPE}=${URL_VALUES.WORK}`}
                        >
                            {t('work')}
                        </HeaderLinksItem>
                        <HeaderLinksItem
                            to={`?${URL_KEYS.MENU_TYPE}=${URL_VALUES.COMPANIES}`}
                            isActive={() => location.search === `?${URL_KEYS.MENU_TYPE}=${URL_VALUES.COMPANIES}`}
                        >
                            {t('companies')}
                        </HeaderLinksItem>
                    </HeaderLinksWrapper>
                )
            }
        </>
    );
};