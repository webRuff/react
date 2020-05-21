import React, {Component} from "react";
import {connect} from "react-redux";
import mapStateToProps from "../reducers/mapStateToProps";
import mapActionsToProps from "../actions/mapActionsToProps";

export class UserHelper extends Component {

    addLikedPostToUser = (postId) => {
        this.props.addLikedPost(postId);
    }
}

export default connect (mapStateToProps.global, mapActionsToProps)(UserHelper);