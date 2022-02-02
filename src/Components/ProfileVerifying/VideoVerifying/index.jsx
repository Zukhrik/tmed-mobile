import React from 'react'
import {SimpleVideoUpload} from "../../UploadMedia";
import {useVideoVerifying} from "../../../Hooks/verifying";
import {Title} from "../../../UIComponents/Typography/Title";
import {Col, Row} from "antd";
import {Button} from "../../../UIComponents/Button";
import {Trans, useTranslation} from "react-i18next";
import {useStore} from "effector-react";
import {$accountModel} from "../../../Models/account-model";
import {useHistory} from 'react-router-dom'

export const VideoVerifying = () => {
    const {formik} = useVideoVerifying()
    const {t} = useTranslation()
    const {$profiles: {currentProfile}} = useStore($accountModel)
    const name = currentProfile && currentProfile.name
    const {push} = useHistory()
    return (
        <>
            <Title level={5}>
                {t('video_verification')}
            </Title>
            <form onSubmit={formik.handleSubmit}>
                <Row gutter={[24, 24]}>
                    <Col span={24}>
                        <SimpleVideoUpload
                            value={formik.values.video}
                            onChange={(value) => formik.setFieldValue('video', value)}
                            error={formik.touched.video && formik.errors.video}
                            onBlur={() => formik.setFieldValue('video', true, true)}
                        />
                    </Col>
                    <Col span={24} style={{display: "flex", flexDirection: 'column', alignItems: "center"}}>
                        <p
                            style={{
                                color: 'var(--grey-dwed)',
                                textAlign: "center",
                                width: '80%'
                            }}
                        >
                            {t('short_video_verifying_sentence')}:
                        </p>
                        <p
                            style={{
                                color: 'var(--dark-dwed)',
                                textAlign: 'center',
                            }}
                        >
                            <Trans i18nKey='user_video_verifying'>
                                <span style={{color: 'var(--primary-dwed)'}}/>
                                {{n: name}}
                            </Trans>
                        </p>
                    </Col>
                    <Col span={24}>
                        <Row gutter={24} justify='center'>
                            <Col span='auto'>
                                <Button variant='link' size='l' onClick={() => [push('/menu')]}>
                                    {t('cancel')}
                                </Button>
                            </Col>
                            <Col span='auto'>
                                <Button
                                    htmlType='submit'
                                    size='l'
                                    variant='primary'
                                    disabled={(
                                        formik.isSubmitting ||
                                        (formik.touched.file && !!formik.errors.file)
                                    )}
                                    loading={formik.isSubmitting}
                                >
                                    {t('continue')}
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </form>

        </>

    )
}