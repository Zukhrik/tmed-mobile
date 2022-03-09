import React, {useState} from 'react'
import {Col, Row} from 'antd'
import post from '../../../Service/post'
import {useHistory} from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import {RepostButtonWrapper, RepostTextArea} from '../style'
import {Container} from '../../../UIComponents/GlobalStyles'

export const RepostForm = ({post_id}) => {
    const [title, setTitle] = useState('')
    const {push} = useHistory()
    const {t} = useTranslation()
    
    const handleSubmit = (event) => {
        event.preventDefault()
        const data = {
            text: title,
            repost_id: post_id
        }
        post.creatingPost({data})
            .then(res => {
                if (res) {
                    push('/')
                }
            })
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <Row>
                <Col span={24}>
                    <Container>
                        <RepostTextArea
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder={`${t('enter_text')}...`}
                        />
                    </Container>
                </Col>
                <Col span={24}>
                    <RepostButtonWrapper
                        size='l'
                        variant='primary'
                        htmlType='submit'
                    >
                        {t('repost')}
                    </RepostButtonWrapper>
                </Col>
            </Row>
        </form>
    )
}