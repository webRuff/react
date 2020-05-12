import React, {Component} from "react";
import styles from './style.module.scss';
import TextInput from "../../../common/TextInput";
import AcceptButton from "../../../common/AcceptButton";
import PasswordInput from "../../../common/PasswordInput";
import Server from '../../../mockServer'
import {connect} from "react-redux";
import globalActions from "../../../../actions/globalActions";
import mapStateToProps from "../../../../reducers/mapStateToProps";
import mapActionsToProps from "../../../../actions/mapActionsToProps";

export class AuthForm extends Component{
    state = {
        login: '',
        password: '',
    };

    updateAuthDate = (event, nameState) => {

        this.setState({
            [nameState]: event.target.value
        });
        this.buttonColor();
    };

    tryAuth = () => {
        try {
            const user = Server.authorization({
                login: this.state.login,
                password: this.state.password,
            });
            this.props.setUserAction(user);
        } catch (error) {
            console.log(error);
            alert('Неверный логин/пароль');
        }
    };

    buttonColor = () => {
        return ((this.state.login !== '') && (this.state.password !== ''))?
            'rgba(224,218,240,0.9)':
            'rgba(224,218,218,0.2)';
    };


    render() {
        return (
            <div className={styles.wrapper}>
                <h2>Login</h2>
                <TextInput updateAuthDate = {this.updateAuthDate}/>
                <PasswordInput updateAuthDate = {this.updateAuthDate}/>
                <AcceptButton background = {{background: this.buttonColor()}} text = {'Ok'} submit = {this.tryAuth}/>
            </div>
        )
    }
}



export default connect (()=>null, mapActionsToProps)(AuthForm);
