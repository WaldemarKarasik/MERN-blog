const inititalState = {
    loadingPosts: false,
    posts: [],
    count: 0
}

const postReducer = (state = inititalState, action) => {
    switch (action.type) {
        case "INCREMENT":
            return {
                ...state,
                count: state.count + 1
            }
        case "LOADING_POSTS":
            return {
                ...state,
                loadingPosts: true
            }
        case "POSTS_ARE_LOADED":
            return {
                ...state,
                loadingPosts: false,
                posts: action.payload
            }
        case "POST_CREATED":
            const { title, description, id } = action.payload
            return {
                ...state,
                posts: [...state.posts, { title, description, id }]
            }
        case "POST_DELETED":
            return {
                ...state,
                posts: state.posts.filter(obj => obj.id !== action.payload)
            }

        default:
            return state
    }
}

export default postReducer