import React, {Component} from 'react';
import styles from './style.module.scss';
import concatClasses from "../../../utils/concatClasses";

export default class Page extends Component {

    render(){
        console.log(this.props);
        return (
            <div className={concatClasses(styles.wrapper,  this.props.addStyle)}>
                {this.props.children}
            </div>
        )
    }
}