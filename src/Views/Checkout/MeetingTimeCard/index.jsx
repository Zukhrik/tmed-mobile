import React, {useRef} from 'react'
import moment from 'moment'
import {Col, Row} from 'antd'
import {MeetingTimeCardWrapper} from '../style'
import {Title} from '../../../UIComponents/Typography/Title'

export const MeetingTimeCard = ({date, handleSelect}) => {
    const inputRef = useRef(null)

    return (
        <>
            <MeetingTimeCardWrapper onClick={() => inputRef.current && inputRef.current.focus()}>
                <Row align='middle' justify='space-between' gutter={[20, 0]}>
                    <Col>
                        <Title>{moment().format('DD')}</Title>
                    </Col>
                    <Col>
                        <Title>{moment().format('MMMM').toUpperCase()}</Title>
                    </Col>
                    <Col>
                        <Title>{moment().format('YYYY')}</Title>
                    </Col>
                </Row>
                <div className='calendar'>
                    <input
                        style={{opacity: '0'}}
                        ref={inputRef}
                        type='date'
                        id='bday' name='bday' required
                        value={moment(date).format('YYYY-MM-DD')}
                        onChange={(e) => handleSelect(e.target.value)}
                    />
                </div>
            </MeetingTimeCardWrapper>
        </>
    )
}