import styled from 'styled-components'
import {Modal} from 'antd'

export const ModalCustom = styled(Modal)`
  && {
    .ant-modal-content {
      border-radius: 4px;
      overflow: hidden;
    }

    .ant-modal-header {
      border-bottom: 0;
      padding: 24px 24px 0 24px;

      @media (max-width: 576px) {
        padding: 12px 12px 0 12px;
      }
    }

    .ant-modal-close-x {
    }

    .ant-modal-title {
      font-size: 20px;
      font-weight: 600;
      line-height: 24px;
      color: #2C2C2E;
    }

    .anticon-close {
      color: var(--dark-dwed);
    }

    .ant-modal-body {
      padding: 24px;

      @media (max-width: 576px) {
        padding: 12px;
      }
    }
  }
`