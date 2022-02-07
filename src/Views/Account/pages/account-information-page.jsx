import React from 'react'
import {RootContent} from '../../../UIComponents/GlobalStyles'
import {FixedHeader} from '../../../Components/FixedHeader'
import {useGoBack} from '../../../Hooks/app'
import {useParams} from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import {useStore} from 'effector-react'
import {$accountModel} from '../../../Models/account-model'
import {Col, Row} from 'antd'
import {Text} from '../../../UIComponents/Typography/Text'
import {AboutMeItemWrapper} from '../atoms'
import moment from 'moment'

export const AccountInformationPage = () => {
    const {t} = useTranslation()
    const {username} = useParams()
    const {$accountInfo: {data}} = useStore($accountModel)
    const {goBack} = useGoBack({pathname: `/@${username}`})
    
    return (
        <RootContent paddingTop={50}>
            <FixedHeader
                goBack={goBack}
                title={t('about_me')}
            />
            {
                data && (
                    <Row gutter={[0, 12]}>
                        <Col span={24}>
                            <AboutMeItemWrapper>
                                <Text className='item-name'>{t('full_name')}</Text>
                                <Text level={5}>{`${data.name} ${data.lastname} ${data.surname}`}</Text>
                            </AboutMeItemWrapper>
                        </Col>
                        <Col span={24}>
                            <AboutMeItemWrapper>
                                <Text className='item-name'>{t('specialist')}</Text>
                                <Text level={5}>{data.main_cat.name}</Text>
                            </AboutMeItemWrapper>
                        </Col>
                        <Col span={24}>
                            <AboutMeItemWrapper>
                                <Text className='item-name'>{t('birth_date')}</Text>
                                <Text level={5}>{moment(data.birthday).format('DD.MM.YYYY')}</Text>
                            </AboutMeItemWrapper>
                        </Col>
                        <Col span={24}>
                            <AboutMeItemWrapper>
                                <Text className='item-name'>{t('region')}</Text>
                                <Text level={5}>{data.region.name}</Text>
                            </AboutMeItemWrapper>
                        </Col>
                    </Row>
                )
            }
        </RootContent>
    )
}