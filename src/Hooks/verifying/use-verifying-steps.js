import {useUrlParams} from "../app";
import {PROFILE_TYPE, URL_KEYS} from "../../Constants";
import {useCallback, useEffect, useState} from "react";
import {useStore} from "effector-react";
import {$accountModel} from "../../Models/account-model";
import {useHistory} from "react-router-dom";

const initialAllowToNav = {1: 1, 2: 0, 3: 0}

export function useVerifyingSteps() {
    const {urlData} = useUrlParams()
    const verificationStep = urlData[URL_KEYS.VERIFICATION_STEP]
    const {$profiles: {currentProfile}} = useStore($accountModel)
    const [allowToNav, setAllowToNav] = useState(initialAllowToNav)
    const [mounted, setMounted] = useState(false)
    const {push} = useHistory()

    const redirectPath = useCallback((id = null) => {
        return {
            pathname: '/settings',
            search: id ? `${URL_KEYS.VERIFICATION_STEP}=${id}` : ''
        }
    }, [])

    const redirectToUserVerifyingStep = useCallback((status) => {
        if (status < 3) {
            let tmp = initialAllowToNav
            push(redirectPath(status + 1))
            if (status === 1) {
                tmp['1'] = 2
                tmp['2'] = 1
            } else if (status === 2) {
                tmp['1'] = 2
                tmp['2'] = 2
                tmp['3'] = 1
            }
            setAllowToNav(tmp)
        }

        if(status > 2) {
            push(redirectPath())
        }
    }, [redirectPath, push])


    useEffect(() => {
        if (currentProfile && verificationStep && !mounted) {
            if (currentProfile.type === PROFILE_TYPE.USER) {
                redirectToUserVerifyingStep(currentProfile.status, Number(verificationStep))
            }
            setMounted(true)
        }
    }, [redirectToUserVerifyingStep, currentProfile, verificationStep, mounted])

    return {allowToNav}
}