import {ShortCard} from '../Cards'
import React, {useState} from 'react'
import {SlideDown} from 'react-slidedown'
import {PinSvg} from '../../Icons/PinFill'
import {ArrowTopSvg} from '../../Icons/Arrow'
import {PhoneSvg} from '../../Icons/PhoneFill'
import {AlertCircleSvg} from '../../Icons/Alert'
import {MessageSquareSvg} from '../../Icons/Message'
import {AccountActionWrap, ListWrap, ShortCardWrap} from '../Offering/OrgOfferings/OfferingGroupItem/style'

export const ShortInfo = ({imgUrl, imgSize, name, text}) => {
    const [show, setShow] = useState(false)
    
    return (
        <>
            <ShortCardWrap>
                <ShortCard
                    text={text}
                    name={name}
                    imgUrl={imgUrl}
                    imgSize={imgSize}
                />
                <AccountActionWrap status={!show} onClick={() => setShow(!show)}>
                    <ArrowTopSvg/>
                </AccountActionWrap>
            </ShortCardWrap>
            <SlideDown transitionOnAppear={false} closed={!show}>
                <ListWrap>
                    <PhoneSvg/>
                    <MessageSquareSvg/>
                    <AlertCircleSvg/>
                    <PinSvg/>
                </ListWrap>
            </SlideDown>
        </>
    )
}