import moment from 'moment'
import {useCallback} from 'react'
import {useStore} from 'effector-react'
import {$appModel} from '../../Models/app'
import localization from 'moment/locale/uz-latn'

export function useChangeDateLang() {
    const {$appLang: lang} = useStore($appModel)
    
    const accountLang = useCallback(() => {
        if (lang === 'uz') {
            return 'uz-latn'
        } else {
            return lang
        }
    }, [lang])
    
    const changeDateLang = useCallback((date) => {
        return moment(date).locale(accountLang(), localization).startOf('minutes').fromNow()
    }, [accountLang])
    
    return {changeDateLang}
}