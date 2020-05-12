import ActionTypes from "../actions/ActionTypes";

export const initState  = {
    user: null,
    posts: [],
    postModalWindow: false,
};

export const globalReducer = (state = initState, action) => {
  switch (action.type) {
      case ActionTypes.setUserAction:
          return {...state, user: action.payload};
      case ActionTypes.unsetUserAction:
          return {...state, user: null, posts: []};
      case ActionTypes.writePosts:
          return {...state, posts: [...state.posts, ...action.payload]};
      case ActionTypes.clearAllPost:
          return {...state, posts: []};
      case ActionTypes.deletePostAction:
          const newPosts = state.posts.filter(post => post.id !== action.payload);
          return {...state, posts: newPosts};
      case ActionTypes.postModalWindowAction:
          return {...state, postModalWindow: !state.postModalWindow};
      default:
          return {...state };
  }
};
