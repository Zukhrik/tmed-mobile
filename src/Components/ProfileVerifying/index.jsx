import React from 'react'
import {useStore} from 'effector-react'
import {URL_KEYS} from '../../Constants'
import {VerifyingWrapper} from './style'
import {useUrlParams} from '../../Hooks/app'
import {useVerifyingSteps} from '../../Hooks/verifying'
import {LegalDataVerifying} from './LegalDataVerifying'
import {$accountModel} from '../../Models/account-model'
import {VerifyingNavigation} from './VerifyingNavigation'
import {RootContent} from '../../UIComponents/GlobalStyles'
import {PersonalInfoVerifying} from './PersonalInfoVerifying'

export const VerificationPage = () => {
    const {allowToNav} = useVerifyingSteps()
    const {$profiles: {currentProfile}} = useStore($accountModel)
    const {urlData} = useUrlParams()
    const verification_step = urlData[URL_KEYS.VERIFICATION_STEP]
    
    return (
        <RootContent style={{paddingBottom: 54}}>
            {
                currentProfile
                && (
                    <>
                        <VerifyingNavigation allowToNav={allowToNav}/>
                        <VerifyingWrapper>
                            {/*{verification_step === '3' && <VideoVerifying/>}*/}
                            {verification_step === '2' && <LegalDataVerifying/>}
                            {verification_step === '1' && <PersonalInfoVerifying/>}
                        </VerifyingWrapper>
                    </>
                )
            }
        </RootContent>
    )
}