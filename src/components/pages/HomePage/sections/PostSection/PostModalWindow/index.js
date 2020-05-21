import React, {Component} from "react";
import styles from './style.module.scss';
import {connect} from "react-redux";
import mapActionsToProps from "../../../../../../actions/mapActionsToProps";
import mapStateToProps from "../../../../../../reducers/mapStateToProps";
import axios from "axios";
import pushLocation from "../../../../../../utils/pushLocation";
import concatClasses from "../../../../../../utils/concatClasses";

export class PostModalWindow extends Component {
    state = {
      postHeader: 'new post',
      postContent: 'content',
    };

    createPostOk = async (postHeader, postContent ) => {
        try {
            const {data: { post }, } = await axios.post('http://localhost:8888/api/posts', {
                id: Math.random(), //?проверить как будет работать без этой строки id в mongoose
                header: postHeader,
                content: postContent,
                postAuthor: this.props.user.name,
            });
            pushLocation('/home');
        }
        catch (e) {
            console.error(e);
        }
    };

    createPostCancel = () => {
        pushLocation('/home');
    };

    addHeaderToPost = (event) => {
        this.setState({postHeader: event.target.value})
    };

    addContentToPost = (event) => {
        this.setState({postContent: event.target.value})
    };

    render() {
    return (
        <div className={styles.wrapper}>

            <div className={styles.modalWindow}>
                <header className={styles.header}>Редактирование</header>
                <div className={styles.modalWindowContainer}>
                    <div>Заголовок</div>
                    <input className={styles.inputHeader}
                           onChange={this.addHeaderToPost}
                    />
                    <div>Содержание</div>
                    <textarea className={styles.inputContent}
                            onChange={this.addContentToPost}
                    />
                </div>

                <footer>
                    <button className={styles.postAcceptBtn}
                            onClick={()=>{this.createPostOk(this.state.postHeader, this.state.postContent)}}
                    >OK</button>
                    <button className={styles.postAcceptBtn} onClick={this.createPostCancel}>Cancel</button>
                </footer>
            </div>

        </div>
    )
}

}
export default connect (mapStateToProps.global, mapActionsToProps)(PostModalWindow);
