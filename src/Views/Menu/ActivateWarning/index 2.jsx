import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ActivatePopUp} from '../ActivatePopUp';
import {UserActivationWrapper} from '../style';
import {Modal} from "../../../UIComponents/Modal";
import {Button} from '../../../UIComponents/Button';
import {IconBox} from '../../../UIComponents/GlobalStyles';
import {Text} from '../../../UIComponents/Typography/Text';
import {QuestionMarkCircleSvg} from '../../../Icons/QuestionMarkCircle';

export const ActivateWarning = () => {
    const {t} = useTranslation()
    const [modalIsOpen, setModalIsOpen] = useState(false)

    return (
        <>
            <Modal
                setModalIsOpen={setModalIsOpen}
                modalIsOpen={modalIsOpen}
                component={<ActivatePopUp />}
            />
            <UserActivationWrapper>
                <IconBox>
                    <Text>{t('not_a_verified_account! Left any day')}</Text>
                    <QuestionMarkCircleSvg/>
                </IconBox>
                <Button
                    onClick={() => setModalIsOpen(true)}
                    variant="primary"
                >
                    {t('activate')}
                </Button>
            </UserActivationWrapper>
        </>
    )
}