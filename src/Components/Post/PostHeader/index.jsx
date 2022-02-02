import React from 'react'
import moment from 'moment'
import {Col, Row} from 'antd'
import {PostMore} from '../PostMore'
import {Link} from 'react-router-dom'
import {useStore} from 'effector-react'
import {PostInfoWrapper, PostOwnerNameWrapper, PostTime} from '../style'
import {$appModel} from '../../../Models/app'
import {usePostMore} from '../../../Hooks/post'
import {MoreVerticalSvg} from '../../../Icons/More'
import {Trans, useTranslation} from 'react-i18next'
import {Text} from '../../../UIComponents/Typography/Text'
import {IconBox} from '../../../UIComponents/GlobalStyles'
import {Title} from '../../../UIComponents/Typography/Title'
import {Avatar} from '../../../UIComponents/Avatar'

export const PostHeader = (
    {
        name,
        data,
        date,
        anons,
        imgUrl,
        newDuty,
        postOwner,
        newAvatar,
        isOfficial,
        handlePush
    }
) => {
    const {t} = useTranslation()
    const {$app: {token}} = useStore($appModel)
    const {show, setShow, postRef} = usePostMore()
    
    
    return (
        <PostInfoWrapper>
            <Row
                align='top'
                wrap={false}
                justify='space-between'
            >
                <Col onClick={handlePush}>
                    <Avatar
                        imgUrl={imgUrl}
                        size={40}
                    />
                </Col>
                <Col
                    flex={1}
                    onClick={handlePush}
                >
                    {
                        data?.author?.type &&
                        <PostOwnerNameWrapper>
                            <Title>{name}</Title>
                            <PostTime>
                                {date}
                            </PostTime>
                        </PostOwnerNameWrapper>
                    }
                    {
                        (postOwner || anons || newDuty || newAvatar) ? (
                            <>
                                {
                                    postOwner &&
                                    <Text>
                                        {t('reposted_post')}
                                        <Link
                                            to={`/@${postOwner.author.slug_name}/tape`}
                                            style={{color: '#262626'}}
                                        >
                                            <span>{postOwner.author.name}</span>
                                        </Link>
                                    </Text>
                                }
                                {
                                    anons && (
                                        <Text>
                                            <Trans
                                                i18nKey='anons_start'
                                                values={{
                                                    d: moment(anons).format('DD.MM.YYYY'),
                                                    t: moment(anons).format('HH:mm')
                                                }}
                                            >
                                                <span/>
                                            </Trans>
                                        </Text>
                                    )
                                }
                                {
                                    newDuty &&
                                    <Text>
                                        {`${newDuty.job.name} `}<span>{newDuty.org.name}</span>
                                    </Text>
                                }
                                {
                                    newAvatar &&
                                    <Text>
                                        {t('updated_profile_photo')}
                                    </Text>
                                }
                            </>
                        ) : (
                            <Text>
                                {data.author.sub_text}
                            </Text>
                        )
                    }
                </Col>
                {
                    !!token && (
                        <Col
                            ref={postRef}
                            onClick={() => setShow(!show)}
                        >
                            <IconBox>
                                <MoreVerticalSvg/>
                                {
                                    show
                                    && <PostMore
                                        data={data}
                                        postRef={postRef}
                                        setShow={setShow}
                                    />
                                }
                            </IconBox>
                        </Col>
                    )
                }
            </Row>
        </PostInfoWrapper>
    )
}