import React from 'react'
import {useStore} from 'effector-react'
import {useParams} from 'react-router-dom'
import Carousel from 'react-multi-carousel'
import {$postModel} from '../../../Models/post-model'
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

export const PostGallery = () => {
    const {post_id} = useParams()
    const {$getPost: {data}} = useStore($postModel)
    
    return (
        <>
            {
                data && post_id && data[post_id] &&
                <Carousel
                    arrows={false}
                    responsive={responsive}
                    renderButtonGroupOutside
                    itemClass='offering-gallery-item'
                    showDots={data && data?.[post_id]?.medias && data?.[post_id]?.medias?.length > 1}
                >
                    {
                        data?.[post_id]?.medias.length > 0
                            ? data?.[post_id]?.medias?.map((item, idx) => (
                                <ImageLazyLoad
                                    key={`${idx + 1}`}
                                    src={item.thumbnail}
                                />
                            ))
                            : <ImageLazyLoad
                                src={data?.[post_id] && data?.[post_id]?.stream_schedule?.image}
                            />
                    }
                </Carousel>
            }
        </>
    )
}