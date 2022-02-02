import {useStore} from 'effector-react'
import {v4 as uuidV4} from 'uuid'
import {fileToBase64} from '../../utils/crop-utils'
import {$accountModel} from '../../Models/account-model'
import moment from 'moment'
import {
    $tapeModel,
    creatingPostMediaMount,
    creatingPostMount,
    deleteUnCreatedPostMediaMount,
    postMediaPercentCompletedMount,
    resetPostMedia
} from '../../Models/tape-model'
import post from '../../Service/post'
import {useOutsideClicker} from '../app/use-outside-clicker'
import {useCallback, useEffect, useRef, useState} from 'react'


export function useCreatingPost(setCreatePost) {
    const postRef = useRef(null)
    const {clicked} = useOutsideClicker(postRef)
    const [file, setFile] = useState([])
    const [title, setTitle] = useState('')
    const [images, setImages] = useState([])
    const {$profiles: {currentProfile}} = useStore($accountModel)
    const [showPostForm, setShowPostForm] = useState(false)
    const {$postMedia: {data: medias}} = useStore($tapeModel)
    
    const author = currentProfile && `@${currentProfile.slug_name}`
    
    const resetLocalStates = useCallback(() => {
        setTitle('')
        setFile([])
        setImages([])
        setShowPostForm(false)
    }, [])
    
    const createPostMedia = useCallback((data) => {
        post.createPostMediaId(data)
    }, [])
    
    const createPost = useCallback(() => {
        const uuid = uuidV4()
        const mediaStrings = []
        const mediaIds = []
        let allow = true
        
        if (medias.length > 0) {
            for (let i = 0; i < medias.length; i++) {
                mediaIds.push({gallery_id: medias[i].id})
                mediaStrings.push({
                    id: medias[i].id,
                    image: medias[i].stringUrl,
                    thumbnail: medias[i].stringUrl
                })
                
                if (typeof medias[i].id !== 'number') {
                    allow = false
                    break
                }
            }
        }
        
        if (allow) {
            const action = (id) => {
                resetLocalStates()
                if (mediaIds.length > 0) {
                    const params = {
                        post_id: id,
                        data: mediaIds
                    }
                    createPostMedia(params)
                    resetPostMedia()
                }
            }
            
            const block_data = {
                action: null,
                id: uuid,
                author: {
                    type: 'user',
                    name: currentProfile.name,
                    avatar: currentProfile.avatar,
                    slug_name: currentProfile.slug_name,
                    is_official: currentProfile.isOfficial
                },
                medias: mediaStrings.length > 0 ? mediaStrings : [],
                thumbnail: mediaStrings.length > 0 ? mediaStrings : [],
                date: moment().format('YYYY-MM-DD'),
                text: title
            }
            const temp_data = {
                item_data: {
                    block_type: 'post',
                    block_data: block_data
                },
                uuid,
                author,
                action
            }
            creatingPostMount({data: {text: title}, temp_data})
        }
    }, [title, resetLocalStates, createPostMedia, medias, author, currentProfile])
    
    const onUploadProgress = useCallback((evt, id) => {
        let percentCompleted = Math.round((evt.loaded * 100) / evt.total)
        postMediaPercentCompletedMount({id, percentCompleted})
    }, [])
    
    const handleAddFiles = useCallback(async (files) => {
        const filesArr = Array.from(files)
        for (let i = 0; i < filesArr.length; i++) {
            const base64Url = await fileToBase64(filesArr[i])
            if (typeof base64Url === 'string') {
                const uuid = uuidV4()
                
                const formData = new FormData()
                formData.append('image', filesArr[i])
                creatingPostMediaMount({
                    data: formData,
                    post_id: 0,
                    onUploadProgress: (e) => onUploadProgress(e, uuid),
                    obj: {
                        // id: uuid,
                        stringUrl: base64Url,
                        percentCompleted: 0
                    }
                })
            }
        }
    }, [onUploadProgress])
    
    const handleDeleted = useCallback((item) => {
        if (item) {
            const params = {
                post_id: 0,
                media_id: item.id
            }
            deleteUnCreatedPostMediaMount(params)
        }
    }, [])
    
    const handleSubmit = useCallback(() => {
        if (medias.length > 0 || title.trim().length > 0) {
            createPost()
            setCreatePost(false)
        }
    }, [title, createPost, medias, setCreatePost])
    
    useEffect(() => {
        if (clicked) {
            setShowPostForm(false)
        }
    }, [clicked])
    
    
    return {
        file,
        title,
        images,
        setFile,
        postRef,
        setTitle,
        handleSubmit,
        showPostForm,
        handleDeleted,
        handleAddFiles,
        setShowPostForm
    }
}