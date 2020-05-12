import React, {Component} from "react";
import styles from './style.module.scss';
import Post from "./Post";
import DeletePostButton from './DeletePostButton'
import {connect} from "react-redux";
import mapActionsToProps from "../../../../../actions/mapActionsToProps";
import mapStateToProps from "../../../../../reducers/mapStateToProps";
import axios from 'axios';
import RoundButton from "../../../../common/RoundButton";
import Editor from "./Post/Editor"


export class PostSection extends Component {
    fetchPosts = async () => {
        try {
            const { data } = await axios.get('http://localhost:8888/api/posts');
            this.props.writePosts(data);
        } catch (e) {
            console.log(e);
        }
    };

    createPost = async () => {
        try {
            /*const {data: { post }, } = await axios.post('http://localhost:8888/api/posts', {
                id: Math.random(),
                header: 'new post',
                content: 'content'
            });*/
            this.props.postModalWindowAction();
                //this.props.clearAllPost();
                //this.fetchPosts();
        }
        catch (e) {
            console.error(e);
        }
    };

   deleteLastPost = async () => {
       const lastPost = this.props.posts[this.props.posts.length -1];
       try{
           await axios({
               url: 'http://localhost:8888/api/posts/' + lastPost.id,
               method: "DELETE",
           });
           this.props.deletePostAction(lastPost.id);
       } catch (e) {
       }
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


    render() {
        return (
            <div className={styles.wrapper}>
                <DeletePostButton deleteLastPost={()=>{this.deleteLastPost()}}/>
                <section>
                    {
                        this.props.posts.map((post) => {
                            return (
                                <Post self={post}
                                      key={post.id}
                                      unfolding={this.props.posts.length < 3}
                                      cb={()=>{
                                          this.deletePost(post.id)
                                      }}
                                      likeCount= {post.likeCount}
                                      liked = {post.liked}
                                />);
                        })
                    }
                    <div style={{position: 'fixed', bottom: 30, right: 20, width: 65}}>
                        <RoundButton func = {this.createPost}/>
                    </div>
                    {/*<Editor/>*/}

                </section>
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
