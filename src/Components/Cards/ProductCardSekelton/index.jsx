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
                borderradius={0}
                height={imgSkeletonHeight}
            />
            <ActionLinksWrapper>
                <InfoTextWrapper style={{marginBottom: 6}}>
                    <SkeletonUI variant='text' heigth={16}/>
                    <SkeletonUI variant='text' heigth={16}/>
                </InfoTextWrapper>
                {
                    showSeller
                    && (
                        <ShortCardSkeleton/>
                    )
                }
                <ProductCostActionWrapper>
                    <SkeletonUI variant='text' heigth={24} width='70%'/>
                </ProductCostActionWrapper>
            </ActionLinksWrapper>
        </OffersInfoWrapper>
    )
}