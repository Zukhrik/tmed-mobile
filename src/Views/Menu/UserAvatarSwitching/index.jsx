import React, {useCallback, useState} from 'react'
import {v4 as uuidv4} from 'uuid'
import {useStore} from 'effector-react'
import {debounce} from '@material-ui/core'
import {useHistory} from 'react-router-dom'
import {UserAvatarSliderWrapper} from '../style'
import {PersonAddSvg} from '../../../Icons/Person'
import {ShortCard} from '../../../Components/Cards'
import {NotVerifyWarning} from '../NotVerifyWarning'
import {IconBox} from '../../../UIComponents/GlobalStyles'
import {$accountModel} from '../../../Models/account-model'
import {AccountSliderCarousel} from '../../../Components/AccountSliderCarousel'

export const UserAvatarSwitching = ({changeAccount}) => {
    const {$profiles: {currentProfile, linkedUsers}} = useStore($accountModel)
    const [currentSlide, setCurrentSlide] = useState(0)
    const {push} = useHistory()
    
    const slides = [
        ...linkedUsers.map(item => ({
            key: uuidv4(),
            slug_name: item.slug_name,
            content: (
                <div>
                    <ShortCard
                        imgUrl={item.avatar}
                        imgSize={140}
                        name={item.name}
                        text={item.category && item.category.name}
                        isOfficial={item.isOfficial}
                        direction='vertical'
                        disableLazyLoad
                        truncateLength={20}
                    />
                </div>
            )
        }))
    ]
    
    const handleClick = useCallback((slug_name, idx) => {
        setCurrentSlide(idx)
        debounce(changeAccount(slug_name), 600)
    }, [changeAccount])
    
    const renderSlides = useCallback((data) => {
        let tmp = []
        if (data.length === 1) {
            tmp = [
                ...data.map((item, idx) => ({...item, onClick: () => handleClick(item.slug_name, idx)})),
                {
                    key: uuidv4(),
                    content: (
                        <UserAvatarSliderWrapper>
                            <IconBox>
                                <PersonAddSvg/>
                            </IconBox>
                        </UserAvatarSliderWrapper>
                    ),
                    onClick: () => push('/sign-in')
                },
                {
                    key: uuidv4(),
                    content: '',
                    onClick: () => false
                }
            ]
        }
        
        if (data.length > 1) {
            tmp = [
                ...data.map((item, idx) => ({...item, onClick: () => handleClick(item.slug_name, idx)})),
                {
                    key: uuidv4(),
                    content: <UserAvatarSliderWrapper><IconBox><PersonAddSvg/></IconBox></UserAvatarSliderWrapper>,
                    onClick: () => push('/sign-in')
                }
            ]
        }
        return tmp
    }, [handleClick, push])
    
    return (
        <>
            <AccountSliderCarousel
                currentSlide={currentSlide}
                slides={renderSlides(slides)}
                setCurrentSlide={setCurrentSlide}
                currentSlug={currentProfile.slug_name}
            />
            <NotVerifyWarning/>
        </>
    )
}