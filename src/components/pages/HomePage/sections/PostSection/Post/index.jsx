import React, {Component} from "react";
import styles from './style.module.scss';
import concatClasses from "../../../../../../utils/concatClasses";
import {connect} from 'react-redux'
import store from '../../../../../../App'
import globalActions from "../../../../../../actions/globalActions";
import mapStateToProps from "../../../../../../reducers/mapStateToProps";
import mapActionsToProps from "../../../../../../actions/mapActionsToProps";
import UserHelper from "../../../../../../utils/userHelper";
import axios from 'axios';
import preStorageProcessing from "../../../../../../utils/preStorageProcessing";


export default class Post extends Component{
    state = {
        isOpened: false,
        likeCount: this.props.likeCount,
        isLiked: this.props.isLiked
    };

    toggleHeightPost = () => {
        this.setState({isOpened: !this.state.isOpened})
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return true;
    };

    togglePostsClassName = () => {
        if (!this.props.unfolding)
            return concatClasses(styles.postWrapper, this.state.isOpened && styles.opened);
        else
            return concatClasses(styles.postWrapper, styles.opened);
        };
    togglePostLikeClassName = () => {
      if (this.state.isLiked)
          return styles.likedCount;
        else
            return styles.notLikedCount;
    };
    likeCounter = () => {
        if(!this.state.isLiked) {
            this.setState({isLiked: !this.state.isLiked});
            this.setState({likeCount: this.state.likeCount + 1});
            this.addLikeMongoose();
            this.props.addLikedPostToUser();
        }
        else {
            this.setState({isLiked: !this.state.isLiked});
            this.setState({likeCount: this.state.likeCount - 1});
            this.removeLikeMongoose();
            this.props.removeLikedPostToUser();
        }
    };

    addLikeMongoose = async () => {
        try{
                await axios.put('http://localhost:8888/api/likedPosts/addLike', {
                    userId: this.props.user["_id"],
                    likedPostsId: this.props.self["_id"]
                })
                await axios.put('http://localhost:8888/api/posts/addLike/' + this.props.self["_id"],)
            } catch (e) {
            console.log(e);
        }
    }

    removeLikeMongoose = async () => {
        try{
            await axios.put('http://localhost:8888/api/likedPosts/removeLike', {
                userId: this.props.user["_id"],
                unLikePostId: this.props.self["_id"]
            })
            await axios.put('http://localhost:8888/api/posts/removeLike/' + this.props.self["_id"],)
        } catch (e) {
            console.log(e);
        }
    }

    toggleSubIcon = () => {
        if(!this.props.mySubIcon)
            return '+'
        else
            return '-'
    };

    render() {
        return (
            <div className={styles.wrapper}>
                <article className={this.togglePostsClassName()}>
                    <div className={styles.postAttribs}>
                        <div className={styles.postAttribsContainer}>
                            <div className={this.togglePostLikeClassName()}>{this.state.likeCount}</div>
                            <img alt = "likeIcon" src={require("../../../../../../assets/img/icons/likePost.png")}
                                className={styles.postIcons}
                                 onClick={this.likeCounter}
                            />
                            <img alt = "commentPostIcon" src={require("../../../../../../assets/img/icons/editPost.png")}
                                 className={styles.postIcons}/>
                            <img alt = "deletePostIcon" src={require("../../../../../../assets/img/icons/deletePost.png")}
                                 className={styles.postIcons}
                                 onClick={this.props.cb}
                            />
                        </div>
                    </div>
                    <div style={{width: "100%", textAlign: "center"}} onClick={this.toggleHeightPost}>
                <header>{this.props.self.header}</header>
                        <div className={styles.authorContainer}>
                            <div>Автор: {this.props.self.postAuthor}</div>
                            <div >{this.toggleSubIcon()}</div>
                        </div>
                <main>
                    <pre>{this.props.self.content}</pre>
                </main>
                    </div>
            </article>

            </div>
        )
    }
}
