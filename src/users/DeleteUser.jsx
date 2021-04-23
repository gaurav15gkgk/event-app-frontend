//import some Modules
import React, { Component } from "react";
import { Redirect } from "react-router-dom";

//import some fuctions and components
import { isAuthenticated } from "../auth";
import { remove } from "./apiUser";
import { logout } from "../auth";

//Delete user Class component
class DeleteUser extends Component {
    state = {
        redirect: false
    };

    //delete account function
    deleteAccount = () => {
        const token = isAuthenticated().token;
        const userId = this.props.userId;
        console.log()
        remove(userId, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                // signout user
                logout(() => console.log("User is deleted"));
                // redirect
                this.setState({ redirect: true });
            }
        });
    };

    //for seeking the confirmation before deletion of user
    deleteConfirmed = () => {
        let answer = window.confirm(
            "Are you sure you want to delete your account?"
        );
        if (answer) {
            this.deleteAccount();
        }
    };

    render() {
        if (this.state.redirect) {
            return <Redirect to="/" />;
        }
        return (
            <button
                onClick={this.deleteConfirmed}
                className="button is-rounded is-focused is-danger"
            >
                Delete Profile
            </button>
        );
    }
}

export default DeleteUser;