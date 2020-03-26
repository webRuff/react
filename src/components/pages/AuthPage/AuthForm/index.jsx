import React, {Component} from "react";
import styles from './style.module.scss';
import TextInput from "../../../common/TextInput";
import AcceptButton from "../../../common/AcceptButton";
import PasswordInput from "../../../common/PasswordInput";
import Server from '../../../mockServer'

export default class AuthForm extends Component{
    state = {
        login: '',
        password: '',
        authBool: false,
    };

    updateAuthDate = (event, nameState) => {

        if ((this.state.login !== '') && (this.state.password !== '')) {
            this.setState({authBool: true});
            console.log(this.state.authBool);
        } else {
            this.setState({authBool: false});
            console.log(this.state.authBool);

        }

        this.setState({
            [nameState]: event.target.value
        });
    };

    tryAuth = () => {
        try {
            const user = Server.authorization({
                login: this.state.login,
                password: this.state.password,
            });
            this.props.setLoggedUser(user);
            console.log('--------->Logged');
        } catch (error) {
            console.log(error);
            alert('Неверный логин/пароль');
        }
    };

    buttonColor = () => {
            return this.state.authBool ? 'rgba(224,218,218,0.7)' : 'rgba(224,218,218,0.2)';
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