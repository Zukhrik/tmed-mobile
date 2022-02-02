import React from 'react'
import {useStore} from 'effector-react'
import {$appModel} from '../../Models/app'
import {INFO_MAT} from '../../Constants/app'
import {ArrowLeftSvg} from '../../Icons/Arrow'
import {Title} from '../../UIComponents/Typography/Title'
import {FixedHeaderInner, FixedHeaderWrapper} from './style'
import {Container, IconBox} from '../../UIComponents/GlobalStyles'

export const FixedHeader = ({component, title, goBack, hideBorder, top, height}) => {
    const {$device} = useStore($appModel)
    
    return (
        <FixedHeaderWrapper
            top={top ? top : '0'}
            hideBorder={hideBorder}
            height={$device && $device === INFO_MAT ? '80px' : height}
        >
            <Container>
                {
                    component
                        ? component
                        : (
                            <FixedHeaderInner>
                                <IconBox onClick={goBack}>
                                    <ArrowLeftSvg/>
                                </IconBox>
                                {
                                    !!title && (
                                        <Title>
                                            {title}
                                        </Title>
                                    )
                                }
                            </FixedHeaderInner>
                        )
                }
            </Container>
        </FixedHeaderWrapper>
    )
}