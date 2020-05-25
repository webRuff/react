import ActionTypes from "../actions/ActionTypes";
import preStorageProcessing from "../utils/preStorageProcessing";

export const initState  = {
    user: null,
    posts: [],
    laked: [],
};

export const globalReducer = (state = initState, action) => {
  switch (action.type) {
      case ActionTypes.setUserAction:
          return {...state, user: action.payload};
      case ActionTypes.setLikedPostAction:
          const lakedPosts = action.payload;
          //alert('reducer: ' +  Array.isArray(lakedPosts) + '--->' + lakedPosts);
          return {...state, laked: lakedPosts};
      case ActionTypes.unsetUserAction:
          return {...state, user: null, posts: []};
      case ActionTypes.writePosts:
          return {...state, posts: [...state.posts, ...action.payload]};
      case ActionTypes.clearAllPost:
          return {...state, posts: []};
      case ActionTypes.deletePostAction:
          const newPosts = state.posts.filter(post => post["_id"] !== action.payload);
          return {...state, posts: newPosts};
      case ActionTypes.addLikedPostAction:
          alert('newLikedPosts' + action.payload);
          const newLikedPosts = state.laked.push(action.payload);
          return  {...state, laked: newLikedPosts};
      default:
          return {...state };
  }
};
