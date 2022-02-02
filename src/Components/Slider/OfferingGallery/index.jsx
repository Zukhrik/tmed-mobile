import React from 'react'
import Carousel from 'react-multi-carousel'
import {ImageCountView, SliderWrapper} from '../style'
import {ImageLazyLoad} from '../../../UIComponents/ImageLazyLoad'

const responsive = {
    desktop: {
        breakpoint: {max: 3000, min: 1024},
        items: 1
    },
    tablet: {
        breakpoint: {max: 1024, min: 464},
        items: 1
    },
    mobile: {
        breakpoint: {max: 464, min: 0},
        items: 1
    }
}

export const OfferingGallery = ({data}) => {
    
    return (
        <SliderWrapper>
            {
                data && data.length > 1 &&
                <ImageCountView>
                    {`1/${data.length}`}
                </ImageCountView>
            }
            <Carousel
                arrows={false}
                responsive={responsive}
                renderButtonGroupOutside
                itemClass='offering-gallery-item'
                showDots={data && data.length > 1 && true}
            >
                {
                    data && data.length > 0 && data.map((item) => (
                        <ImageLazyLoad
                            key={item.id}
                            alt={item.id}
                            src={`${item.thumbnail}`}
                        />
                    ))
                }
            </Carousel>
        </SliderWrapper>
    )
}