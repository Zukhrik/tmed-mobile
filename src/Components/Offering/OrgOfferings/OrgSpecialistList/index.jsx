import React, {useCallback} from 'react'
import {Col, Row} from 'antd'
import {useStore} from 'effector-react'
import {useParams} from 'react-router-dom'
import {URL_KEYS} from '../../../../Constants'
import {$appModel} from '../../../../Models/app'
import {INFO_MAT} from '../../../../Constants/app'
import {useUrlGenerate} from '../../../../Hooks/org'
import {DataWrapper, SpecialistNavLink} from '../style'
import {ShortCard, ShortCardSkeleton} from '../../../Cards'
import {truncateString} from '../../../../utils/stringUtils'
import {generateSkeleton} from '../../../../utils/skeleton-utils'
import {$orgModel, orgSpecialistsMount} from '../../../../Models/org-model'

const skeleton = generateSkeleton(10)
const initialParams = {
    limit: 20,
    offset: 0
}
export const OrgSpecialistList = () => {
    const {organization} = useParams()
    const {$device} = useStore($appModel)
    const {getActive, generateUrl} = useUrlGenerate()
    const {$orgSpecialistsList: {data, forceLoading, result, loading}} = useStore($orgModel)
    
    const handleScroll = useCallback((e) => {
        if (e.target.scrollLeft + e.target.offsetWidth >= e.target.scrollWidth && !loading && !!result.next) {
            if (result.next) {
                const data = {
                    organization: organization,
                    params: {
                        ...initialParams,
                        offset: result.nextOffset
                    }
                }
                
                orgSpecialistsMount(data)
            }
        }
    }, [loading, result, organization])
    
    
    return (
        <DataWrapper onScroll={(e) => handleScroll(e)}>
            {
                forceLoading === 2 && data.length > 0 && data.map((item, idx) => (
                    <SpecialistNavLink
                        key={`${idx + 1}`}
                        to={generateUrl(URL_KEYS.SPECIALIST_ID, item.id)}
                        isActive={() => getActive(URL_KEYS.SPECIALIST_ID, item.id)}
                    >
                        <ShortCard
                            textLineClamp={2}
                            direction='vertical'
                            imgUrl={item.user.avatar}
                            name={item.user.full_name}
                            text={truncateString(item.job.name, 22)}
                            nameSize={$device && $device === INFO_MAT ? 3 : 5}
                            textSize={$device && $device === INFO_MAT ? 4 : ''}
                            imgSize={$device && $device === INFO_MAT ? 80 : 60}
                            active={getActive(URL_KEYS.SPECIALIST_ID, item.id)}
                        />
                    </SpecialistNavLink>
                ))
            }
            {
                $device && $device === INFO_MAT && (forceLoading === 1 || forceLoading === 0) && (
                    <Row wrap={false} gutter={[24, 0]}>
                        {
                            skeleton.map((item, idx) => (
                                <Col
                                    key={`${idx + 1}`}
                                >
                                    <ShortCardSkeleton
                                        size={80}
                                        nameSize={24}
                                        textSize={32}
                                        direction='vertical'
                                    />
                                </Col>
                            ))
                        }
                    </Row>
                )
            }
        </DataWrapper>
    )
}