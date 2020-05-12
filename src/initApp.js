import preStorageProcessing from "./utils/preStorageProcessing";
import { store } from "./App"

export default (store) => {
    store.dispatch({
        type: 'setUserAction',
        payload:
            (localStorage.getItem('user') &&
                preStorageProcessing.fromString(localStorage.getItem('user'))) || null,
    });
}