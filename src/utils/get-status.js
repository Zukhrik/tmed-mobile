import i18n from '../Config/lang'

export const getStatus = (status) => {
    switch (status) {
        case -1:
            return {text: i18n.t('canceled'), color: '#FF5A5F'}
        case 0:
            return {text: i18n.t('awaiting'), color: '#FD9644'}
        case 1:
            return {text: i18n.t('approved'), color: '#2BCBBA'}
        case 2:
            return {text: i18n.t('QR_Code_scanned'), color: ''}
        case 5:
            return {text: i18n.t('finished'), color: '#FF5A5F'}
        default:
    }
}