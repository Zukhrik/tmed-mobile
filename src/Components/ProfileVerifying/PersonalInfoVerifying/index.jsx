import React, {useCallback, useState} from 'react'
import {Col, Row} from "antd";
import {InputUI} from "../../../UIComponents/mu-inputs";
import {Title} from "../../../UIComponents/Typography/Title";
import {useTranslation} from "react-i18next";
import {usePersonalInfoVerifying} from "../../../Hooks/verifying";
import moment from "moment";
import {LISTS} from "../../../Constants";
import {SelectionList} from "../../SelectionList";
import {Modal} from "../../../UIComponents/Modal";
import {ArrowIosBottomSvg} from "../../../Icons/Arrow";
import {Button} from "../../../UIComponents/Button";
import {useHistory} from 'react-router-dom'

export const PersonalInfoVerifying = () => {
    const {t} = useTranslation()
    const {formik, disabled} = usePersonalInfoVerifying()
    const [listType, setListType] = useState(LISTS.USER_CATEGORY)
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const {push} = useHistory()
    const genderOptions = [{value: 'm', label: t('male')}, {value: 'f', label: t('female')}]

    const handleClick = (listType) => {
        setListType(listType)
        setModalIsOpen(true)
    }

    const getTitle = useCallback(() => {
        let tmp = ''
        if (listType === LISTS.USER_CATEGORY) {
            tmp = 'category'
        }

        if (listType === LISTS.REGION) {
            tmp = 'region'
        }

        return tmp
    }, [listType])
    return (
        <>
            <Modal
                modalIsOpen={modalIsOpen}
                title={t(`${getTitle()}`)}
                setModalIsOpen={setModalIsOpen}
                component={
                    <SelectionList
                        listType={listType}
                        onClose={() => setModalIsOpen(false)}
                        onChange={(value) => formik.setFieldValue(getTitle(), value)}
                    />
                }
            />
            <Title level={5}>
                {t('personal_info')}
            </Title>
            <form onSubmit={formik.handleSubmit}>
                <Row gutter={[24, 24]}>
                    <Col span={24}>
                        <InputUI
                            value={formik.values.login}
                            readOnly
                            label={t('login')}
                        />
                    </Col>
                    <Col span={24}>
                        <InputUI
                            name='name'
                            label={t('name')}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && formik.errors.name}
                        />
                    </Col>
                    <Col span={24}>
                        <InputUI
                            name='lastname'
                            label={t('lastname')}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.lastname}
                            error={formik.touched.lastname && formik.errors.lastname}
                        />
                    </Col>
                    <Col span={24}>
                        <InputUI
                            name='surname'
                            label={t('surname')}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.surname}
                            error={formik.touched.surname && formik.errors.surname}
                        />
                    </Col>
                    <Col span={24}>
                        <InputUI
                            name='gender'
                            inputType='select'
                            label={t('gender')}
                            options={genderOptions}
                            value={formik.values.gender}
                            onBlur={() => formik.setFieldTouched('gender', true, true)}
                            error={formik.touched.gender && formik.errors.gender}
                            onChange={(e) => formik.setFieldValue('gender', e.target.value)}
                        />
                    </Col>
                    <Col span={24}>
                        <InputUI
                            inputType='date'
                            name='birthday'
                            label={t('birthday')}
                            onBlur={formik.handleBlur}
                            error={formik.touched.birthday && formik.errors.birthday}
                            value={formik.values.birthday ? new Date(formik.values.birthday) : undefined}
                            onChange={(value) => formik.setFieldValue('birthday', moment(value).format('YYYY-MM-DD'))}
                        />
                    </Col>
                    <Col span={24}>
                        <InputUI
                            readOnly
                            name='category'
                            label={t('category')}
                            icon={<ArrowIosBottomSvg />}
                            error={formik.touched.category && formik.errors.category}
                            value={formik.values.category ? formik.values.category.name : ''}
                            onClick={() => handleClick(LISTS.USER_CATEGORY)}
                        />
                    </Col>
                    <Col span={24}>
                        <InputUI
                            readOnly
                            name='region'
                            label={t('region')}
                            icon={<ArrowIosBottomSvg />}
                            error={formik.touched.region && formik.errors.region}
                            value={formik.values.region ? formik.values.region.name : ''}
                            onClick={() => handleClick(LISTS.REGION)}
                        />
                    </Col>
                    <Col span={24}>
                        <Row gutter={24} justify='center'>
                            <Col span='auto'>
                                <Button variant='link' size='l' onClick={() => push('/menu')}>
                                    {t('cancel')}
                                </Button>
                            </Col>
                            <Col span='auto'>
                                <Button
                                    htmlType='submit'
                                    size='l'
                                    variant='primary'
                                    disabled={disabled()}
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