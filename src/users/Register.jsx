//Imported Some Modules
import React , { Component } from 'react'
import { Link } from 'react-router-dom'

//Imported Some functions
import {registeruser } from '../auth'

//Register Class component
class Register extends Component {
    constructor(){
        super()
        this.state={
            name: "",
            email: "",
            password: "",
            error: "",
            open: false,
            loading: false
        }
    }

    //to get the change in the input element value and reflects in state
    handleChange = input => event => {
        this.setState({ error: ''})
        this.setState({ [input]: event.target.value })
    }

    // Registration function after submit button clicked
    clickSubmit = event => {
        event.preventDefault()
        const { name , email, password } = this.state
        const user = {
            name,
            email,
            hashed_password: password
        }
        registeruser(user).then(data => {
            console.log(user)
            if(data.error)
                this.setState({ error: data.error, loading:false })
            else{
                this.setState({
                    error:"",
                    name:"",
                    email:"",
                    password:"",
                    open: true,
                    loading: false
                })
            }
        })
    }

    //register form
    registerForm = (name , email , password) => (
        <form>
            <div className="field">
                <label  className="label">Name</label>
                <input 
                    onChange={this.handleChange("name")}
                    type="text"
                    className="input is-rounded"
                    value={name}
                />
            </div>
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
                <label  className="label">Password</label>
                <input
                    onChange={this.handleChange("password")}
                    type="password"
                    className="input is-rounded"
                    value={password}
                />
            </div>

            <button
                onClick={this.clickSubmit}
                className="button is-dark is-rounded is-focused">
                Submit
            </button>
        </form>
    )

    // to show error messages and success message
    Message = (error, open ) => (
        <>
            <div className="notification is-danger"
                style={{display: error ? "" : "none"}}
            >
                {error}
            </div>

            <div className="notification is-info"
                style={{ display: open ? "" : "none" }}
            >
                Your new account is succuessefy created. Please <Link to ="/login" >Log In</Link>
            </div>
        </>
    )

    //render method
    render(){
        const { name , email, password, error, open , loading } = this.state;
        return (
            <div className="box box-shadow container mt-6">
                <h2 className="title">Register</h2>
                <div className="mt-3">
                    {this.Message(error, open )}
                    {loading ?(
                        <progress className="progress is-small is-dark" max="100">15%</progress>
                    ):("")}
                    {this.registerForm(name, email, password)}
                </div>
            </div>
        )
    }
}

export default Register
