import React, {Fragment, useCallback} from 'react'
import moment from 'moment'
import {Col, Row} from 'antd'
import {useStore} from 'effector-react'
import {MeetTimeInfo} from './MeetTimeInfo'
import {URL_KEYS} from '../../../Constants'
import {useLocation} from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import {$appModel} from '../../../Models/app'
import {useUrlParams} from '../../../Hooks/app'
import {INFO_MAT} from '../../../Constants/app'
import {SpecDateItem, SpecDateWrapper} from './style'
import {useSpecMeetDate} from '../../../Hooks/checkout'
import {InputUI} from '../../../UIComponents/mu-inputs'
import {Text} from '../../../UIComponents/Typography/Text'
import {Title} from '../../../UIComponents/Typography/Title'

export const SpecMeetDate = ({activeDay, meetDate, comment, onChange}) => {
    const {t} = useTranslation()
    const {pathname} = useLocation()
    const {urlData} = useUrlParams()
    const {$device} = useStore($appModel)
    const specId = urlData[URL_KEYS.SPECIALIST_ID]
    const {dateRange, hours, requestData, renderMeetRow} = useSpecMeetDate({activeDay})
    const getDayLink = useCallback((item) => {
        const url = []
        
        if (specId) {
            url.push(`${URL_KEYS.SPECIALIST_ID}=${specId}`)
        }
        
        url.push(`${URL_KEYS.DATE}=${moment(item).format('YYYY-MM-DD')}`)
        
        return {
            pathname,
            search: url.join('&')
        }
    }, [specId, pathname])
    
    const date = new Date().getTime()
    
    return (
        <Row gutter={[0, 24]}>
            <Col span={24}>
                {
                    dateRange.length > 0 && (
                        <SpecDateWrapper>
                            <Row gutter={[12, 12]} wrap={false}>
                                {
                                    dateRange.map(item => (
                                        <Col key={new Date(item).getTime()}>
                                            <SpecDateItem
                                                to={getDayLink(item)}
                                                isActive={() => activeDay === moment(item).format('YYYY-MM-DD')}
                                            >
                                                <Title level={3} style={{marginBottom: 8}}>
                                                    {moment(item).format('DD')}
                                                </Title>
                                                <Text>
                                                    {moment(item).format('ddd').toUpperCase()}
                                                </Text>
                                            </SpecDateItem>
                                        </Col>
                                    ))
                                }
                            </Row>
                        </SpecDateWrapper>
                    )
                }
            </Col>
            <Col span={24}>
                <Title level={4}>
                    {t('select_time')}
                </Title>
            </Col>
            <Col span={24}>
                {
                    hours.length > 0 && (
                        <SpecDateWrapper>
                            <Row gutter={[12, 12]} wrap={false}>
                                {
                                    hours.map((item, idx) => {
                                        const meetRow = renderMeetRow(item.id)
                                        return (
                                            <Fragment key={`${idx + 1}`}>
                                                {
                                                    item.id > date && meetRow && meetRow.length > 0 && (
                                                        <Col>
                                                            {
                                                                meetRow.map((dateItem, x) => (
                                                                    <MeetTimeInfo
                                                                        key={`${x + 1}`}
                                                                        dateItem={dateItem}
                                                                        meetDate={meetDate}
                                                                        requestData={requestData}
                                                                        activeDay={activeDay}
                                                                    />
                                                                ))
                                                            }
                                                        </Col>
                                                    )
                                                }
                                            </Fragment>
                                        )
                                    })
                                }
                            </Row>
                        </SpecDateWrapper>
                    )
                }
            </Col>
            {
                $device && $device !== INFO_MAT && (
                    <Col span={24}>
                        <InputUI
                            value={comment}
                            rows={8}
                            inputType='textarea'
                            label={t('leave_a_comment')}
                            onChange={(e) => onChange(e.target.value)}
                        />
                    </Col>
                )
            }
        </Row>
    )
}