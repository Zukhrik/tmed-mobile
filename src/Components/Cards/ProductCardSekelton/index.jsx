import React from 'react'
import {SkeletonUI} from '../../../UIComponents/GlobalStyles'
import {ActionLinksWrapper, InfoTextWrapper, OffersInfoWrapper, ProductCostActionWrapper} from '../ProductCard/style'
import {ShortCardSkeleton} from '../ShortCardSkeleton'

export default ({showSeller, imgSkeletonHeight}) => {
    return (
        <OffersInfoWrapper>
            <SkeletonUI
                width='100%'
                variant='rect'
                animation='wave'
                borderradius={0}
                height={imgSkeletonHeight}
            />
            <ActionLinksWrapper>
                <InfoTextWrapper style={{marginBottom: 6}}>
                    <SkeletonUI variant='text' heigth={16} animation='wave'/>
                    <SkeletonUI variant='text' heigth={16} animation='wave'/>
                </InfoTextWrapper>
                {
                    showSeller
                    && (
                        <ShortCardSkeleton/>
                    )
                }
                <ProductCostActionWrapper>
                    <SkeletonUI animation='wave' variant='text' heigth={24} width='70%'/>
                </ProductCostActionWrapper>
            </ActionLinksWrapper>
        </OffersInfoWrapper>
    )
}