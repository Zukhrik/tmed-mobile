import {HomeSvg} from '../Icons/Home'
import {ProfileSvg} from '../Icons/People'
import {LogInSvg} from '../Icons/ProfMenuIcons'
import {resetOfferingModelStoreList} from '../Models/offerings-model'
import {OfferingSvg} from '../Icons/Offering'

const generatePath = (defaultPath, customPath = false) => {
    return customPath ? customPath : defaultPath
}

export const bottomNavbarWithToken = [
    {
        id: 'org',
        path: '/',
        icon: HomeSvg,
        generatePath: generatePath,
        onClick: () => false
    },
    {
        id: 'records',
        path: '/records/my_orders',
        icon: OfferingSvg,
        generatePath: generatePath,
        onClick: () => false
    },
    // {
    //     socketKey: 'chatUnreadCounter',
    //     id: 'chat',
    //     path: `/chat?${URL_KEYS.CHAT_TAB}=${URL_VALUES.ALL_CHATS}`,
    //     icon: ChatSvg,
    //     generatePath: generatePath,
    //     onClick: (action) => {
    //         if (action) {
    //             action()
    //         }
    //     }
    // },
    {
        id: 'profile',
        path: '/@:username',
        icon: ProfileSvg,
        generatePath: generatePath,
        onClick: () => {
            resetOfferingModelStoreList()
        }
    }
    // {
    //     id: 'menu',
    //     path: '/menu',
    //     icon: BurgerMenuSvg,
    //     generatePath: generatePath,
    //     onClick: () => false
    // }
]

export const bottomNavbarWithoutToken = [
    {
        id: 'tape',
        path: '/',
        icon: HomeSvg,
        generatePath: generatePath,
        onClick: () => false
    },
    {
        id: 'search',
        path: '/records/unregistered',
        icon: OfferingSvg,
        generatePath: generatePath,
        onClick: () => false
    },
    {
        id: '/sign-in',
        path: '/sign-in',
        icon: LogInSvg,
        generatePath: generatePath,
        onClick: () => false
    }
]