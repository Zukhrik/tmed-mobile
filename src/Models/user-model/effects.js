import user from '../../Service/user'
import {createEffect} from 'effector/compat'

export const fetchAllUsers = createEffect({
    handler: user.getAllUsers
})

export const fetchUser = createEffect({
    handler: user.getUser
})

export const fetchUserSubsMe = createEffect({
    handler: user.getUserSubsMe
})

export const fetchUserSubsMy = createEffect({
    handler: user.getUserSubsMy
})

export const fetchSubscribeToUser = createEffect({
    handler: user.subscribeToUser
})

export const fetchRecommendUsers = createEffect({
    handler: user.getRecommendUsers
})

export const fetchUnsubscribeFromUser = createEffect({
    handler: user.unsubscribeFromUser
})