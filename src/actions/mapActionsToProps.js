import actions from "./actions";

export default (dispatch) => ({
    setUserAction: (user) => {
        dispatch(actions.setUserAction(user));
    },
    unsetUserAction: () => {
        dispatch(actions.unsetUserAction());
    },
    updateActiveButtonIdAction: (id) => {
        dispatch(actions.updateActiveButtonIdAction(id));
    },
    writePosts: (posts) => {
        dispatch(actions.writePosts(posts));
    },
    clearAllPost: () => {
        dispatch(actions.clearAllPost());
    },
    deletePostAction: (newPosts) => {
        dispatch(actions.deletePostAction(newPosts));
    },
    postModalWindowAction: () => {
        dispatch(actions.postModalWindowAction());
    },
    createBestPostsAction: () => {
        dispatch(actions.createBestPostsAction());
    },
});