//imported react modules
import React, { Component } from "react";

//imported components or functions
import { isAuthenticated } from "../auth";
import { Redirect } from "react-router-dom";
import { read } from "./apiUser";
import DeleteUser from './DeleteUser'
import { listByUser } from "../events/apiEvent"
import EventsByUser from "./EventsByUser"

//Profile class component
class Profile extends Component {
    constructor() {
        super();
        this.state = {
            user: "",
            redirectToSignin: false,
            events: []
        };
    }
    
    // to fetch user data by its userId
    init = userId => {
        const token = isAuthenticated().payload.token;
        
        read(userId, token).then(data => {
            if (data.error) {
                this.setState({ redirectToSignin: true });
            } else {
                this.setState({ user: data });
                this.loadEvents(data._id);
            }
        });
    };

    //to get userid from URL and call init function
    componentDidMount() {
        const userId = this.props.match.params.userId;
        console.log(userId)
        this.init(userId)
    }

    //it will invoke when component recieve props
    componentWillReceiveProps(props) {
        const userId = props.match.params.userId;
        this.init(userId);
      }
    
    //load events by a particular user
    loadEvents = userId => {
        const token = isAuthenticated().token;
        listByUser(userId, token).then(data => {
          if (data.error) {
            console.log(data.error);
          } else {
            this.setState({ events: data });
          }
        });
      };

    render() {
        const {redirectToSignin, user, events} = this.state;
        if (redirectToSignin) return <Redirect to="/login" />;

        return (
            <div className="container box box-shadow">
                <h2 className="title is-size-3"><strong>Profile</strong></h2>
                <div className="columns">
                    <div className="column">
                        <div className="is-size-5">Hello <strong>{isAuthenticated().payload.user.name}</strong></div>
                        <div className="is-size-5">Email: <strong>{isAuthenticated().payload.user.email}</strong></div>
                    </div>
                    <div className="column">
                    {isAuthenticated().payload.user &&
                            isAuthenticated().payload.user._id === user._id && (
                                <div className="buttons">
                                   
                                    <DeleteUser userId = { user._id} />
                                </div>
                            )}
                    </div>

                </div>
                
                <EventsByUser events={events} />
            </div>
        );
    }
}
export default Profile;
