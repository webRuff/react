import React, {Component} from "react";
import styles from './style.module.scss';
import concatClasses from "../../../../../../utils/concatClasses";
import {connect} from 'react-redux'
import store from '../../../../../../App'
import globalActions from "../../../../../../actions/globalActions";


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
        return concatClasses(styles.wrapper, this.state.isOpened && styles.opened);
        else
            return concatClasses(styles.wrapper, styles.opened);
        };
    togglePostLikeClassName = () => {
      if (this.state.liked)
          return styles.likedCount;
        else
            return styles.notLikedCount;
    };
    likeCounter = () => {
        if(!this.state.liked) {
            this.setState({likeCount: this.state.likeCount + 1});
            this.setState({liked: true});
        }
        else {
            this.setState({likeCount: this.state.likeCount - 1});
            this.setState({liked: false});
        }
        /*
        if (this.state.likeCount === 0) {
            this.setState({likeCount: null});
        }*/
    };

    render() {
        return (
            <article className={this.togglePostsClassName()}>
                <div className={styles.postNav}>
                <div className={styles.postNavContainer}>
                    <div className={this.togglePostLikeClassName()}>{this.state.likeCount}</div>
                    <img alt = "likeIcon" src={require("../../../../../../assets/img/icons/likePost.png")}
                         className={styles.postIcons}
                         onClick={this.likeCounter}
                    />
                    <img alt = "commentPostIcon" src={require("../../../../../../assets/img/icons/commentPost.png")}
                         className={styles.postIcons}/>
                    <img alt = "deletePostIcon" src={require("../../../../../../assets/img/icons/deletePost.png")}
                         className={styles.postIcons}
                         onClick={this.props.cb}
                    />
                </div>
                </div>
                <header onClick={this.toggleHeightPost}>{this.props.self.header}</header>
                <main>
                    <pre onClick={this.toggleHeightPost}>{this.props.self.content}</pre>
                </main>

            </article>
        )
    }
}
