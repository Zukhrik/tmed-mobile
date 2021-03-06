import {HatSvg} from '../Icons/Hat'
import {RATING} from '../Constants'
import {MilitaryTechSvg} from '../Icons/Medal'
import {HandShakeSvg} from '../Icons/HandShake'

export const degreesData = [
    {
        id: RATING.PROFESSIONAL,
        color: 'var(--professional-color)',
        shadow_color: 'rgba(131, 134, 141, 0.24)',
        icon: HatSvg
    },
    {
        id: RATING.ETHICS,
        color: 'var(--ethic-color)',
        shadow_color: 'rgba(131, 134, 141, 0.24)',
        icon: MilitaryTechSvg
    },
    {
        id: RATING.AESTHETICS,
        color: 'var(--aesthetic-color)',
        shadow_color: 'rgba(131, 134, 141, 0.24)',
        icon: HandShakeSvg
    }
]