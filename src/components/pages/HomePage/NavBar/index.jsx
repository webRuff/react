import React, {Component} from "react";
import styles from './style.module.scss';
import NavButton from "./NavButton";
import {connect} from 'react-redux'
import store from "../../../../App"
import mapActionsToProps from "../../../../actions/mapActionsToProps";
import icons from "../../../../assets/assets"

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
            label: 'Подписки',
            id: 2,
            icon: icons.subscription,
        },
        {
            label: 'Комментарии',
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

    //shouldComponentUpdate(nextProps, nextState, nextContext) {
       // return nextState.activeButtonId !== this.state.activeButtonId || false


    render() {
        return (
            <div className={styles.wrapper}>
                {
                    this.state.buttons.map((button) => {
                        return ( <NavButton
                            label = {button.label}
                            key= {button.id}
                            active= {this.props.activeButtonId === button.id}
                            cb = {()=> {
                            this.props.updateActiveButtonIdAction(button.id);
                            }}
                            icon = {button.icon}
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
