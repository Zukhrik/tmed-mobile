import React, {useCallback} from 'react'
import {Col, Row} from 'antd'
import {useStore} from 'effector-react'
import {OfferGroupWrapper} from '../style'
import {useHistory} from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import {URL_KEYS} from '../../../../Constants'
import {$appModel} from '../../../../Models/app'
import {INFO_MAT} from '../../../../Constants/app'
import {useUrlParams} from '../../../../Hooks/app'
import {useScrollLeft} from '../../../../Hooks/org'
import {OfferingGroupItem} from '../OfferingGroupItem'
import {Text} from '../../../../UIComponents/Typography/Text'
import {generateSkeleton} from '../../../../utils/skeleton-utils'
import {$offeringsModel} from '../../../../Models/offerings-model'
import {OfferingGroupItemSkeleton} from '../OfferingGroupItemSkeleton'


const skeleton = generateSkeleton(20)
export const OrgOfferingGroup = () => {
    const {t} = useTranslation()
    const {urlData} = useUrlParams()
    const {$device} = useStore($appModel)
    const {handleScroll} = useScrollLeft()
    const {location: {pathname}} = useHistory()
    const groupId = urlData[URL_KEYS.OFFERING_GROUP_ID]
    const {$offeringGroupList: {data, forceLoading}} = useStore($offeringsModel)
    
    const generateUrl = useCallback((id) => {
        const url = []
        if (urlData[URL_KEYS.SPECIALIST_CATEGORY_ID]) {
            url.push(`${URL_KEYS.SPECIALIST_CATEGORY_ID}=${urlData[URL_KEYS.SPECIALIST_CATEGORY_ID]}`)
        }
        
        if (urlData[URL_KEYS.SPECIALIST_ID]) {
            url.push(`${URL_KEYS.SPECIALIST_ID}=${urlData[URL_KEYS.SPECIALIST_ID]}`)
        }
        
        if (!groupId || groupId !== String(id)) {
            url.push(`${URL_KEYS.OFFERING_GROUP_ID}=${id}`)
        }
        
        return {
            pathname,
            search: url.join('&')
        }
    }, [pathname, groupId, urlData])
    
    
    return (
        <>
            {
                $device && $device === INFO_MAT &&
                <Text
                    className='group-text-style'
                    style={{
                        fontSize: 18,
                        color: 'var(--grey-dwed)',
                        padding: '0 12px',
                        marginBottom: 8
                    }}
                >
                    {t('chapter')}
                </Text>
            }
            <OfferGroupWrapper onScroll={(e) => handleScroll(e)}>
                <Row wrap={false} gutter={$device && $device !== INFO_MAT ? [20, 0] : [28, 0]}>
                    {
                        forceLoading === 2
                            ? (
                                data.map((item) => (
                                    <Col key={item.id}>
                                        <OfferingGroupItem
                                            size={$device && $device === INFO_MAT ? 110 : 75}
                                            shape='square'
                                            name={item.name}
                                            imgUrl={item.image}
                                            path={generateUrl(item.id)}
                                            isActive={() => groupId && groupId === String(item.id)}
                                        />
                                    </Col>
                                ))
                            )
                            : (
                                skeleton.map((item, idx) => (
                                    <Col
                                        key={`${idx + 1}`}
                                    >
                                        <OfferingGroupItemSkeleton/>
                                    </Col>
                                ))
                            )
                    }
                </Row>
            </OfferGroupWrapper>
        </>
    )
}