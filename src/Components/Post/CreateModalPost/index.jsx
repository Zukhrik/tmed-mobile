import React from 'react'
import {Col, Row} from 'antd'
import {ShortCard} from '../../Cards'
import {useStore} from 'effector-react'
import {useTranslation} from 'react-i18next'
import {FixedHeader} from '../../FixedHeader'
import {CameraSvg} from '../../../Icons/Camera'
import {GallerySvg} from '../../../Icons/Gallery'
import {CloseMiniSvg} from '../../../Icons/Close'
import {useCreatingPost} from '../../../Hooks/post'
import {$tapeModel} from '../../../Models/tape-model'
import {$accountModel} from '../../../Models/account-model'
import {CreatePostFixedHeader} from './create-post-fixed-header'
import {IconBox, RootContent} from '../../../UIComponents/GlobalStyles'
import {CreatePostBodyWrapper, CreateTextarea, PostImageItem, PostImagesScrollBlock} from '../style'

export const CreateModalPost = ({setCreatePost}) => {
    const {t} = useTranslation()
    const {$postMedia: {data}} = useStore($tapeModel)
    const {$profiles: {currentProfile}} = useStore($accountModel)
    const {title, setTitle, handleSubmit, handleAddFiles, handleDeleted} = useCreatingPost(setCreatePost)
    
    
    return (
        <RootContent
            height='100vh'
            paddingTop='62px'
        >
            <FixedHeader
                component={<CreatePostFixedHeader
                    goBack={() => setCreatePost(false)}
                    handleCreate={handleSubmit}
                />}
            />
            <CreatePostBodyWrapper>
                <Row gutter={[0, 12]}>
                    <Col span={24} className='padding'>
                        <ShortCard
                            imgSize={40}
                            imgUrl={currentProfile && currentProfile?.avatar}
                            name={currentProfile && currentProfile?.name}
                            text={currentProfile && currentProfile?.category?.name}
                        />
                    </Col>
                    <Col span={24} className='padding'>
                        <CreateTextarea
                            rows='4'
                            minHeight={title.trim().length > 200 && 200}
                            cols='50'
                            value={title}
                            placeholder={t('anything_news')}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Col>
                    <Col
                        span={24}
                    >
                        <PostImagesScrollBlock>
                            {
                                data && data.length > 0 && data.map((item, idx) => (
                                    <PostImageItem
                                        key={`${idx + 1}`}
                                    >
                                        <img
                                            alt={item.id}
                                            src={item.stringUrl}
                                        />
                                        <IconBox onClick={() => handleDeleted(item)}>
                                            <CloseMiniSvg/>
                                        </IconBox>
                                    </PostImageItem>
                                ))
                            }
                        </PostImagesScrollBlock>
                    </Col>
                    <Col span={24} className='actions-wrapper'>
                        <label>
                            <input
                                multiple
                                type='file'
                                capture='camera'
                                accept='image/*'
                                onChange={(e) => handleAddFiles(e.target.files)}
                            />
                            <CameraSvg/>
                        </label>
                        <label>
                            <input
                                multiple
                                type='file'
                                accept='image/*'
                                onChange={(e) => handleAddFiles(e.target.files)}
                            />
                            <GallerySvg/>
                        </label>
                    </Col>
                </Row>
            </CreatePostBodyWrapper>
        </RootContent>
    )
}