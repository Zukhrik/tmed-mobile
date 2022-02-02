import {useEffect, useRef, useState} from 'react'
import {useOutsideClicker} from '../app/use-outside-clicker'

export function usePostMore() {
    const postRef = useRef(null)
    const {clicked} = useOutsideClicker(postRef)
    const [show, setShow] = useState(false)
    
    useEffect(() => {
        if (clicked) {
            setShow(false)
        }
    }, [clicked])
    
    return {
        show, setShow, clicked, postRef
    }
}