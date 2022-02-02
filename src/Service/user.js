import {httpDelete, httpGet, httpPost} from './index'

export default {
    getAllUsers: ({params}) => httpGet({url: '/users/', params}),
    getUser: (username) => httpGet({url: `/users/${username}/`}),
    getRecommendUsers: ({params}) => httpGet({url: '/users/recommend/', params}),
    subscribeToUser: ({username}) => httpPost({url: `/users/${username}/subs/me/`}),
    unsubscribeFromUser: ({username}) => httpDelete({url: `/users/${username}/subs/me/`}),
    getUserSubsMe: ({username, params}) => httpGet({url: `/users/${username}/subs/me/`, params}),
    getUserSubsMy: ({username, params}) => httpGet({url: `/users/${username}/subs/my/`, params}),
    getUserOfferings: ({username, params}) => httpGet({url: `/users/${username}/offerings/`, params}),
    getUserOfferingsGroup: ({username, params}) => httpGet({url: `/users/${username}/offering_group/`, params}),
}