import preStorageProcessing from "../utils/preStorageProcessing";
import ActionTypes from "./ActionTypes";

export default {
    [ActionTypes.setUserAction](user){
        localStorage.setItem('user', preStorageProcessing.toString(user));
        return {type: ActionTypes.setUserAction, payload: user}
    },

    [ActionTypes.unsetUserAction] (){
        localStorage.removeItem('user');
        return {type: ActionTypes.unsetUserAction}
    },

    [ActionTypes.setLikedPostAction](likedPosts){
        return {
                type: ActionTypes.setLikedPostAction,
                payload: likedPosts
            }
    },

    [ActionTypes.writePosts](posts){
        return {
            type: ActionTypes.writePosts,
            payload: posts,
        }
    },

    [ActionTypes.clearAllPost](){
        localStorage.removeItem('posts');
        return {
            type: ActionTypes.clearAllPost
        }
    },

    [ActionTypes.deletePostAction](deletePostIndex){
        return {
            type: ActionTypes.deletePostAction,
            payload: deletePostIndex,
        }
    },

    [ActionTypes.postModalWindowAction](){
        return {
            type: ActionTypes.postModalWindowAction,
        }
    },

    [ActionTypes.addLikedPostAction](likedPostId){
        return {
            type: ActionTypes.addLikedPostAction,
            payload: likedPostId,
        }
    },

    [ActionTypes.setBestPostsAction](bestPosts){
        return {
            type: ActionTypes.setBestPostsAction,
            payload: bestPosts,
        }
    },
    [ActionTypes.addSubToUserAction](sub){
        return {
            type: ActionTypes.addSubToUserAction,
            payload: sub,
        }
    },
    [ActionTypes.removeSubFromUserAction](sub){
        return {
            type: ActionTypes.removeSubFromUserAction,
            payload: sub,
        }
    },
    [ActionTypes.setHeaderAction](header){
        return {
            type: ActionTypes.setHeaderAction,
            payload: header,
        }
    },
    [ActionTypes.setContentAction](content){
        return {
            type: ActionTypes.setContentAction,
            payload: content,
        }
    }


}
