import React from 'react'
import {useStore} from 'effector-react'
import {SkeletonUI} from '../../../UIComponents/GlobalStyles'
import {$offeringsModel} from '../../../Models/offerings-model'
import {OfferingGallery} from '../../../Components/Slider/OfferingGallery'

export const Gallery = () => {
    const {$offeringGallery: {data, forceLoading}} = useStore($offeringsModel)
    
    return (
        <>
            {
                data && Object.values(data).length > 0 && forceLoading === 2
                    ? <OfferingGallery data={data}/>
                    : <SkeletonUI
                        variant='rect'
                        height={300}
                        width='100%'
                    />
            }
        </>
    )
}