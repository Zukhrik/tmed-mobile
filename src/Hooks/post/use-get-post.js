import {useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {getPostMount} from '../../Models/post-model'

export function useGetPost() {
    const {post_id} = useParams()
    
    useEffect(() => {
        getPostMount({post_id})
    }, [post_id])
}