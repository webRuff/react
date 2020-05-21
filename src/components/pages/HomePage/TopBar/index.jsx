import React, {Component} from "react";
import styles from './style.module.scss';
import {connect} from "react-redux"
import mapStateToProps from "../../../../reducers/mapStateToProps";
import mapActionsToProps from "../../../../actions/mapActionsToProps";
import { Link } from 'react-router-dom'

class TopBar extends Component{

    render() {
        const {user, unsetUserAction} = this.props;
        return (
            <header className={styles.wrapper}>
                <div>{user.name}</div>
                <Link to='/'>
                    <div onClick={unsetUserAction} className={styles.logOut}>Logout</div>
                </Link>
            </header>
        )
    }
}

export default connect(mapStateToProps.global, mapActionsToProps)(TopBar)
