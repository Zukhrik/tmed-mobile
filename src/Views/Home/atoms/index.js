import styled from 'styled-components'

export const HomeFixedHeaderComponentWrapper = styled.div`
  .search-icon-wrapper {
    color: var(--dark-dwed);
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      width: 24px;
      height: 24px;
    }
  }
`

export const OrgSearchInputWrapper = styled.form`
  position: relative;
  color: var(--grey-dwed);

  input {
    height: 30px;
    background: var(--default-white);
    width: ${({width}) => width ? `${width}px` : 'auto'};
  }

  svg {
    position: absolute;
    right: 8px;
    top: 3px;
  }
`