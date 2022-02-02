import React, {useEffect} from 'react'
import {useReactMediaRecorder} from 'react-media-recorder'


export const AudioMessage = () => {
    const {
        status,
        startRecording,
    } = useReactMediaRecorder({audio: true})

    useEffect(() => {
        if (status === 'idle') {
            startRecording()
        }
    }, [status, startRecording])

    return (
        <>
            {
                status === 'recording'

            }
        </>
    )
}