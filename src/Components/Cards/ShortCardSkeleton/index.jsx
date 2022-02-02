import React from 'react'
import {SkeletonUI, SkeletonWrapper} from '../../../UIComponents/GlobalStyles'
import {CardImgWrapper, CardWrapInfo, ShortCardContainer, VerticalView} from '../ShortCard/style'

export const ShortCardSkeleton = (
    {
        direction,
        nameSize,
        textSize,
        size,
        nameWidth,
        textWidth,
        text2,
        height,
        nameHeight,
        textHeight,
        variant
    }
) => {
    return (
        <ShortCardContainer
            direction={direction}
            height={height}
        >
            {
                direction === 'vertical'
                    ? (
                        <VerticalView>
                            <SkeletonUI
                                variant={variant ? variant : 'circle'}
                                width={size || 80}
                                height={size || 80}
                            />
                            <SkeletonWrapper height={nameHeight || 'auto'}>
                                <SkeletonUI
                                    variant='text'
                                    width={nameWidth || 90}
                                    height={nameSize || 12}
                                />
                            </SkeletonWrapper>
                            <SkeletonWrapper height={textHeight || 'auto'}>
                                <SkeletonUI
                                    variant='text'
                                    width={textWidth || 185}
                                    height={textSize || 12}
                                />
                            </SkeletonWrapper>
                            {
                                text2 && (
                                    <SkeletonUI
                                        variant='text'
                                        width={155}
                                        height={12}
                                    />
                                )
                            }
                        </VerticalView>
                    )
                    : <>
                        <CardImgWrapper>
                            <SkeletonUI variant='circle' height={size || 24} width={size || 24}/>
                        </CardImgWrapper>
                        <CardWrapInfo>
                            <SkeletonUI
                                variant='text'
                                height={nameSize || 12}
                                width={direction === 'vertical' ? 60 : '100%'}
                            />
                            <SkeletonUI
                                variant='text'
                                height={textSize || 12}
                                width={direction === 'vertical' ? 60 : '100%'}
                            />
                        </CardWrapInfo>
                    </>
            }
        </ShortCardContainer>
    )
}