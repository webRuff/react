import ActionTypes from "../actions/ActionTypes";
import preStorageProcessing from "../utils/preStorageProcessing";
import pushLocation from "../utils/pushLocation";

export const initState  = {
    user: null,
    posts: [],
    laked: [],
    bestPosts: [],
    postHeader: "",
    postContent: "",
};

export const globalReducer = (state = initState, action) => {
  switch (action.type) {
      case ActionTypes.setUserAction:
          return {...state, user: action.payload};
      case ActionTypes.setLikedPostAction:
          const lakedPosts = action.payload;
          return {...state, laked: lakedPosts};
      case ActionTypes.unsetUserAction:
          pushLocation('/');
          return {...state, user: null, posts: []};
      case ActionTypes.writePosts:
          return {...state, posts: [...state.posts, ...action.payload]};
      case ActionTypes.clearAllPost:
          return {...state, posts: []};
      case ActionTypes.deletePostAction:
          const newPosts = state.posts.filter(post => post["_id"] !== action.payload);
          return {...state, posts: newPosts};
      case ActionTypes.addLikedPostAction:
          const newLikedPosts = state.laked.push(action.payload);
          return  {...state, laked: newLikedPosts};
      case ActionTypes.setBestPostsAction:
          const newBestPosts = state.posts.slice().sort((post1, post2) => post1.likesCount > post2.likesCount ? -1 : 1).slice(0,action.payload);
          return  {...state, bestPosts: newBestPosts}
      case ActionTypes.addSubToUserAction:
          break;
      case ActionTypes.removeSubFromUserAction:
          break;
      case ActionTypes.setHeaderAction:
          const newPostHeader = action.payload;
          //alert('!' + typeof action.payload);
          return {...state, postHeader: newPostHeader}
      case ActionTypes.setContentAction:
          const newPostContent = action.payload;
          //alert('!' + newPostContent);
          return {...state, postContent: newPostContent}
      default:
          return {...state };
  }
};
