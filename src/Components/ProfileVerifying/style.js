import styled, {css} from "styled-components";
import {StyledTitle} from "../../UIComponents/Typography/style";

export const VerifyingStepSliderWrapper = styled.div`
  position: relative;
  height: 2px;
  background-color: #E3E3E3;
  margin: 50px 24px 16px 24px;
`

const getPointPosition = ({type}) => {
    switch (type) {
        // case 2:
        //     return css`
        //       transform: translate(-50%, -50%);
        //       left: 50%;
        //     `
        case 2:
            return css`
              transform: translateY(-50%);
              right: -12px;
            `
        default:
            return css`
              transform: translateY(-50%);
              left: -12px;
            `
    }
}

export const VerifyingStepSliderCircle = styled.div`
  transition: .2s ease;
  width: 14px;
  height: 14px;
  border-radius: 50%;
`

export const VerifyingStepSliderItem = styled.div`
  position: absolute;
  min-width: 60px;
  bottom: -30px;
  text-align: center;
  line-height: 24px;
  font-weight: 500;
  font-size: 14px;
  color: var(--grey-basic);
`

export const VerifyingStepSliderPoint = styled.div`
  width: 24px;
  height: 24px;
  background: #F4F4F4;
  border: 1px solid ${({isActive, done}) => done ? '#2BCBBA' : isActive ? 'var(--primary-dwed)' : '#E3E3E3'};
  border-radius: 50%;
  position: absolute;
  transition: .2s ease;
  top: 50%;
  ${getPointPosition};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  svg {
    color: ${({isActive, done}) => done ? '#2BCBBA' : isActive ? 'var(--primary-dwed)' : '#E3E3E3'};
    width: 20px;
    height: 20px;
  }
  
  ${VerifyingStepSliderItem} {
    color: ${({isActive}) => isActive ? 'var(--dark-basic)' : 'var(--grey-basic)'};
  }

  ${VerifyingStepSliderCircle} {
    background-color: ${({isActive}) => isActive ? 'var(--primary-dwed)' : '#F4F4F4'};
  }
`

export const VerifyingWrapper = styled.div`
  margin-top: 70px;

  ${StyledTitle} {
    text-transform: uppercase;
    margin-bottom: 24px;
    color: var(--grey-basic);
  }
`