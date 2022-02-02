import React, {useCallback} from 'react'
import {MainProgress, ProgressBack, ProgressItemWrapper} from '../style'

export const Progress = ({item}) => {
    const {color, level, score, remaining_score, shadow_color} = item

    const getWidth = useCallback(() => {
        let tmp
        if (remaining_score !== 0 || score !== 0) {
            tmp = (score * 100) / (score + remaining_score)
        } else {
            tmp = 0
        }
        return tmp
    }, [remaining_score, score])

    return (
        <ProgressItemWrapper color={color}>
            {level}
            <ProgressBack>
                <MainProgress
                    color={color}
                    width={getWidth()}
                    className='animate'
                    shadowColor={shadow_color}
                />
                {/*{icon ? <IconWrapper>{icon}</IconWrapper> : ''}*/}
            </ProgressBack>
        </ProgressItemWrapper>
    )
}