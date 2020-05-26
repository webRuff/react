import React, {Component} from "react";
import styles from './stale.module.scss'
import {connect} from "react-redux";
import mapActionsToProps from "../../../../../../actions/mapActionsToProps";
import mapStateToProps from "../../../../../../reducers/mapStateToProps";
import BestPost from './BestPost';


export class BestPosts extends  Component {

    render()

    {
        /*function sortPosts1(posts) {
            posts.sort((post1, post2) => post1.likesCount > post2.likesCount ? -1 : 1);
        }

        let tmp = this.props.posts;
        sortPosts1(tmp);
        let bestPosts1 = tmp.slice(0,4);
*/
        return (
            <section className={styles.wrapper}> {
                this.props.bestPosts.map((post) => {
                    return (<BestPost className={styles.wrapper}
                                      key={post["_id"]}
                                      header={post.header}
                                      likesCount={post.likesCount}
                    />);
                })
            }
            </section>
        )
    }
}



export default connect (mapStateToProps.global, mapActionsToProps)(BestPosts);