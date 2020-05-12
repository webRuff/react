import React, {Component} from "react";
import styles from './style.module.scss';
import {connect} from "react-redux"
import mapStateToProps from "../../../../reducers/mapStateToProps";
import mapActionsToProps from "../../../../actions/mapActionsToProps";

class TopBar extends Component{

    render() {
        const {user, unsetUserAction} = this.props;
        console.log('top bar render');
        return (
            <header className={styles.wrapper}>
                {<div>{user.name}</div>}
                <div onClick={unsetUserAction} className={styles.logOut}>Logout</div>
            </header>
        )
    }
}

export default connect(mapStateToProps.global, mapActionsToProps)(TopBar)
