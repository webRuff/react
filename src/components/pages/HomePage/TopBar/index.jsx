import React, {Component} from "react";
import styles from './style.module.scss';
import {connect} from "react-redux"
import mapStateToProps from "../../../../reducers/mapStateToProps";
import mapActionsToProps from "../../../../actions/mapActionsToProps";
import { Link } from 'react-router-dom'
import pushLocation from "../../../../utils/pushLocation";

class TopBar extends Component{

    render() {
        const {user, unsetUserAction} = this.props;
        return (
            <header className={styles.wrapper}>
                <div className={styles.userContainer}>
                <img src={"data:image/png;base64," + user.userImg} className={styles.userAvatar}/>
                <div style={{padding: "0 10px"}}>{user.name}</div>
                </div>
                    <div onClick={unsetUserAction} className={styles.logOut}>Logout</div>
            </header>
        )
    }
}

export default connect(mapStateToProps.global, mapActionsToProps)(TopBar)
