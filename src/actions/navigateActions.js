import ActionTypes from "./ActionTypes";

export default {
    [ActionTypes.updateActiveButtonIdAction] (activeButtonId) {
        return {
            type: ActionTypes.updateActiveButtonIdAction,
            payload: activeButtonId, /*поле для данных*/
        };
    },
};
