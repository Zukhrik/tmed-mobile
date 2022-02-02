import {useStore} from 'effector-react'
import {useParams} from 'react-router-dom'
import {useCallback, useEffect} from 'react'
import {$tapeModel, authorTapeMount, resetAuthorTape} from '../../Models/tape-model'

const initialParams = {
    limit: 10,
    offset: 0
}

export function useAuthorTape() {
    const {username, organization} = useParams()
    const {$authorTape: {result}} = useStore($tapeModel)
    
    const getList = useCallback((params) => {
        const data = {
            author: username ? `@${username}` : organization,
            ...params
        }
        authorTapeMount(data)
    }, [username, organization])
    
    const loadMore = useCallback(() => {
        if (result.nextOffset) {
            const data = {
                params: {
                    ...initialParams,
                    offset: result.nextOffset
                }
            }
            getList(data)
        }
    }, [result.nextOffset, getList])
    
    useEffect(() => {
        const data = {
            params: initialParams,
            clear: true
        }
        getList(data)
        
        return () => {
            resetAuthorTape()
        }
    }, [getList])
    
    return {
        loadMore
    }
}