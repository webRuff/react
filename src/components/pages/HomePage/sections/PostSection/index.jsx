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
            const { data } = await axios.get('http://localhost:8888/api/posts');
            this.props.writePosts(data.reverse());
        } catch (e) {
            console.log(e);
        }
    };

    createPost = async () => {
        pushLocation('/createPost');
    };

   /*deleteLastPost = async () => {
       const lastPost = this.props.posts[this.props.posts.length -1];
       try{
           await axios({
               url: 'http://localhost:8888/api/posts/' + lastPost.id,
               method: "DELETE",
           });
           this.props.deletePostAction(lastPost.id);
       } catch (e) {
       }
    };*/

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

   togglePostModalWindow = () => {

   };

   toggleMySubIcon = (postAuthor) => {
     return this.props.user.mySubs.includes(postAuthor);
   };

    toggleLiked = (PostId) => {
        //console.log('----->' + this.props.user.likedPosts.includes(PostId));
        return this.props.user.likedPosts.includes(PostId);
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
                                      liked = {this.toggleLiked(post["_id"])}
                                      postAuthor = {post.postAuthor}
                                      mySubIcon = {this.toggleMySubIcon(post.postAuthor)}
                                      user = {this.props.user}
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
