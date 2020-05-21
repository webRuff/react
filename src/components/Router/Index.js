import React from "react";
import HomePage from "../pages/HomePage";
import AuthPage from "../pages/AuthPage";
import RegForm from "../pages/AuthPage/RegForm";
import {store} from "../../App";
import { connect } from 'react-redux'
import mapStateToProps from "../../reducers/mapStateToProps";
import mapActionsToProps from "../../actions/mapActionsToProps";
import PostModalWindow from "../pages/HomePage/sections/PostSection/PostModalWindow";
import { BrowserRouter } from "react-router-dom";
import { Route, Redirect} from 'react-router-dom'

class Router extends React.Component{
//exact - точное совпадение путей
    render() {
        return (  <div className="App">
            <BrowserRouter>
                {
                 /*   !this.props.user && <Route exact path='/' component={AuthPage}/> ||
                        <Redirect to={'/home'}/>
                }
                <Route exact path='/home' component={HomePage}/>*/}
                <Route exact path='/' component={AuthPage}/>
                <Route exact path='/home' component={HomePage}/>
                <Route exact path='/createPost' component={PostModalWindow}/>
                <Route exact path='/newUser' component={RegForm}/>
                {/*{
                    (()=>{
                        switch (window.location.pathname) {
                            case '/auth': return <AuthPage/>;
                            case '/home': return <HomePage/>;
                        }
                    })()

                   }*/}
                }
            </BrowserRouter>
           {/* {(this.props.postModalWindowOpen && <PostModalWindow test = {'hi!'}/>) || ((this.props.user && <HomePage/>) || <AuthPage/>)/*
                (this.props.user && <HomePage/>) || <AuthPage/>*!/*/}
        </div>
        );
    }
}

export default connect (mapStateToProps.global, mapActionsToProps)(Router);
