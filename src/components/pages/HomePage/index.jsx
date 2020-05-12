import React, {Component} from 'react';
import Page from "../../common/Page";
import TopBar from "./TopBar";
import NavBar from "./NavBar";
import PostSection from "./sections/PostSection";


export default class HomePage extends Component {

    render(){
        return (
            <Page>
                <TopBar/>
                <div style = {{height: '100%', display: 'flex' }}>
                    <NavBar/>
                    <PostSection/>
                </div>
            </Page>
        )
    }
}
/*
to do:
* Подключить файл normalize
* */
