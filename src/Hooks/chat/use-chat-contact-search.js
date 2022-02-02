import {useUrlParams} from '../app'
import {URL_KEYS, URL_VALUES} from '../../Constants'
import {useCallback, useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {debounce} from '../../utils/debounce-utils'
import {$chatModel, chatAllGroupMount, chatAllUserMount} from '../../Models/chat-model'
import {useStore} from 'effector-react'

const initialParams = {
    limit: 20,
    offset: 0
}

export function useChatContactSearch() {
    const {urlData} = useUrlParams()
    const search = urlData[URL_KEYS.SEARCH]
    const tab = urlData[URL_KEYS.TAB]
    const {push, location: {pathname}} = useHistory()
    const [searchText, setSearchText] = useState(null)
    const [mounted, setMounted] = useState(false)
    const {$searchContact: {result}} = useStore($chatModel)

    const getList = useCallback((params, validate = false) => {
        if (tab) {
            if(validate) {
                if (tab === URL_VALUES.PEOPLE) {
                    chatAllUserMount(params)
                }

                // if(tab === URL_VALUES.ORGANIZATION) {
                //     chatAllOrgMount(params)
                // }

                if (tab === URL_VALUES.GROUP) {
                    chatAllGroupMount(params)
                }
            }else {
                chatAllUserMount(params)
                chatAllGroupMount(params)
            }
        }
    }, [tab])

    const getNextOffset = useCallback(() => {
        let nextOffset
        if (tab === URL_VALUES.PEOPLE) {
            nextOffset = result[URL_VALUES.PEOPLE] && result[URL_VALUES.PEOPLE].nextOffset
        }

        // if(tab === URL_VALUES.ORGANIZATION) {
        //     chatAllOrgMount(params)
        // }

        if (tab === URL_VALUES.GROUP) {
            nextOffset = result[URL_VALUES.GROUP] && result[URL_VALUES.GROUP].nextOffset
        }

        return nextOffset
    }, [result, tab])

    const onChange = useCallback((value) => {
        if (value.length > 2) {
            const query = []
            const data = {
                clear: true,
                params: {
                    ...initialParams,
                    search: value
                }
            }

            if (tab) {
                query.push(`${URL_KEYS.TAB}=${tab}`)
            } else {
                query.push(`${URL_KEYS.TAB}=${URL_VALUES.PEOPLE}`)
            }

            query.push(`${URL_KEYS.SEARCH}=${value}`)

            push({
                pathname,
                search: query.join('&')
            })
            debounce(getList(data), 300)
        } else {
            push(pathname)
        }
        setSearchText(value)
    }, [push, pathname, tab, getList])

    const loadMore = useCallback(() => {
        const nextOffset = getNextOffset()

        if(nextOffset) {
            const data = {
                params: {
                    ...initialParams,
                    search,
                    offset: nextOffset
                }
            }

            getList(data, true)
        }
    }, [getNextOffset, search, getList])

    useEffect(() => {
        let timeout = null

        if (!mounted && search && search.length > 2) {
            timeout = setTimeout(() => {
                const data = {
                    clear: true,
                    params: {
                        ...initialParams,
                        search
                    }
                }

                getList(data)
                setMounted(true)
            }, 300)
        }

        return () => {
            clearTimeout(timeout)
            timeout = null
        }
    }, [search, mounted, getList])


    useEffect(() => {
        if (!searchText) {
            if (search) {
                setSearchText(search)
            } else {
                setSearchText(null)
            }
        }
    }, [search, searchText])

    return {searchText, onChange, loadMore}
}