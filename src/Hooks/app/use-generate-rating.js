import {useCallback} from 'react'
import {RATING} from '../../Constants'

export function useGenerateRating(aesthetics, ethics, professional) {
    const generateRating = useCallback((rating) => {
        switch (rating) {
            case RATING.AESTHETICS:
                return aesthetics
            case RATING.ETHICS:
                return ethics
            case RATING.PROFESSIONAL:
                return professional
            default:
                return null
        }
    }, [ethics, aesthetics, professional])
    
    return {generateRating}
}