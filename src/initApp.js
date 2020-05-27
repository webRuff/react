import preStorageProcessing from "./utils/preStorageProcessing";
import { store } from "./App"
import pushLocation from "./utils/pushLocation";

export default (store) => {
    /*store.dispatch({
        type: 'setUserAction',
        payload:
            (localStorage.getItem('user') &&
                preStorageProcessing.fromString(localStorage.getItem('user'))) || null,
    });*/
    const user =
        (localStorage.getItem('user') &&
            preStorageProcessing.fromString(localStorage.getItem('user'))) || null;
    store.dispatch({
        type: "setUserAction",
        payload: user,
    });

    if(!user) pushLocation('/');
 /*   else {
        alert('dispatch');
        store.dispatch({
            type: "setLikedPostAction",
            payload: user.likedPosts
        });
    }*/
}