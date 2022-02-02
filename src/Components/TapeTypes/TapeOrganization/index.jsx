import React from 'react'
import Carousel from 'react-multi-carousel'
import {useTranslation} from 'react-i18next'
import {FamousAccountCard} from '../../Cards'
import {RecommendationOrgsWrapper} from '../style'
import {truncateString} from '../../../utils/stringUtils'
import {Title} from '../../../UIComponents/Typography/Title'

const responsive = {
    desktop: {
        breakpoint: {max: 3000, min: 1024},
        items: 2,
    },
    tablet: {
        breakpoint: {max: 1024, min: 464},
        items: 2,
    },
    mobile: {
        breakpoint: {max: 464, min: 0},
        items: 2,
    },
}

export const TapeOrganization = ({data}) => {
    const {t} = useTranslation()

    return (
        <RecommendationOrgsWrapper>
            <Title level={3}>{t('recommended_organization')}</Title>
            <Carousel
                arrows={false}
                showDots={false}
                responsive={responsive}
                renderButtonGroupOutside
                itemClass='offering-gallery-item'
            >
                {
                    data && data.length > 0 && data.map((item, idx) => (
                        <FamousAccountCard
                            size={134}
                            showRating
                            shape='square'
                            key={`${idx + 1}`}
                            imgUrl={item.logo}
                            fullName={truncateString(item.name, 14)}
                            category={truncateString(item.category.name, 16)}
                        />
                    ))
                }
            </Carousel>
        </RecommendationOrgsWrapper>
    )
}