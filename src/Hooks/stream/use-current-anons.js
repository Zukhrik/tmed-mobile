import {useStore} from 'effector-react'
import {useParams} from 'react-router-dom'
import {useCallback, useEffect, useState} from 'react'
import {$streamModel} from '../../Models/stream-model'

export function useCurrentAnons() {
    const {slug_name} = useParams()
    const [currentStream, setCurrentStream] = useState(null)
    const {$channelStreamScheduleList: {data: schedule}} = useStore($streamModel)
    
    const getCurrentAnons = useCallback(() => {
        let tmp = {}
        if (slug_name && schedule[slug_name]) {
            const data = schedule[slug_name]
            const curTime = new Date().getTime()
            for (let i = 0; i < data.length; i++) {
                const prevTime = new Date(data[i].date).getTime()
                let nextTime = null
                if (data[i + 1]) {
                    nextTime = new Date(data[i + 1].date).getTime()
                    if (curTime >= prevTime && curTime < nextTime) {
                        tmp = data[i]
                        break
                    }
                } else {
                    tmp = data[i]
                }
            }
            setCurrentStream(tmp)
        } else {
            setCurrentStream(null)
        }
    }, [slug_name, schedule])
    
    useEffect(() => {
        getCurrentAnons()
    }, [getCurrentAnons])
    
    return {currentStream}
}