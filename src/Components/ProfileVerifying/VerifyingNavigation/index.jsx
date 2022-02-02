import React, {Fragment} from 'react';
import {useTranslation} from 'react-i18next';
import {useHistory} from "react-router-dom";
import {
    VerifyingStepSliderCircle,
    VerifyingStepSliderItem,
    VerifyingStepSliderPoint,
    VerifyingStepSliderWrapper
} from "../style";
import {useUrlParams} from "../../../Hooks/app";
import {URL_KEYS} from "../../../Constants";
import {CheckLineSvg} from "../../../Icons/CheckMark";

export const VerifyingNavigation = ({allowToNav}) => {
    const data = [1, 2]
    const {urlData} = useUrlParams()
    const step = urlData[URL_KEYS.VERIFICATION_STEP]
    const {t} = useTranslation()
    const {location: {pathname}, push} = useHistory()

    const handleClick = (id) => {
        if (allowToNav[id] > 0) {
            push({
                pathname,
                search: `${URL_KEYS.VERIFICATION_STEP}=${id}`
            })
        }
    }

    const getDone = (id) => allowToNav && allowToNav[id] === 2

    return (
        <VerifyingStepSliderWrapper>
            {
                data.map(item => (
                    <Fragment key={item}>
                        <VerifyingStepSliderPoint
                            done={getDone(item)}
                            onClick={() => handleClick(item)}
                            type={item}
                            isActive={step && step === String(item)}
                        >
                            {
                                getDone(item)
                                    ? <CheckLineSvg/>
                                    : <VerifyingStepSliderCircle/>
                            }
                            <VerifyingStepSliderItem>
                                {t('step_num', {n: item})}
                            </VerifyingStepSliderItem>
                        </VerifyingStepSliderPoint>
                    </Fragment>
                ))
            }
        </VerifyingStepSliderWrapper>
    )
}