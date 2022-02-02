import styled from 'styled-components'
import {IconBox} from '../../UIComponents/GlobalStyles'
import {OfferCardWrapper} from '../Cards/OfferCard/style'
import {StyledText, StyledTitle} from '../../UIComponents/Typography/style'
import {FamousCardWrapper} from '../Cards/FamousAccountCard/style'

export const TapeStreamWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  background-color: var(--default-white);
  margin: 8px 0;
  padding: 12px;
`

export const PostsItemsScrollWrapper = styled.div`
  width: 100%;
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  align-items: flex-start;
  justify-content: flex-start;

  ${OfferCardWrapper} {
    margin-right: 12px;
  }

  ${FamousCardWrapper} {
    margin-right: 8px;
  }

  &::-webkit-scrollbar {
    height: 0;
  }

  img {
    width: 100%;
    object-fit: cover;
  }
`

export const OfferingsCardWrapper = styled.div`
  background-color: var(--default-white);
  padding: 12px 0;

  ${StyledTitle} {
    margin-bottom: 12px;
    padding: 0 12px;
  }
`

export const RecommendationOrgsWrapper = styled.div`
  background-color: var(--default-white);

  ${StyledTitle} {
    margin-bottom: 12px;
  }
`

export const PostSliderWrapper = styled.div`
  margin-top: 16px;
  position: relative;

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
`

export const PeopleCardWrapper = styled.div`
  @media (max-width: 576px) {
    padding: 0 12px;
  }
`

export const CardHeadWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${IconBox} {
    color: var(--dark-dwed);

    svg {
      width: 22px;
      height: 22px;
    }
  }
`

export const PeopleCardItemWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  overflow-x: auto;
  overflow-y: hidden;

  &::-webkit-scrollbar {
    height: 0;
  }
`

export const PopularPeopleWrapper = styled.div`
  padding: 12px;
  display: flex;
  margin: 8px 0;
  flex-direction: column;
  background-color: var(--default-white);
  border-bottom: 1px solid rgba(242, 242, 242, 0.5);
`

export const TapeHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 12px;

  ${StyledTitle} {
    font-size: 16px;
  }

  ${StyledText} {
    color: var(--primary-dwed);
  }
`