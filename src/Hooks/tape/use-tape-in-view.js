import {useEffect} from 'react'
import {useStore} from 'effector-react'
import {useInView} from 'react-intersection-observer'
import {$postModel, postOfferingMount} from '../../Models/post-model'

export function useTapeInView() {
    const {$postOfferings: {data}} = useStore($postModel)
    const {ref, inView, entry} = useInView({
        threshold: 0.25,
        delay: 300
    })

    useEffect(() => {
        if (inView) {
            const id = entry.target.getAttribute('data-id')
            if (id && data[id] === undefined) {
                const data = {
                    post_id: id,
                    clear: true,
                    params: {
                        params: {
                            limit: 10,
                            offset: 0
                        }
                    }
                }
                postOfferingMount(data)
            }
        }
    }, [entry, data, inView])

    return {ref}
}