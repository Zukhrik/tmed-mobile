import React from 'react'
import {Col, Row} from 'antd'
import {useStore} from 'effector-react'
import {useTranslation} from 'react-i18next'
import {AttachSvg} from '../../../Icons/Attach'
import {useCreatingPost} from '../../../Hooks/post'
import {Button} from '../../../UIComponents/Button'
import {$tapeModel} from '../../../Models/tape-model'
import {CreatePostWrapper, CreateTextarea} from '../style'
import {IconBox} from '../../../UIComponents/GlobalStyles'

export const CreatePost = () => {
    const {t} = useTranslation()
    const {$postMedia: {data}} = useStore($tapeModel)
    const {
        title,
        postRef,
        setTitle,
        showPostForm,
        handleSubmit,
        handleAddFiles,
        setShowPostForm,
    } = useCreatingPost()
    
    return (
        <CreatePostWrapper
            ref={postRef}
            onClick={() => setShowPostForm(true)}
        >
            <Row gutter={12} align='middle' justify={showPostForm ? 'space-between' : 'unset'}>
                <Col span={showPostForm ? 24 : 'auto'} flex={Number(!showPostForm)}>
                    <CreateTextarea
                        value={title}
                        open={showPostForm}
                        placeholder={t('anything_news')}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Col>
                <Col span={showPostForm ? 24 : 'auto'}>
                    <Row gutter={12} align='middle' justify='space-between'>
                        {
                            showPostForm && data.length > 0 && data.map((item, idx) => (
                                <Col key={`${idx + 1}`} span={24} style={{marginTop: 12}}>
                                    <img
                                        alt={item.id}
                                        src={item.stringUrl}
                                    />
                                </Col>
                            ))
                        }
                        <Col>
                            <label>
                                <input
                                    multiple
                                    type='file'
                                    onChange={(e) => handleAddFiles(e.target.files)}
                                />
                                <IconBox>
                                    <AttachSvg/>
                                </IconBox>
                            </label>
                        </Col>
                        {
                            showPostForm && (
                                <Col>
                                    <Button
                                        size='l'
                                        variant='primary'
                                        onClick={handleSubmit}
                                    >
                                        {t('to_publish')}
                                    </Button>
                                </Col>
                            )
                        }
                    </Row>
                </Col>
            </Row>
        </CreatePostWrapper>
    )
}