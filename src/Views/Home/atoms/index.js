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
  height: 100vh;
  background: var(--default-white);
  position: relative;
  z-index: 10;

  .org-list {
    padding: 62px 12px 65px 12px;
  }

  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .fixed-header {
    padding: 0 12px;
    color: var(--dark-dwed);
    height: 50px;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    border-bottom: 1px solid var(--basic-grey-bg);

    input {
      height: 30px;
      background: var(--default-white);
      width: ${({width}) => width ? `${width}px` : 'auto'};
      border: none;
      width: 100%;
      overflow: hidden;

      &:focus {
        outline: none;
      }
    }
  }

`