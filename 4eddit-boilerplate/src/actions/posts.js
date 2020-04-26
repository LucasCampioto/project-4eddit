import axios from 'axios';

const baseURL = "https://us-central1-missao-newton.cloudfunctions.net/fourEddit"

export const setPosts = (allPosts) => ({
    type: "SET_POSTS",
    payload: {
        allPosts,
    }
})

export const getPosts = () => async (dispatch) => {
    const token = window.localStorage.getItem("token")
    const axiosHeader = {
        headers: {
            auth: token
        }
    };

    try {
        const response = await axios.get(`${baseURL}/posts`, axiosHeader)
        dispatch(setPosts(response.data.posts));
    } catch (error) {
        window.alert("erro")
    }
}

export const createPost = (text, title) => async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const axiosHeader = {
        headers: {
            auth: token
        }
    };

    const postInformation = {
        text,
        title,
    }

    try {
        await axios.post(`${baseURL}/posts`, postInformation, axiosHeader)
        dispatch(getPosts())
    } catch (erros) {
        window.alert("Erro ao criar post")
    }
}

export const getPostDetailAction = (post) => ({
    type: "SET_POST_DETAIL",
    payload: {
        post,
    }
})

export const getPostDetail = (postId) => async (dispatch) => {
    const token = window.localStorage.getItem("token")
    const axiosHeader = {
        headers: {
            auth: token,
        }
    }

    try {
        const response = await axios.get(`${baseURL}/posts/${postId}`, axiosHeader)
        dispatch(getPostDetailAction(response.data.post))

    } catch (error) {
        window.alert("Falha ao carregar detalhes da postagem!")
    }
}

export const postVote = (direction, postId) => async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const axiosHeader = {
        headers: {
            auth: token
        }
    };

    const informationVote = {
        direction,
    }

    try {
        await axios.put(
            `${baseURL}/posts/${postId}/vote`,
            informationVote,
            axiosHeader,
        )
        dispatch(getPosts())

    } catch (error) {
        window.alert("erro no voto")
    }
}


export const setPostIdSelected = (postIdSelected) => ({
    type: 'SET_POST_ID',
    payload: {
        postIdSelected,
    }
})

export const createComment = (text, postId) => async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const axiosHeader = {
        headers: {
            auth: token,
        }
    }

    const textInfo = {
        text,
    }

    try {
        await axios.post(`${baseURL}/posts/${postId}/comment`, textInfo, axiosHeader)
        dispatch(getPostDetail(postId))
    } catch (error) {
        window.alert("Erro ao tentar criar um comentário.")
    }
}

export const voteComment = (direction, postId, commentId) => async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const axiosHeader = {
        headers: {
            auth: token,
        }
    }

    const dataVote = {
        direction
    }

    try {
        await axios.put(`${baseURL}/posts/${postId}/comment/${commentId}/vote`, dataVote, axiosHeader)
        dispatch(getPostDetail(postId))
    } catch (error) {
        window.alert("Erro ao tentar votar no comentário")
    }
}