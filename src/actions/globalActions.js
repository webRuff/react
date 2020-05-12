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
    [ActionTypes.deleteLastPostAction](){
        return {
            type: ActionTypes.deleteLastPostAction,
        }
    },
    [ActionTypes.postModalWindowAction](){
        return {
            type: ActionTypes.postModalWindowAction,
        }
    }
}
