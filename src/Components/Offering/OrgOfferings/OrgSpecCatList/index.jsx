import React, {useCallback} from 'react'
import {useStore} from 'effector-react'
import {URL_KEYS} from '../../../../Constants'
import {$appModel} from '../../../../Models/app'
import {useUrlParams} from '../../../../Hooks/app'
import {INFO_MAT} from '../../../../Constants/app'
import {useHistory, useParams} from 'react-router-dom'
import {CategoryItemWrap, CatItemNavLink, DataWrapper} from '../style'
import {$orgModel, orgSpecialistCatMount} from '../../../../Models/org-model'


const initialParams = {
    limit: 20,
    offset: 0
}
export const OrgSpecCatList = () => {
    const {urlData} = useUrlParams()
    const {organization} = useParams()
    const {$device} = useStore($appModel)
    const {location: {pathname}} = useHistory()
    const {$orgSpecialistCat: {data, loading, result}} = useStore($orgModel)
    const generateUrl = useCallback((url_keys, id) => {
        const url = []
        
        if (!urlData[url_keys] || urlData[url_keys] !== String(id)) {
            url.push(`${url_keys}=${id}`)
        }
        
        return {
            pathname,
            search: url.join('&')
        }
        
    }, [pathname, urlData])
    
    const getActive = useCallback((url_keys, id) => {
        return urlData[url_keys] && urlData[url_keys] === String(id)
    }, [urlData])
    
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
                orgSpecialistCatMount(data)
            }
        }
    }, [result, organization, loading])
    
    return (
        <DataWrapper onScroll={(e) => handleScroll(e)}>
            <CategoryItemWrap>
                {
                    data && data.map((item, idx) => (
                        <CatItemNavLink
                            key={`${idx + 1}`}
                            fontSize={$device && $device === INFO_MAT ? '20px' : ''}
                            marginright={$device && $device === INFO_MAT ? '24px' : ''}
                            to={generateUrl(URL_KEYS.SPECIALIST_CATEGORY_ID, item.id)}
                            isActive={() => getActive(URL_KEYS.SPECIALIST_CATEGORY_ID, item.id)}
                        >
                            {item.name}
                        </CatItemNavLink>
                    ))
                }
            </CategoryItemWrap>
        </DataWrapper>
    )
}