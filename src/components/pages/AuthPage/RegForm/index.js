import React, {Component} from "react";
import styles from './style.module.scss';
import TextInput from "../../../common/TextInput";
import AcceptButton from "../../../common/AcceptButton";
import PasswordInput from "../../../common/PasswordInput";
import Server from '../../../mockServer'
import {connect} from "react-redux";
import mapActionsToProps from "../../../../actions/mapActionsToProps";
import pushLocation from "../../../../utils/pushLocation";
import axios from 'axios';

export class RegForm extends Component{
    state = {
        login: '',
        email: '',
        password: '',
    };

    updateAuthDate = (event, nameState) => {

        this.setState({
            [nameState]: event.target.value
        });
        this.buttonColor();
    };


    buttonColor = () => {
        return ((this.state.login !== '') && (this.state.password !== ''))?
            'rgba(15,249,20,0.7)':
            'rgba(224,218,218,0.2)';
    };

    addUser = async (login, email, password) => {
        try {
            await axios.post('http://localhost:8888/api/signup', {
                name: login,
                email: email,
                password: password,
            })
            this.goToSign();
        }
        catch (e) {
            console.error(e);
        }
    };

    goToSign = () => {
        try {
            this.props.setUserAction(null);
            pushLocation('/');
        } catch (error) {
            alert(error);
        }
    }

    render() {
        return (
            <div className={styles.regFormContainer}>
            <div className={styles.wrapper}>
                <img className={styles.avatar} src={require("../../../../assets/img/icons/avatar.png")}/>

                <h2>Welcome</h2>
                <input placeholder={'Login'} onChange={(event)=> this.updateAuthDate(event, 'login')} className={styles.emailInput}/>
                <TextInput updateAuthDate = {this.updateAuthDate}/>
                <PasswordInput updateAuthDate = {this.updateAuthDate}/>
                <AcceptButton background = {{background: this.buttonColor() }} text = {'Ok'}
                              submit = {()=>{this.addUser(this.state.login, this.state.email, this.state.password)}}/>
                <div className={styles.singLinkContainer}>
                    <h3 className={styles.singLink} onClick={this.goToSign}>sign in</h3>
                </div>
            </div>
            </div>
        )
    }
}



export default connect (()=>null, mapActionsToProps)(RegForm);