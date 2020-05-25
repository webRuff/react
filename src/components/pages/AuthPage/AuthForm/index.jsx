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
import preStorageProcessing from "../../../../utils/preStorageProcessing";
import mapStateToProps from "../../../../reducers/mapStateToProps";
import {PostSection} from "../../HomePage/sections/PostSection";

export class AuthForm extends Component{
    state = {
        email: '',
        password: '',
    };

    updateAuthDate = (event, nameState) => {

        this.setState({
            [nameState]: event.target.value
        });
        this.buttonColor();
    };

    tryAuth = async () => {
        try {
            const {data: {user} } = await axios.post('http://localhost:8888/api/signin',{
                email: this.state.email,
                password: this.state.password,
                });
            if(!user) {
                alert('Неверный логин/пароль');
                return;
            }
                this.props.setUserAction(user);



                pushLocation('/home');
        } catch (error) {
                alert(error);
        }
    };

    buttonColor = () => {
        return ((this.state.login !== '') && (this.state.password !== ''))?
            'rgba(15,249,20,0.7)':
            'rgba(224,218,218,0.2)';
    };

    goToReg = () => {
        try {
            const user = {name: 'tmp', login: 'tmp', password: 'tmp', likedPosts: []};
            this.props.setUserAction(user);
            pushLocation('/newUser');
        } catch (error) {
            alert('Неверный логин/пароль');
        }
    }




    render() {
        return (
            <div className={styles.wrapper}>
                <img className={styles.avatar} src={require("../../../../assets/img/icons/avatar.png")}/>

                <h2>Welcome</h2>
                <TextInput updateAuthDate = {this.updateAuthDate}/>
                <PasswordInput updateAuthDate = {this.updateAuthDate}/>
                <AcceptButton background = {{background: this.buttonColor() }} text = {'Ok'} submit = {this.tryAuth}/>
                <div className={styles.regLinkContainer}>
                    <h3 className={styles.regLink} onClick={this.goToReg}>registration</h3>
                </div>
            </div>
        )
    }
}



export default connect (mapStateToProps.global, mapActionsToProps)(AuthForm);
