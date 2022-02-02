import React, {useState} from 'react'
import {Col, Row} from 'antd'
import {useStore} from 'effector-react'
import {RepostForm} from './RepostForm'
import {useParams} from 'react-router-dom'
import Carousel from 'react-multi-carousel'
import {useGoBack} from '../../Hooks/app'
import {useTranslation} from 'react-i18next'
import {CloseSvg} from '../../Icons/Close'
import {$appModel} from '../../Models/app'
import {useGetPost} from '../../Hooks/post'
import {ShortCard} from '../../Components/Cards'
import {$postModel} from '../../Models/post-model'
import {truncateString} from '../../utils/stringUtils'
import {Text} from '../../UIComponents/Typography/Text'
import {MediasWrapper, PostDescriptionWrapper} from './style'
import {ImageLazyLoad} from '../../UIComponents/ImageLazyLoad'
import {Container, IconBox, RootContent} from '../../UIComponents/GlobalStyles'


const responsive = {
    desktop: {
        breakpoint: {max: 3000, min: 1024},
        items: 1
    },
    tablet: {
        breakpoint: {max: 1024, min: 464},
        items: 1
    },
    mobile: {
        breakpoint: {max: 464, min: 0},
        items: 1
    }
}

export const RepostPage = () => {
    useGetPost()
    const {t} = useTranslation()
    const {post_id} = useParams()
    const {$app: {saveURL}} = useStore($appModel)
    const {$getPost: {data}} = useStore($postModel)
    const [show, setShow] = useState(false)
    const {goBack} = useGoBack({pathname: saveURL ? saveURL : '/'})
    
    return (
        <RootContent
            paddingBottom='50px'
        >
            {
                data && data[post_id] && (
                    <Container>
                        {
                            data[post_id].author && (
                                <Row align='middle' justify='space-between' style={{marginTop: 12}}>
                                    <Col flex={1}>
                                        <ShortCard
                                            imgSize={24}
                                            truncateLength={30}
                                            name={data[post_id].author.name}
                                            imgUrl={data[post_id].author.avatar}
                                            imgPath={`/${data[post_id].author.slug_name}`}
                                            path={data[post_id].author.type === 'user'
                                                ? `/@${data[post_id].author.slug_name}/tape`
                                                : `/${data[post_id].author.slug_name}/offerings`
                                            }
                                        />
                                    </Col>
                                    <Col>
                                        <IconBox onClick={goBack}>
                                            <CloseSvg/>
                                        </IconBox>
                                    </Col>
                                </Row>
                            )
                        }
                    </Container>
                )
            }
            {
                data && post_id && data[post_id] &&
                <MediasWrapper>
                    <Carousel
                        arrows={false}
                        responsive={responsive}
                        renderButtonGroupOutside
                        itemClass='offering-gallery-item'
                        showDots={data[post_id].medias.length > 1}
                    >
                        {
                            data[post_id].medias.map((item, idx) => (
                                <ImageLazyLoad
                                    key={`${idx + 1}`}
                                    src={item.thumbnail}
                                />
                            ))
                        }
                    </Carousel>
                </MediasWrapper>
            }
            {
                data[post_id] &&
                <Row gutter={[0, 12]} justify='center'>
                    <Col span={24}>
                        <Container>
                            <PostDescriptionWrapper>
                                {
                                    !show ? (
                                        <Text>
                                            {truncateString(data[post_id].text, 250)}
                                            {data[post_id].text && data[post_id].text.length > 250 &&
                                            <span onClick={() => setShow(!show)}>{t('more')}</span>}
                                        </Text>
                                    ) : (
                                        <Text>
                                            {data[post_id].text}
                                            <span onClick={() => setShow(!show)}>{t('hide')}</span>
                                        </Text>
                                    )
                                }
                            </PostDescriptionWrapper>
                        </Container>
                    </Col>
                    <Col span={24}>
                        <RepostForm post_id={post_id}/>
                    </Col>
                </Row>
            }
        </RootContent>
    )
}