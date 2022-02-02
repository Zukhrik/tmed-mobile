import React, {useCallback} from 'react'
import {TapePost} from '../TapePost'
import {TapeStream} from '../TapeStream'
import {TapePeople} from '../TapePeople'
import {TapeOfferings} from '../TapeOfferings'
import {useTapeInView} from '../../../Hooks/tape'
import {TapeOrganization} from '../TapeOrganization'

export const TapeItems = ({data}) => {
    const {ref: divRef} = useTapeInView()
    
    const renderBlocks = useCallback(() => {
        const {block_type, block_data} = data
        switch (block_type) {
            case 'streams':
                return <TapeStream data={block_data}/>
            case 'post':
                return <TapePost data={block_data}/>
            case 'users':
                return <TapePeople data={block_data}/>
            case 'orgs':
                return <TapeOrganization data={block_data}/>
            case 'offers':
                return <TapeOfferings data={block_data}/>
            default:
                return null
        }
    }, [data])
    
    const offeringPostId = data.block_type === 'post' && data.block_data.has_offerings && data.block_data.id
    
    return (
        <div ref={offeringPostId ? divRef : null} data-id={offeringPostId || 0}>
            {renderBlocks()}
        </div>
    )
}