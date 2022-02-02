import React from 'react'
import {Link} from 'react-router-dom'
import {OfferingSvg} from '../../../Icons/Offering'
import {getRandom} from '../../../utils/skeleton-utils'
import {IconBox} from '../../../UIComponents/GlobalStyles'
import {Title} from '../../../UIComponents/Typography/Title'
import {ImageLazyLoad} from '../../../UIComponents/ImageLazyLoad'
import {ActionLinksWrapper, InfoTextWrapper, OffersInfoWrapper, ProductCostActionWrapper} from './style'
import {Spin} from 'antd'

export default ({item, handleClick, showBag}) => {
    
    return (
        <OffersInfoWrapper
            bgColor={item.inCart ? 'var(--active-bg)' : ''}
        >
            <Link to={item.path && item.path}>
                <ImageLazyLoad height={getRandom(100, 200)} src={`${item.image}`} alt={item.name}/>
            </Link>
            <ActionLinksWrapper
                onClick={() => handleClick(item)}
            >
                <InfoTextWrapper>
                    {/*<Link to={item.path && item.path}>*/}
                    <Title level={5}>{item.name}</Title>
                    {/*</Link>*/}
                    {/*<Text level={5}>{t('quantity')}: {item.qty ? item.qty : <InfinitySvg/>}</Text>*/}
                </InfoTextWrapper>
                {/*{*/}
                {/*    item.seller*/}
                {/*    && (*/}
                {/*        <ProductOwnerWrapper to={`${item.seller.path}/offerings/`}>*/}
                {/*            <ShortCard*/}
                {/*                imgUrl={item.seller.imgUrl}*/}
                {/*                name={item.seller.name}*/}
                {/*                imgSize={24}*/}
                {/*            />*/}
                {/*        </ProductOwnerWrapper>*/}
                {/*    )*/}
                {/*}*/}
                <ProductCostActionWrapper
                    costColor={item.inCart ? 'var(--primary-dwed)' : ''}
                    // onClick={() => handleClick(item)}
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