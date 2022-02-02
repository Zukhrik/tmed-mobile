import React from 'react';
import {useStore} from 'effector-react';
import {useTranslation} from 'react-i18next';
import {UserActivationWrapper} from '../style';
import {IconBox} from '../../../UIComponents/GlobalStyles';
import {Text} from '../../../UIComponents/Typography/Text';
import {$accountModel} from '../../../Models/account-model';
import {ActivateWarning} from '../ActivateWarning';
import {useHistory} from 'react-router-dom';
import {URL_KEYS, URL_VALUES} from '../../../Constants';

export const NotVerifyWarning = () => {
    const {$profiles: {currentProfile}} = useStore($accountModel)
    const {push} = useHistory()
    const {t} = useTranslation()

    const getUserStatus = (status) => {
        switch (status) {
            case 0:
            case 1:
            case 2:
                return <ActivateWarning/>
            case 3:
                return (
                    <UserActivationWrapper>
                        <IconBox>
                            <Text level={5}>{t('data_on_moderation')}</Text>
                        </IconBox>
                    </UserActivationWrapper>
                )
            case -1:
            case -2:
            case -3:
                return (
                    <UserActivationWrapper>
                        <IconBox onClick={() => push(`/settings?${URL_KEYS.VERIFICATION}=${URL_VALUES.STEP}`)}>
                            <Text level={5}>{t('refusal_of_moderation')}</Text>
                        </IconBox>
                    </UserActivationWrapper>
                )
            default:
                return <></>
        }
    }


    return (
        <>
            {currentProfile && getUserStatus(currentProfile.status)}
        </>
    )
}