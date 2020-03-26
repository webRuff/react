import React, {Component} from 'react';
import styles from './style.module.scss'
import AuthForm from "./AuthForm";
import Page from "../../common/Page";

export default class AuthPage extends Component {
   /* addStyle = () => {
        console.log('hi');
        return 'styles.wrapper';
    };*/


    render(){
        return (
            <Page addStyle = {styles.wrapper}>
                <AuthForm setLoggedUser = {this.props.setLoggedUser}/>
            </Page>
        )
    }
}