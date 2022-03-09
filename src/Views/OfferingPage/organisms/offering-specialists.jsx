import React from 'react'
import {Col, Row} from 'antd'
import {DescriptionWrapper} from '../atoms'
import {URL_KEYS} from '../../../Constants'
import {useTranslation} from 'react-i18next'
import {useUrlGenerate} from '../../../Hooks/org'
import {Text} from '../../../UIComponents/Typography/Text'
import {ShortCard, ShortCardSkeleton} from '../../../Components/Cards'
import {DataWrapper, SpecialistNavLink} from '../../../Components/Offering/OrgOfferings/style'


export const OfferSpecialists = ({res, isLoading}) => {
    const {t} = useTranslation()
    const {getActive, generateUrl} = useUrlGenerate()
    
    
    return (
        <Row className='container'>
            <Col span={24}>
                <DescriptionWrapper>
                    <Text>{`${t('select_specialist')}:`}</Text>
                </DescriptionWrapper>
            </Col>
            <Col span={24}>
                <DataWrapper>
                    {
                        !isLoading
                            ? (
                                res?.data?.responsible.map((item, idx) => (
                                    <SpecialistNavLink
                                        key={`${idx + 1}`}
                                        to={generateUrl(URL_KEYS.SPECIALIST_ID, item.id)}
                                        isActive={() => getActive(URL_KEYS.SPECIALIST_ID, item.id)}
                                    >
                                        <ShortCard
                                            imgSize={56}
                                            direction='vertical'
                                            text={item.job?.name ? item.job?.name : 'test cat'}
                                            imgUrl={item.user.avatar}
                                            name={item.user?.full_name ? item.user?.full_name : 'test'}
                                            containerPath={`/@${item.user.username}`}
                                            active={getActive(URL_KEYS.SPECIALIST_ID, item.id)}
                                        />
                                    </SpecialistNavLink>
                                ))
                            ) : (
                                <ShortCardSkeleton
                                    size={56}
                                    nameWidth={60}
                                    nameHeight={24}
                                    textHeight={16}
                                    textWidth={40}
                                    nameSize={12}
                                    textSize={12}
                                    height={96}
                                    direction='vertical'
                                />
                            )
                    }
                </DataWrapper>
            </Col>
        </Row>
    )
}