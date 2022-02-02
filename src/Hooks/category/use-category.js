import {LISTS} from '../../Constants'
import {useStore} from 'effector-react'
import {useCallback, useEffect, useState} from 'react'
import {$regionModel, userRegionMount} from '../../Models/region-model'
import {$categoryModel, categoryForceLoading, userCatListMount} from '../../Models/category-model'

const initialParams = {
    parent: 0,
    params: {
        limit: 20,
        offset: 0,
        show_empties: '1'
    }
}

export function useCategory({listType, onChange, onClose}) {
    const [breadcrumb, setBreadcrumb] = useState([])
    const [selected, setSelected] = useState(null)
    const [parent, setParent] = useState(0)
    const {$categoryList, $categoryList: {result}} = useStore($categoryModel)
    const [list, setList] = useState({})
    const {$userRegion} = useStore($regionModel)
    const [searchValue, setSearchValue] = useState('')
    
    const getList = useCallback((params) => {
        if (listType === LISTS.USER_CATEGORY) {
            userCatListMount(params)
        }
        
        if (listType === LISTS.REGION) {
            userRegionMount(params)
        }
        
    }, [listType])
    
    const getChildren = useCallback((item) => {
        const parentId = item.slug ? item.slug : item.id
        const data = {
            clear: true,
            ...initialParams,
            parent: parentId
        }
        
        categoryForceLoading()
        setParent(String(parentId))
        setBreadcrumb([...breadcrumb, {...item}])
        getList(data)
    }, [getList, breadcrumb])
    
    const renderList = useCallback(() => {
        if (listType === LISTS.USER_CATEGORY) {
            setList($categoryList)
        }
        
        if (listType === LISTS.REGION) {
            setList($userRegion)
        }
        
    }, [listType, $categoryList, $userRegion])
    
    const loadMore = useCallback(() => {
        if (result?.nextOffset) {
            const data = {
                ...initialParams,
                parent,
                params: {
                    ...initialParams.params,
                    offset: result?.nextOffset
                }
            }
            getList(data)
        }
        
    }, [getList, parent, result])
    
    const onSelect = useCallback((item) => {
        if (selected && selected.id === item.id) {
            setSelected(null)
        } else {
            setSelected(item)
        }
    }, [selected])
    
    const handleAccept = useCallback(() => {
        onChange(selected)
        onClose()
    }, [onChange, selected, onClose])
    
    const handleSubmit = (e) => {
        e.preventDefault()
        if (searchValue.trim().length > 0) {
            if (listType === 'user_category') {
                const data = {
                    ...initialParams,
                    clear: true,
                    params: {
                        ...initialParams.params,
                        search: searchValue
                    }
                }
                userCatListMount(data)
            }
            
            if (listType === 'region') {
                const data = {
                    ...initialParams,
                    clear: true,
                    params: {
                        ...initialParams.params,
                        search: searchValue
                    }
                }
                userRegionMount(data)
            }
        }
    }
    
    const handleClick = (e, id) => {
        e.preventDefault()
        const data = {
            ...initialParams,
            parent: id,
            clear: true
        }
        
        if (id === 0) {
            setBreadcrumb([])
        } else {
            const idx = breadcrumb.findIndex(item => item.id === id)
            const newData = [...breadcrumb.slice(0, idx + 1)]
            setBreadcrumb(newData)
        }
        categoryForceLoading()
        setParent(id)
        getList(data)
    }
    
    useEffect(() => {
        let timeout = null
        
        timeout = setTimeout(() => {
            categoryForceLoading()
            const data = {
                clear: true,
                ...initialParams
            }
            setBreadcrumb([])
            setParent(0)
            getList(data)
        }, 200)
        
        return () => {
            clearTimeout(timeout)
            timeout = null
        }
    }, [getList])
    
    useEffect(() => {
        renderList()
    }, [renderList])
    
    
    return {
        list,
        parent,
        loadMore,
        onSelect,
        selected,
        breadcrumb,
        getChildren,
        searchValue,
        handleClick,
        handleSubmit,
        handleAccept,
        setSearchValue
    }
}