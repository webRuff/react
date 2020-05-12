import React from "react";
import HomePage from "../pages/HomePage";
import AuthPage from "../pages/AuthPage";
import {store} from "../../App";
import { connect } from 'react-redux'
import mapStateToProps from "../../reducers/mapStateToProps";
import mapActionsToProps from "../../actions/mapActionsToProps";
import PostModalWindow from "../pages/HomePage/sections/PostSection/PostModalWindow";

class Router extends React.Component{

    render() {
        return   <div className="App">
            {(this.props.postModalWindow && <PostModalWindow test = {'hi!'}/>) || ((this.props.user && <HomePage/>) || <AuthPage/>)/*
                (this.props.user && <HomePage/>) || <AuthPage/>*/}
        </div>
    }
}

export default connect (mapStateToProps.global, mapActionsToProps)(Router);
