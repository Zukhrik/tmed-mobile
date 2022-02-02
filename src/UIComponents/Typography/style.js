import styled, {css} from 'styled-components'

const defaultTitle = css`
  letter-spacing: 0;
  font-family: var(--medium-text);
  color: var(--dark-dwed);
`

const defaultText = css`
  font-family: var(--regular-text);
  letter-spacing: 0;
  color: var(--dark-dwed);
  font-style: normal;
`


const getLevel = ({level}) => {
    switch (level) {
        case 1 :
            return 32
        case 2 :
            return 24
        case 3 :
            return 20
        case 4 :
            return 16
        case 5 :
            return 14
        case 6 :
            return 10
        default :
            return 12
    }
}

const getTextFontFamily = ({weight}) => {
    switch (weight) {
        case 400:
            return 'var(--regular-text)'
        case 500:
            return 'var(--medium-text)'
        case 600:
            return 'var(--demi-text)'
        case 700:
            return 'var(--bold-text)'
        case 900:
            return 'var(--black-text)'
        default:
            return 'var(--regular-text)'
    }
}

const getTitleFontFamily = ({weight}) => {
    switch (weight) {
        case 400:
            return 'var(--regular-text)'
        case 500:
            return 'var(--medium-text)'
        case 600:
            return 'var(--demi-text)'
        case 700:
            return 'var(--bold-text)'
        case 900:
            return 'var(--black-text)'
        default:
            return 'var(--medium-text)'
    }
}

export const StyledText = styled.div`
  ${defaultText};
  color: ${({color}) => color ? color : 'var(--dark-dwed)'};
  font-size: ${getLevel}px;
  font-family: ${getTextFontFamily};
  text-align: ${({alignType}) => alignType ? alignType : 'unset'};
`

export const StyledTitle = styled.div`
  ${defaultTitle};
  font-size: ${getLevel}px;
  color: ${({color}) => color ? color : 'var(--dark-dwed)'};
  text-align: ${({alignType}) => alignType ? alignType : 'unset'};
  font-family: ${getTitleFontFamily};
`