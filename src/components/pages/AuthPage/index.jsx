import React, {Component} from 'react';
import styles from './style.module.scss'
import AuthForm from "./AuthForm";
import Page from "../../common/Page";

export default class AuthPage extends Component {

    render(){
        return (
            <Page addStyle = {styles.wrapper}>
                <AuthForm/>
            </Page>
        )
    }
}