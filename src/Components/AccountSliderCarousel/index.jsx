import React, {useEffect, useState} from 'react'
import Carousel from 'react-spring-3d-carousel'
import {config} from 'react-spring'
import {AccountSliderCarouseWrapper} from './style'

export const AccountSliderCarousel = ({slides, currentSlide, currentSlug, setCurrentSlide}) => {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        if (!mounted) {
            if (slides.length > 0) {
                const idx = slides.findIndex(item => item.slug_name === currentSlug)
                if (idx !== -1) {
                    setCurrentSlide(idx)
                } else {
                    setCurrentSlide(0)
                }
            } else {
                setCurrentSlide(0)
            }
            setMounted(true)
        }
    }, [currentSlug, setCurrentSlide, slides, mounted])

    return (
        <AccountSliderCarouseWrapper>
            <Carousel
                showNavigation={false}
                slides={slides}
                goToSlide={currentSlide}
                offsetRadius={2}
                animationConfig={config.gentle}
            />
        </AccountSliderCarouseWrapper>
    )
}