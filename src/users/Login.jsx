//Import Some Modules
import React, { Component } from "react";
import {  Redirect } from "react-router-dom";

//Import some functions or Components
import { loginuser, authenticate} from "../auth";

//LOgin user Class Component
class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            error: "",
            redirectToReferer: false,
            loading: false,
            recaptcha: false
        };
    }

    //to set the state when the input element value changes
    handleChange = input => event => {
        this.setState({ error: "" });
        this.setState({ [input]: event.target.value });
    };

    //Login function after clicking submit button
    clickSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true });
        const { email, password } = this.state;
        const user = {
            email,
            hashed_password : password
        };
       
        loginuser(user).then(data => {
            if (data.error) {
                this.setState({ error: data.error, loading: false });
            } else {
                // authenticate
                authenticate(data, () => {
                    this.setState({ redirectToReferer: true });
                });
            }
        });
        
    };

    //login form 
    loginForm = (email, password) => (
        <form className = "mt-3">
            <div className="field">
                <label className="label">Email</label>
                <div className = "control has-icons-left has-icons-right">
                <input
                    onChange={this.handleChange("email")}
                    type="email"
                    className="input is-rounded"
                    value={email}
                />
                 <span className="icon is-small is-left">
                            <i className="fas fa-envelope"></i>
                        </span>
                </div>
            </div>
            <div className="field">
                <label className="label">Password</label>
                <input
                    onChange={this.handleChange("password")}
                    type="password"
                    className="input is-rounded"
                    value={password}
                />
            </div>


            <button
                onClick={this.clickSubmit}
                className="button is-rounded is-black is-focused"
            >
                Submit
            </button>
        </form>
    );

    render() {
        const {
            email,
            password,
            error,
            redirectToReferer,
            loading,
        } = this.state;

        if (redirectToReferer) {
            return <Redirect to="/" />;
        }
        return (
        <div  >
            <div className="container box box-shadow mt-6">
                <h2 className="title">LogIn</h2>

                <div className="notification is-danger"
                        style={{ display: error ? "" : "none" }}
                    >
                        {error}
                </div>

                {loading ?(
                            <progress class="progress is-small is-dark" max="100">15%</progress>
                        ):("")}

                {this.loginForm(email, password)}  
            </div>
        </div>
        );
    }
}
export default Login;
