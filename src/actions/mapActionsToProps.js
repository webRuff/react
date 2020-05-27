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
    addLikedPostAction: () => {
        dispatch(actions.addLikedPostAction());
    },
    setLikedPostAction: (likedPost) => {
        dispatch(actions.setLikedPostAction(likedPost));
    },
    setBestPostsAction: (bestPosts) => {
        dispatch(actions.setBestPostsAction(bestPosts));
    },
    addSubToUserAction: (sub) => {
        dispatch(actions.addSubToUserAction(sub));
    },
    removeSubFromUserAction: (sub) => {
        dispatch(actions.removeSubFromUserAction(sub));
    },
});
