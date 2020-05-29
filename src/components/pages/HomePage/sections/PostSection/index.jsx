import React, {Component} from "react";
import styles from './style.module.scss';
import Post from "./Post";
import DeletePostButton from './DeletePostButton'
import {connect} from "react-redux";
import mapActionsToProps from "../../../../../actions/mapActionsToProps";
import mapStateToProps from "../../../../../reducers/mapStateToProps";
import axios from 'axios';
import RoundButton from "../../../../common/RoundButton";
import Editor from "./Editor"
import BestPosts from "./BestPosts"
import ModalWindow from "./PostModalWindow"
import pushLocation from "../../../../../utils/pushLocation";
import preStorageProcessing from "../../../../../utils/preStorageProcessing";


export class PostSection extends Component {

    fetchPosts = async () => {
        try {
            const userId = this.props.user['_id'];
            const {data: {likedPosts}} =
                await  axios.get('http://localhost:8888/api/likedPosts/getByUserId/' + userId,
                );
            this.props.setLikedPostAction(likedPosts);

            const { data } = await axios.get('http://localhost:8888/api/posts');
            this.props.writePosts(data.reverse());

            const countOfBestPosts = 4;
            this.setBestPosts(countOfBestPosts);
        } catch (e) {
            console.log(e);
        }
    };

    createPost = async () => {
        pushLocation('/createPost');
    };


    toggleMySubIcon = (postAuthor) => {
        return this.props.user.mySubs.includes(postAuthor);
    };

    toggleLiked = (PostId) => {
        return this.props.laked.includes(PostId);

    };

   deletePost = async (postId) => {
      try{
           await axios({
               url: 'http://localhost:8888/api/posts/' + postId,
               method: "DELETE",
           });
       } catch (e) {
       }
       this.props.deletePostAction(postId);
   };

    addLikedPostToUser = (postId) => {
        const likedPosts =  this.props.laked;
        likedPosts.push(postId);
        this.props.setLikedPostAction(likedPosts);
    };

    removeLikedPostToUser = (postId) => {
        const strLikedPosts = this.props.laked.filter(post=>post!==postId);
        this.props.setLikedPostAction(strLikedPosts);
    };

    setBestPosts = (countOfBestPosts) => {
        this.props.setBestPostsAction(countOfBestPosts);
    };

    addSubToUser = async (sub) => {
        const newUser = this.props.user;
        const subs = newUser.mySubs.split(',');
        subs.push(sub);
        const strSubs = subs.join(',');
        newUser.mySubs = strSubs;
        this.props.setUserAction(newUser);
        try {
            const { data } = await axios.get('http://localhost:8888/api/posts');
            this.props.clearAllPost();
            this.props.writePosts(data.reverse());
        } catch (e) {
            console.log(e);
        }
    };

    removeSubFromUser = async (subToRemove) => {
        const newUser = this.props.user;
        const subs = newUser.mySubs.split(',');
        const strSubs = subs.filter(sub => sub !== subToRemove).join(',');
        newUser.mySubs = strSubs;
        this.props.setUserAction(newUser);
        try {
            const { data } = await axios.get('http://localhost:8888/api/posts');
            this.props.clearAllPost();
            this.props.writePosts(data.reverse());
        } catch (e) {
            console.log(e);
        }
    }


    checkUser = () => {
        if(this.props.user.name === 'tmp') {
            pushLocation('/newUser');
        }
    };

    showAuthorPosts = (postAuthor) => {
        const authorPosts = this.props.posts.filter(post => post.postAuthor === postAuthor);
        this.props.clearAllPost();
        this.props.writePosts(authorPosts);
    };

    editPostHeader = (postHeader) => {
        const tmp = postHeader;
        this.props.setHeaderAction(tmp);
        alert('1:' + this.props.postHeader);
    };

    editPostContent = (postContent) => {
        this.props.setContentAction(postContent);
        alert('2:' + this.props.postHeader);

    }

    render() {
            this.checkUser();
        return (
            <div className={styles.postsSectionContainer}>
                <div style={{textAlign: "center", margin: 5, fontSize: 25, color: "#4575D4"}}>Лучшее за неделю</div>
                <div className={styles.bestPostsContainer}>
                    <BestPosts/>
                </div>
            <div className={styles.wrapper}>
                <section>
                    <div style={{textAlign: "center", margin: 5, fontSize: 25, color: "#4575D4"}}>Последние обновления</div>
                    {
                        this.props.posts.map((post) => {
                            return (
                                <Post self={post}
                                      key={post["_id"]}
                                      unfolding={this.props.posts.length < 3}
                                      cb={()=>{
                                          this.deletePost(post["_id"])
                                      }}
                                      likeCount= {post.likesCount}
                                      isLiked = {this.toggleLiked(post["_id"])}
                                      postAuthor = {post.postAuthor}
                                      mySubIcon = {this.toggleMySubIcon(post.postAuthor)}
                                      user = {this.props.user}
                                      addLikedPostToUser = {()=>{
                                          this.addLikedPostToUser(post["_id"])
                                      }}
                                      removeLikedPostToUser = {() => {
                                            this.removeLikedPostToUser(post["_id"])
                                      }}
                                      showAuthorPosts = {() => {
                                          this.showAuthorPosts(post.postAuthor)
                                      }}
                                      addSubtoUser = {() => {this.addSubToUser(post.postAuthor)
                                      }}
                                      removeSubFromUser = {() => {this.removeSubFromUser(post.postAuthor)
                                      }}
                                      userAvatar = {post.authorImg}
                                      editPostHeader = {() => {this.editPostHeader(post.header)
                                      }}
                                      editPostContent = {() => {this.editPostContent(post.content)}}
                                />);
                        })
                    }
                    <div style={{position: 'fixed', bottom: 30, right: 20, width: 65}}>
                        <RoundButton func = {this.createPost}/>
                    </div>
                </section>
            </div>
            </div>
        )

    }

    componentDidMount() {
        this.fetchPosts();

    }
/*
    componentWillUnmount() {
        clearTimeout(this.timerId);
    }*/
}

export default connect (mapStateToProps.global, mapActionsToProps)(PostSection);
