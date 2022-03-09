import React from 'react'
import {Link} from 'react-router-dom'
import {OfferingSvg} from '../../../Icons/Offering'
import {IconBox} from '../../../UIComponents/GlobalStyles'
import {Title} from '../../../UIComponents/Typography/Title'
import {ImageLazyLoad} from '../../../UIComponents/ImageLazyLoad'
import {ActionLinksWrapper, InfoTextWrapper, OffersInfoWrapper, ProductCostActionWrapper} from './style'
import {Spin} from 'antd'

export default ({item, handleClick, showBag, isLoading}) => {
    
    return (
        <OffersInfoWrapper
            bgColor={item.inCart ? 'var(--active-bg)' : ''}
        >
            <Link to={item.path && item.path}>
                <ImageLazyLoad src={`${item.image}`} alt={item.name}/>
            </Link>
            <ActionLinksWrapper
                onClick={() => handleClick(item)}
            >
                <InfoTextWrapper>
                    <Title level={5}>{item.name}</Title>
                </InfoTextWrapper>
                <ProductCostActionWrapper
                    costColor={item.inCart ? 'var(--primary-dwed)' : ''}
                >
                    <Title
                        level={4}
                    >
                        {item.cost} {item.currency}
                    </Title>
                    {
                        showBag && (
                            <IconBox
                                color={item.inCart ? 'var(--primary-dwed)' : ''}
                            >
                                {
                                    !item.loading
                                        ? <OfferingSvg/>
                                        : <Spin/>
                                }
                            </IconBox>
                        )
                    }
                </ProductCostActionWrapper>
            </ActionLinksWrapper>
        </OffersInfoWrapper>
    )
}