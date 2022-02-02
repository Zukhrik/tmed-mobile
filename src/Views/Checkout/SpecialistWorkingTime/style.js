import styled from 'styled-components'

export const MeetDateSetting = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 24px;
`

export const MeetDateContent = styled.div`
  display: flex;
  flex-direction: column;
`

export const MeetDateContentInner = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 340px;
  padding-right: 6px;
`

export const MeetDateGridItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 0;
`

export const MeetDateHour = styled.div`
  font-size: 20px;
  font-weight: 500;
  line-height: 24px;
  margin-right: 16px;
  width: 60px;
`

export const MeetDatePeople = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
  min-height: 40px;
  max-width: 345px;
  overflow-x: auto;
  overflow-y: hidden;
  
  &::-webkit-scrollbar {
    -webkit-appearance: none;
    height: 0;
  }
`

export const MeetDate = styled.div`
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  margin-bottom: 12px;
  color: #2C2C2E
`

export const MeetDateItem = styled.div`
  max-width: 50px;
  max-height: 50px;
  min-width: 50px;
  min-height: 50px;
  background-color: #F0F1F2;
  margin: 0 10px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 16px;
    height: 16px;
  }
`
export const BreakTime = styled.div`
  color: red;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
`