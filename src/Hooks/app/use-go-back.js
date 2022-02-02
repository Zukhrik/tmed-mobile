import {useCallback} from 'react'
import {useHistory} from 'react-router-dom'

export function useGoBack(customPath) {
    const {push} = useHistory()
    
    const goBack = useCallback(() => {
        let url = {}
        if (customPath) {
            url = customPath
            push({...url})
        }
    }, [customPath, push])
    
    return {goBack}
}