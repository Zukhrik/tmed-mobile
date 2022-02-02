import {createEffect} from 'effector'
import tape from '../../Service/tape'
import post from '../../Service/post'

export const fetchAuthorTape = createEffect({
    handler: tape.getUserTape
})

export const fetchAllTape = createEffect({
    handler: tape.getAllTape
})

export const fetchAddLikeToPost = createEffect({
    handler: post.addLikeToPost
})

export const fetchRemoveLikeFromPost = createEffect({
    handler: post.removeLikeFromPost
})

export const fetchDeletePost = createEffect({
    handler: post.deletePost
})

export const fetchCreatingPost = createEffect({
    handler: post.creatingPost
})

export const fetchCreatingPostMedia = createEffect({
    handler: post.createPostMedia
})