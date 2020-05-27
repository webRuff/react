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
import {userImg} from '../../../../assets/assets'

export class RegForm extends Component{
    state = {
        login: '',
        email: '',
        password: '',
        userAvatar: userImg.userImg2,
        userImgPosition: 0,
        pathToAvatar: "../../../../../../assets/img/userImg/0.jpeg"
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

    addUser = async (login, email, password, pathToAvatar) => {
            await axios.post('http://localhost:8888/api/signup', {
                name: login,
                email: email,
                password: password,
                userImg: pathToAvatar,
            })
            const {data: {user} } = await axios.post('http://localhost:8888/api/signin',{
                email: email,
                password: password,
            });
            await axios.post('http://localhost:8888/api/likedPosts', {
                userId: user['_id'],
            });
            this.goToSign();
        }
        catch (e) {
            console.error(e);
        }


    goToSign = () => {
        try {
            this.props.setUserAction(null);
            pushLocation('/');
        } catch (error) {
            alert(error);
        }
    }

    toggleUserImg = () => {
        switch (this.state.userImgPosition) {
            case 0:
                this.setState({userAvatar: userImg.unknown});
                this.setState({userImgPosition: 1});
                this.setState({pathToAvatar: "../../../../../../assets/img/userImg/0.jpeg"});
                break;
            case 1:
                this.setState({userAvatar: userImg.userImg1});
                this.setState({userImgPosition: 2});
                this.setState({pathToAvatar: "../../../../../../assets/img/userImg/1.jpeg"});
                break;
            case 2:
                this.setState({userAvatar: userImg.userImg2});
                this.setState({userImgPosition: 3});
                this.setState({pathToAvatar: "../../../../../../assets/img/userImg/2.jpeg"});
                break;
            case 3:
                this.setState({userAvatar: userImg.userImg3});
                this.setState({userImgPosition: 4});
                this.setState({pathToAvatar: "../../../../../../assets/img/userImg/3.jpeg"});
                break;
            case 4:
                this.setState({userAvatar: userImg.userImg4});
                this.setState({userImgPosition: 0});
                this.setState({pathToAvatar: "../../../../../../assets/img/userImg/4.jpeg"});
                break;
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

                <img className={styles.userImg} src={this.state.userAvatar} onClick={this.toggleUserImg}/>

                <AcceptButton background = {{background: this.buttonColor() }} text = {'Ok'}
                              submit = {()=>{this.addUser(this.state.login, this.state.email, this.state.password, this.state.pathToAvatar)}}/>
                <div className={styles.singLinkContainer}>
                    <h3 className={styles.singLink} onClick={this.goToSign}>sign in</h3>
                </div>
            </div>
            </div>
        )
    }
}



export default connect (()=>null, mapActionsToProps)(RegForm);