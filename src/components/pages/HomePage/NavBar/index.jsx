import React, {Component} from "react";
import styles from './style.module.scss';
import NavButton from "./NavButton";
import {connect} from 'react-redux'
import mapActionsToProps from "../../../../actions/mapActionsToProps";
import icons from "../../../../assets/assets";
import pushLocation from "../../../../utils/pushLocation";
import preStorageProcessing from "../../../../utils/preStorageProcessing";
import PostSection from "../sections/PostSection";
import axios from "axios";

export class NavBar extends Component{

    constructor(props) {
        super(props);
        this.state = {
            buttons: [
        {
            label: 'Главная',
            id: 1,
            icon: icons.general,
        },
        {
            label: 'Избранное',
            id: 2,
            icon: icons.subscription,
        },
        {
            label: 'Мои посты',
            id: 3,
            icon: icons.comments,
        },
        {
            label: 'Настройки',
            id: 4,
            icon: icons.settings,
        }
            ]
        }
    }

    showGeneralPage = async () => {
        this.props.clearAllPost();
        const { data } = await axios.get('http://localhost:8888/api/posts');
        this.props.writePosts(data.reverse());

    };

    showMyPosts = () => {
        const myPosts = this.props.posts.filter(post => post.postAuthor === this.props.user.name);
        this.props.clearAllPost();
        this.props.writePosts(myPosts);
    };

    showFavorites = async () => {
        const { data } = await axios.get('http://localhost:8888/api/posts');
        const subs = this.props.user.mySubs.split(',');
        const mySubs = data.filter(post =>
            subs.includes(post.postAuthor)
        );
        //alert(preStorageProcessing.toString(mySubs));
        this.props.clearAllPost();
        this.props.writePosts(mySubs);
    }

    toggleButtonsFunc = (buttonId) => {
        switch (buttonId) {
            case 1 :
                this.props.updateActiveButtonIdAction(buttonId);
                this.showGeneralPage();
                break;
            case 2 :
                this.props.updateActiveButtonIdAction(buttonId);
                this.showFavorites();
                break;
            case 3:
                this.props.updateActiveButtonIdAction(buttonId);
                this.showMyPosts();
                break;
            case 4 :
                this.props.updateActiveButtonIdAction(buttonId);
                break;
        }
    }

    render() {
        return (
            <div className={styles.wrapper}>
                {
                    this.state.buttons.map((button) => {
                        return ( <NavButton
                            label = {button.label}
                            key= {button.id}
                            active= {this.props.activeButtonId === button.id}
                            /*cb = {()=> {
                            this.props.updateActiveButtonIdAction(button.id);
                            }}*/
                            icon = {button.icon}
                            buttonsFunc = { () => { this.toggleButtonsFunc(button.id)}
                            }
                        />

                        );
                    })}
            </div>
        );
    }
}


export default connect(
    (store)=>({
        ...store.global,
        ...store.navigate,
}),
    mapActionsToProps
)(NavBar); {/*Функция высшего порядка. Функция которая
возвращает другую функцию (арг ф1)(арг ф2)*/}
