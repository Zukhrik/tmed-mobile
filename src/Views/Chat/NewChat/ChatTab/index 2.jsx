import React, {useCallback} from 'react'
import {useUrlParams} from '../../../../Hooks/app'
import {URL_KEYS, URL_VALUES} from '../../../../Constants'
import {Title} from '../../../../UIComponents/Typography/Title'
import {ChatSeparateTitle} from '../../style'
import {useTranslation} from 'react-i18next'
import {NavLink, useLocation} from 'react-router-dom'
import {$chatModel, chatAllGroupMount, chatAllUserMount} from '../../../../Models/chat-model'
import {useStore} from 'effector-react'

export const ChatNewTab = () => {
    const {urlData} = useUrlParams()
    const search = urlData[URL_KEYS.SEARCH]
    const {$searchContact: {result}} = useStore($chatModel)
    const {pathname} = useLocation()
    const tab = urlData[URL_KEYS.TAB]
    const {t} = useTranslation()


    const handleClick = useCallback((id, requestFunc) => {
        const params = {
            clear: true,
            params: {
                limit: 20,
                offset: 0,
                search
            }
        }
        if (!result[id] || (result[id] && result[id].search !== search)) {
            requestFunc(params)
        }
    }, [result, search])

    const tabs = [
        {
            id: URL_VALUES.PEOPLE,
            title: 'users',
            requestFunc: chatAllUserMount,
        },
        // {
        //     id: URL_VALUES.ORGANIZATION,
        //     title: 'organizations',
        //     requestFunc: chatAllOrgMount
        // },
        {
            id: URL_VALUES.GROUP,
            title: 'groups',
            requestFunc: chatAllGroupMount
        }
    ]

    const generatePath = useCallback((id) => {
        const query = []

        query.push(`${URL_KEYS.TAB}=${id}`)

        if (search) {
            query.push(`${URL_KEYS.SEARCH}=${search}`)
        }

        return {
            pathname,
            search: query.join('&')
        }
    }, [pathname, search])


    return (
        <ChatSeparateTitle style={{paddingLeft: search && 0, paddingRight: search && 0, marginBottom: search && 16}}>
            {
                search
                    ? tabs.map((item) => (
                        <NavLink
                            key={item.id}
                            to={generatePath(item.id)}
                            isActive={() => tab && tab === item.id}
                            onClick={() => handleClick(item.id, item.requestFunc)}
                        >
                            {t(item.title)}
                        </NavLink>
                    ))
                    : (
                        <Title level={4}>
                            {t('contacts')}
                        </Title>
                    )
            }
        </ChatSeparateTitle>
    )
}