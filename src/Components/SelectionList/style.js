import {Checkbox} from 'antd'
import styled from 'styled-components'
import {IconBox} from '../../UIComponents/GlobalStyles'
import {StyledInput} from '../../UIComponents/Inputs/style'

export const SelectionListHeader = styled.div`
  width: 100%;

  ${StyledInput} {
    background: var(--default-white);
    border: 1px solid var(--grey-border);
    border-radius: 4px;
    height: 48px;
  }
`

export const SelectionListBody = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  height: 400px;
`

export const LoadingSpinWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`

export const BodyItemWrapper = styled.div`
  display: flex;
  padding: 8px;
  cursor: pointer;
  align-items: center;
  border: 1px solid var(--grey-border);
  border-bottom: none;

  &:last-child {
    border-bottom: 1px solid var(--grey-border);
  }

  ${IconBox} {
    margin: 0 4px;
  }
`

export const ItemCheckBoxWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 8px;
`

export const ItemCheckBox = styled(Checkbox)`
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const SelectionListFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`