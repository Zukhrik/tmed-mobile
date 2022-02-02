import React, {useCallback} from 'react'
import {CardType, NotValidCard} from '../molecules'
import {EditSquareSvg} from '../../../../Icons/Edit'
import {Text} from '../../../../UIComponents/Typography/Text'
import {IconBox} from '../../../../UIComponents/GlobalStyles'
import {Title} from '../../../../UIComponents/Typography/Title'
import {CardItemInfoWrapper, CardNumberAndExpireDateWrapper, CreditCardItemWrapper} from '../atoms'

export const CreditCardItem = ({name, number, expireDate, handleClick, valid, handleActivate, bgImage}) => {
    
    const getCard = useCallback((number) => {
        let tmp = ''
        for (let i = 0; i < number.length; i++) {
            if (i % 4 === 0) {
                tmp += ' ' + number[i]
            } else {
                tmp += number[i]
            }
        }
        return tmp
    }, [])
    
    
    return (
        <CreditCardItemWrapper bgImage={bgImage}>
            {
                !valid && (
                    <NotValidCard handleActivate={handleActivate}/>
                )
            }
            <CardType cardNum={number}/>
            <IconBox onClick={handleClick}>
                <EditSquareSvg/>
            </IconBox>
            <CardItemInfoWrapper>
                <Title>{name}</Title>
                <CardNumberAndExpireDateWrapper>
                    <Text>{getCard(number)}</Text>
                    <Text>{expireDate}</Text>
                </CardNumberAndExpireDateWrapper>
                <Text>Bank Name</Text>
            </CardItemInfoWrapper>
        </CreditCardItemWrapper>
    )
}