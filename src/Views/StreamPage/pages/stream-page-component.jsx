import React from 'react'
import {Col, Row} from 'antd'
import {ChatSvg} from '../../../Icons/Chat'
import {useTranslation} from 'react-i18next'
import {Avatar} from '../../../UIComponents/Avatar'
import {DwedPlayer} from '../../../Components/Player'
import {Text} from '../../../UIComponents/Typography/Text'
import {FixedHeader} from '../../../Components/FixedHeader'
import {Title} from '../../../UIComponents/Typography/Title'
import {IconBox, StreamBlurBackground} from '../../../UIComponents/GlobalStyles'
import {ChatComponentWrapper, ChatWrapper, PlayerInfoWrapper, PlayerWrapper, StreamPageWireframeWrapper} from '../atoms'


export const StreamPageComponent = (
    {
        logo,
        live,
        text,
        name,
        title,
        goBack,
        viewers,
        videoUlr,
        openChat,
        thumbnail,
        description,
        setOpenChat,
        logoPushUrl,
        scheduleCard,
        chatComponent
    }
) => {
    const {t} = useTranslation()
    
    
    return (
        <StreamPageWireframeWrapper>
            <FixedHeader
                title={title}
                goBack={goBack}
            />
            <ChatWrapper
                display={openChat ? 'none' : ''}
                onClick={() => setOpenChat(true)}
            >
                <IconBox>
                    <ChatSvg/>
                </IconBox>
            </ChatWrapper>
            <PlayerWrapper>
                {
                    live?.length > 0
                        ? <DwedPlayer
                            logo={logo}
                            url={videoUlr}
                            autoplay={true}
                            logoPushUrl={logoPushUrl}
                        />
                        : <StreamBlurBackground
                            src={thumbnail}
                            height={210}
                        >
                            <img src={thumbnail} alt={thumbnail}/>
                        </StreamBlurBackground>
                }
            </PlayerWrapper>
            {
                !openChat
                    ? (
                        <PlayerInfoWrapper>
                            <Row
                                wrap={false}
                                className='padding'
                            >
                                <Col style={{paddingRight: 8}}>
                                    <Avatar
                                        size={48}
                                        imgUrl={logo}
                                    />
                                </Col>
                                <Col
                                    flex={1}
                                    className='channel-info-wrapper'
                                >
                                    <Title>{name}</Title>
                                    <Text>{text}</Text>
                                    {/*<CategoriesWrapper>*/}
                                    {/*    <Button>category</Button>*/}
                                    {/*</CategoriesWrapper>*/}
                                    <Text>{`${viewers} ${t('viewers')}`}</Text>
                                </Col>
                            </Row>
                            <div className='description padding padding-top'>
                                <Text className='description-title'>{t('description')}</Text>
                                <Text>
                                    {description}
                                </Text>
                            </div>
                            <div className='padding'>
                                {scheduleCard}
                            </div>
                        </PlayerInfoWrapper>
                    ) : (
                        <ChatComponentWrapper>
                            {chatComponent}
                        </ChatComponentWrapper>
                    )
            }
        </StreamPageWireframeWrapper>
    )
}