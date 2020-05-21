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


export default class Post extends Component{
    state = {
        isOpened: false,
        likeCount: this.props.likeCount,
        liked: this.props.liked
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
      if (this.state.liked)
          return styles.likedCount;
        else
            return styles.notLikedCount;
    };
    likeCounter = () => {
        if(!this.state.liked) {
            this.setState({liked: !this.state.liked});
            this.setState({likeCount: this.state.likeCount + 1});
            this.addLikeMongoose();
            UserHelper.addLikedPostToUser(this.props.self["_id"]);
        }
        else {
            this.setState({liked: !this.state.liked});
            this.setState({likeCount: this.state.likeCount - 1});
            this.removeLikeMongoose();
        }
    };

    addLikeMongoose = async () => {
        try{
                await axios.put('http://localhost:8888/api//users/addLike', {
                    id: this.props.user["_id"],
                    likedPosts: this.props.self["_id"]
                })
            } catch (e) {
            console.log(e);
        }
    }

    removeLikeMongoose = async () => {
        try{
            await axios.put('http://localhost:8888/api/users/removeLike', {
                id: this.props.user["_id"],
                unLikePostId: this.props.self["_id"]
            })
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

    addSub = async (postAuthor) => {

    }

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
