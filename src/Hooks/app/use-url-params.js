import {useLocation} from 'react-router-dom'
import {useCallback, useEffect, useState} from 'react'

export function useUrlParams(param) {
    const {search} = useLocation()
    const [urlParams, setUrlParams] = useState()
    const [urlData, setUrlData] = useState({})
    
    const generateUrlParams = useCallback(() => {
        const searchParams = new URLSearchParams(search)
        const newUrl = {}
        
        for (let pair of searchParams.entries()) {
            newUrl[pair[0]] = pair[1]
        }
        
        setUrlData(newUrl)
        
        if (param) {
            if (Array.isArray(param) && param.length > 0) {
                param.forEach(item => searchParams.delete(item))
            }
            if (typeof param === 'string') {
                searchParams.delete(param)
            }
        }
        
        if (search.trim().length > 0) {
            setUrlParams(searchParams.toString())
        } else {
            setUrlParams(null)
        }
        
    }, [search, param])
    
    
    useEffect(() => {
        generateUrlParams()
    }, [generateUrlParams])
    
    return {urlData, urlParams}
}