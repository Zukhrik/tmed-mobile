import React, {useCallback} from 'react'
import {IconItemWrapper, RecordCardWrapper} from '../atoms'
import {Col, Row} from 'antd'
import {Title} from '../../../UIComponents/Typography/Title'
import {Text} from '../../../UIComponents/Typography/Text'
import {Avatar} from '../../../UIComponents/Avatar'
import {TimeCircleSvg} from '../../../Icons/Time'
import {useTranslation} from 'react-i18next'
import {DoneSvg} from '../../../Icons/Done'
import {ClockSvg} from '../../../Icons/Clock'
import {Button} from '../../../UIComponents/Button'
import {DocumentText} from '../../../Icons/DocumentText'
import {CalendarSvg} from '../../../Icons/Calendar'
import {useHistory} from 'react-router-dom'
import {useStore} from 'effector-react'
import {$accountModel} from '../../../Models/account-model'
import {saveURLMount} from '../../../Models/app'
import {CloseCircleSvg} from '../../../Icons/Close'
import {AllDoneCheckSvg} from '../../../Icons/CheckMark'
import {InfinitySvg} from '../../../Icons/infinity'

export const RecordCard = ({name, category, src, status, meet, date, link}) => {
    const {t} = useTranslation()
    const {push, location: {pathname}} = useHistory()
    const {$profiles: {currentProfile}} = useStore($accountModel)
    
    const generateStatus = useCallback((statuses) => {
        switch (statuses) {
            case -1:
                return (
                    <IconItemWrapper
                        color='var(--danger-dwed)'
                        textColor='var(--danger-dwed)'
                    >
                        <CloseCircleSvg/>{t('canceled')}
                    </IconItemWrapper>
                )
            case 0:
                return (
                    <IconItemWrapper
                        color='var(--aesthetic-color)'
                        textColor='var(--aesthetic-color)'
                    >
                        <ClockSvg/>{t('awaiting')}
                    </IconItemWrapper>
                )
            case 1:
                return (
                    <IconItemWrapper
                        color='var(--professional-color)'
                        textColor='var(--professional-color)'
                    >
                        <DoneSvg/>{t('approved')}
                    </IconItemWrapper>
                )
            case 2:
                return (
                    <IconItemWrapper
                        color='#05D696'
                        textColor='#05D696'
                    >
                        <InfinitySvg/>{t('QR_Code_scanned')}
                    </IconItemWrapper>
                )
            case 5:
                return <IconItemWrapper><AllDoneCheckSvg/>{t('finished')}</IconItemWrapper>
            
            default:
                return null
        }
    }, [t])
    
    const handleRecordsPush = () => {
        push(`/@${currentProfile && currentProfile.slug_name}/records`)
        saveURLMount(pathname)
    }
    
    
    return (
        <RecordCardWrapper>
            <Row gutter={[0, 12]}>
                <Col span={24} onClick={link}>
                    <Row wrap={false} gutter={[4, 0]} justify='space-between'>
                        <Col>
                            <Title level={4}>{name}</Title>
                            <Text color='var(--grey-dwed)'>{category}</Text>
                        </Col>
                        <Col>
                            <Avatar size={36} imgUrl={src}/>
                        </Col>
                    </Row>
                </Col>
                <Col span={24}>
                    <Row wrap={false}>
                        <Col className='icon-item-wrapper'>
                            <TimeCircleSvg/> {meet}
                        </Col>
                        <Col className='icon-item-wrapper'>
                            <CalendarSvg/> {date}
                        </Col>
                        <Col>
                            {generateStatus(status)}
                        </Col>
                    </Row>
                </Col>
                {
                    status && (
                        <Col className='buttons-wrapper'>
                            {
                                status === 5 && (
                                    <Button variant='primary' onClick={handleRecordsPush}>
                                        <DocumentText/>
                                        {t('view_record')}
                                    </Button>
                                )
                            }
                        </Col>
                    )
                }
            </Row>
        </RecordCardWrapper>
    )
}