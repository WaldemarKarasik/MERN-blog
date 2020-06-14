

export const fetchPosts = () => async dispatch => {
    dispatch(loadingPosts())
    try {
        const response = await fetch('http://localhost:5000/api/posts/').then(res => res.json())
        dispatch(postsAreLoaded(response))
    } catch (e) {
        console.log(e)
    }
}

export const deletePost = (postId) => async dispatch => {
    try {
        await fetch('http://localhost:5000/api/posts', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: postId })

        }).then(res => res.json())
        dispatch(postDeleted(postId))
    } catch (e) {

    }
}

export const createPost = (title, description, id) => async dispatch => {
    try {
        await fetch('http://localhost:5000/api/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(title, description, id)
        }).then(res => res.json())
        dispatch(postCreated(title, description, id))
    } catch {

    }
}

export const loadingPosts = () => ({
    type: "LOADING_POSTS"
})
export const postsAreLoaded = (response) => ({
    type: "POSTS_ARE_LOADED",
    payload: response
})

export const postCreated = (title, description, id) => ({
    type: "POST_CREATED",
    payload: title, description, id
})

export const postDeleted = (postId) => ({
    type: "POST_DELETED",
    payload: postId
})