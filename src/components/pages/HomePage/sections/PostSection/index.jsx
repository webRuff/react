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
            if(!likedPosts){
                await axios.post('http://localhost:8888/api/likedPosts', {
                    userId: this.props.user['_id'],
                });
                const likedPosts =
                    await  axios.get('http://localhost:8888/api/likedPosts/getByUserId/' + userId);
                alert('2:' + likedPosts);
            }
            this.props.setLikedPostAction(likedPosts);

            const { data } = await axios.get('http://localhost:8888/api/posts');
            this.props.writePosts(data.reverse());
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
        //console.log('includes: ' + this.props.laked.includes(PostId));
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
        console.log('addLikedPostToUser: ' + Array.isArray(likedPosts));
        this.props.setLikedPostAction(likedPosts);
    };

    removeLikedPostToUser = (postId) => {
        const tmp = this.props.laked;
        const strLikedPosts = tmp.filter(post=>post!==postId);
        this.props.setLikedPostAction(strLikedPosts);
    };

    render() {
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
                                />);
                        })
                    }
                    <div style={{position: 'fixed', bottom: 30, right: 20, width: 65}}>
                        <RoundButton func = {this.createPost}/>
                    </div>
                    <div className={styles.postModalWindowIsOpened}>
                        <ModalWindow/>
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
