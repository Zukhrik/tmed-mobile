import styled from 'styled-components'
import {Modal} from 'antd'

export const AllScreenModalWrapper = styled(Modal)`
  max-width: 100vw;
  margin: 0 !important;
  min-height: 100vh;
  width: 100%;
  padding: 0;
  top: 0;
  bottom: 0;

  .ant-modal-body {
    padding: 0;
  }

  .ant-modal-footer {
    display: none;
  }

  .ant-modal-close {
    display: none !important;
  }
`