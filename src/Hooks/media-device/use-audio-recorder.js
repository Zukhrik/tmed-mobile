import {useCallback, useEffect, useState} from 'react'

export function useAudioRecorder() {
    const [audioRecorder, setAudioRecorder] = useState(null)
    const [isRecording, setIsRecording] = useState(false)
    const [audioChunks, setAudioChunks] = useState([])
    
    const startRecord = () => {
        navigator.mediaDevices.getUserMedia({audio: true})
            .then(stream => {
                const mediaRecorder = new MediaRecorder(stream)
                setAudioRecorder(mediaRecorder)
                setIsRecording(true)
                mediaRecorder.start()
                audioRecorder.addEventListener('dataavailable', getRecords)
            })
    }
    
    const stopRecord = () => {
        if (audioRecorder) {
            audioRecorder.stop()
            setIsRecording(false)
        }
    }
    
    const getRecords = useCallback((e) => {
        console.log(e.data)
        setAudioChunks([...audioChunks, e.data])
    }, [audioChunks])
    
    useEffect(() => {
        if (audioRecorder) {
            audioRecorder.addEventListener('dataavailable', getRecords)
        }
        
        return () => {
            if (audioRecorder) {
                audioRecorder.removeEventListener('dataavailable', getRecords)
            }
        }
    }, [getRecords, audioRecorder])
    
    console.log(audioChunks)
    
    return {
        startRecord,
        stopRecord,
        isRecording
    }
    
}