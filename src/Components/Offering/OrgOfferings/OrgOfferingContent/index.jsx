import React from 'react'
import {ShortInfo} from '../../../ShortInfo'
import {useTranslation} from 'react-i18next'
import {OfferingsList} from '../../../../Views/Organization/organisms'
import {OrgSpecCatList} from '../OrgSpecCatList'
import {OrgOfferingGroup} from '../OrgOfferingGroup'
import {OrgSpecialistList} from '../OrgSpecialistList'
import {useOfferingList} from '../../../../Hooks/offerings'
import {useOrgSpecialistLists} from '../../../../Hooks/org'

export const OrgOfferingContent = ({subs, imgUrl}) => {
    const {t} = useTranslation()
    const {loadMoreOfferings} = useOfferingList()
    useOrgSpecialistLists()
    
    return (
        <>
            <ShortInfo
                imgSize={56}
                imgUrl={imgUrl}
                text={t('subscribers')}
                name={String(subs)}
            />
            <OrgSpecCatList/>
            <OrgSpecialistList/>
            <OrgOfferingGroup/>
            <OfferingsList loadMore={loadMoreOfferings}/>
        </>
    )
}