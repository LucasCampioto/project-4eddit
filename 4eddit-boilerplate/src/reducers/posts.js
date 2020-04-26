const initialState = {
    allPosts: [],
    postDetails: {},
    postIdSelected: "",
}

const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_POSTS":
            const postList = action.payload.allPosts;
            return { ...state, allPosts: postList }

        case "SET_POST_DETAIL":
            const post = action.payload.post;
            return { ...state, postDetails: post }

        case "SET_POST_ID":
            const postId = action.payload.postIdSelected;
            return { ...state, postIdSelected: postId }
        
        default:
            return state;
    }
}

export default postsReducer;