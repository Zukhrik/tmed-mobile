import {createEvent} from 'effector'
import {
    fetchAllUsers,
    fetchRecommendUsers,
    fetchSubscribeToUser,
    fetchUnsubscribeFromUser,
    fetchUser,
    fetchUserSubsMe,
    fetchUserSubsMy
} from './effects'

export const userMount = createEvent()
export const resetUser = createEvent()
export const allUserMount = createEvent()
export const userSubsMeMount = createEvent()
export const userSubsMyMount = createEvent()
export const onlineUserMount = createEvent()
export const usersSubsMeMount = createEvent()
export const recommendUsersMount = createEvent()
export const subscribeToUserMount = createEvent()
export const onlineUserMountFromIDB = createEvent()
export const unsubscribeFromUserMount = createEvent()
export const subscribeToRecommendUserMount = createEvent()
export const unsubscribeFromFallsMount = createEvent()

userMount.watch(fetchUser)
allUserMount.watch(fetchAllUsers)
userSubsMeMount.watch(fetchUserSubsMe)
userSubsMyMount.watch(fetchUserSubsMy)
recommendUsersMount.watch(fetchRecommendUsers)
subscribeToUserMount.watch(fetchSubscribeToUser)
unsubscribeFromUserMount.watch(fetchUnsubscribeFromUser)
subscribeToRecommendUserMount.watch(fetchSubscribeToUser)
unsubscribeFromFallsMount.watch(fetchUnsubscribeFromUser)