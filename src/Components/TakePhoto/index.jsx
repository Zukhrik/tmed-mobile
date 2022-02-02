import React, {useState} from 'react'
import Camera from 'react-html5-camera-photo'
import {base64StringtoFile, fileToBase64} from '../../utils/crop-utils'
import {CameraWrapper, UploadedImage} from './styles'
import {useTranslation} from 'react-i18next'
import {Button} from '../../UIComponents/Button'
import 'react-html5-camera-photo/build/css/index.css'
import {Col, Row} from 'antd'

export const TakePhoto = ({sendPhoto, onClose, shape}) => {
    const [webCamOn, setWebCamOn] = useState(true)
    const [data, setData] = useState(null)
    const {t} = useTranslation()

    async function handleChange(dataUri, type) {
        let file, imgUrl
        try {
            if (type === 'file') {
                imgUrl = await fileToBase64(dataUri)
                file = dataUri
            } else {
                imgUrl = dataUri
                file = base64StringtoFile(dataUri, 'filename.jpeg')
            }
            setWebCamOn(false)
            setData({imgUrl, file})
        } catch (e) {
            console.log(e)
        }
    }

    const handleSend = () => {
        sendPhoto(data)
        setWebCamOn(false)
        onClose()
    }

    const handleReset = () => {
        setWebCamOn(true)
        setData(null)
    }

    return (
        <CameraWrapper shape={shape}>
            {
                data && (
                    <UploadedImage shape={shape} imgUrl={data.imgUrl}/>
                )
            }

            {
                webCamOn && (
                    <Camera
                        onTakePhoto={handleChange}
                        idealResolution={{width: 300, height: 300}}
                        imageType='jpg'
                    />
                )
            }

            {
                data
                && (
                    <Row style={{marginTop: 40}} gutter={12} justify='center'>
                        <Col>
                            <Button size='l' variant='danger' onClick={handleReset} style={{marginLeft: 12}}>
                                {t('reset')}
                            </Button>
                        </Col>
                        <Col>
                            <Button size='l' variant='primary' onClick={handleSend}>
                                {t('accept')}
                            </Button>
                        </Col>
                    </Row>
                )
            }
        </CameraWrapper>
    )
}
