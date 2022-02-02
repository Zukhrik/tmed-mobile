import {useStore} from 'effector-react'
import {useCallback, useEffect} from 'react'
import {$tapeModel, allTapeMount, resetAllTapeWithTokenMount} from '../../Models/tape-model'

const initialParams = {
    limit: 10,
    offset: 0
}

export function useAllTape() {
    const {$allTape: {result}} = useStore($tapeModel)
    
    const loadMore = useCallback(() => {
        if (result.nextOffset) {
            const data = {
                params: {
                    ...initialParams,
                    offset: result.nextOffset
                }
            }
            allTapeMount(data)
        }
    }, [result.nextOffset])
    
    useEffect(() => {
        resetAllTapeWithTokenMount()
        allTapeMount({params: initialParams})
    }, [])
    
    return {
        loadMore
    }
}