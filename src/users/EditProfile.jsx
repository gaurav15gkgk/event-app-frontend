//import some modules
import React, { Component } from "react";
import { Redirect } from "react-router-dom";

// import some functions or componentss
import { isAuthenticated } from "../auth";
import { read, update, updateUser } from "./apiUser";

//Edit profile class Component 
class EditProfile extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      name: "",
      email: "",
      password: "",
      redirectToProfile: false,
      error: "",
      
      loading: false,
      about: ""
    };
  }

  //to fetch user details by its userId
  init = userId => {
    const token = isAuthenticated().token;
    read(userId, token).then(data => {
      if (data.error) {
        this.setState({ redirectToProfile: true });
      } else {
        this.setState({
          id: data._id,
          name: data.name,
          email: data.email,
          error: "",
          password:''
        });
      }
    });
  };

  //to get userId from user and execute init method
  componentDidMount() {
    const userId = this.props.match.params.userId;
        this.init(userId);
  }

  //Some Client Side Validation
  isValid = () => {
    const { name, email, password } = this.state;
   
    if (name.length === 0) {
      this.setState({ error: "Name is required", loading: false });
      return false;
    }
    // email@domain.com
    // eslint-disable-next-line no-useless-escape
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      this.setState({
        error: "A valid Email is required",
        loading: false
      });
      return false;
    }
    if (password.length >= 1 && password.length <= 5) {
      this.setState({
        error: "Password must be at least 6 characters long",
        loading: false
      });
      return false;
    }
    return true;
  };

  //to capture the changes in the state variable when input element value changes
  handleChange = input => event => {
    this.setState({ [input]: event.target.value })
  };

  //Edit user after clicking Submit button
  clickSubmit = event => {
    event.preventDefault();
    const { name, email, password } = this.state;
    const user = {
                name,
                email,
                password: password || undefined
        };

    
    if (this.isValid()) {
      const userId = this.props.match.params.userId;
      const token = isAuthenticated().token;

      update(userId, token, user).then(data => {
        if (data.error) {
          this.setState({ error: data.error });
        } else 
        {
          updateUser(data, () => {
            this.setState({
              redirectToProfile: true
            });
          });
        }
      });
    }
  };

  //update Form
  updateForm = (name, email, password) => (
    <>
        <div className="field">
          <label className="label">Name</label>
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
          <label className="label">Password</label>
          <input
            onChange={this.handleChange("password")}
            type="password"
            className="input is-rounded"
            value={password}
          />
        </div>
        <button onClick={this.clickSubmit} className="button is-rounded is-warning">
          Update
        </button>
    </>
  );

  render() {
    const {
      id,
      name,
      email,
      password,
      redirectToProfile,
      error,
      loading,
  
    } = this.state;

    if (redirectToProfile) {
      return <Redirect to={`/user/${id}`} />;
    }
    
    return (
      <div className="container box box-shadow mt-6">
        <h2 className="title">Edit Profile</h2>
        <div className="notification is-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
        </div>
        {loading ?(
            <progress class="progress is-small is-dark" max="100">15%</progress>
        ):("")}
        {isAuthenticated().user._id === id &&
          this.updateForm(name, email, password)}
      </div>
    );
  }
}

export default EditProfile;