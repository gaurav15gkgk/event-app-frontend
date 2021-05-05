//require some modules
import React, { Component } from "react";
import { Redirect } from "react-router-dom";

//require some components
import { isAuthenticated } from "../auth";
import { create } from "./apiEvent";

//Create Event Class Component
class CreateEvent extends Component {
    constructor() {
        super();
        this.state = {
            EventName: "",
            EventType: "",
            EventOrganiser: "",
            DateOfEvent:"",
            EventDescription:"",
            error: "",
            user: {},
            loading: false,
            redirectToProfile: false
        };
    }

    //to set the state of the user when this component loaded
    componentDidMount() {
        this.setState({ user: isAuthenticated().user });
    }

    //Some Client side validation
    isValid = () => {
        const { EventDescription, EventName, EventType, EventOrganiser, DateOfEvent  } = this.state;
        if (EventName.length === 0 || EventDescription.length === 0 || EventOrganiser.length === 0 || EventType.length === 0 || DateOfEvent.length === 0) {
            this.setState({ error: "All fields are required", loading: false });
            return false;
        }
        return true;
    };

    //to update state when the input fields value changes
    handleChange = input => event => {
        this.setState({ error: "" });
        const value = event.target.value;  
        this.setState({ [input]: value });
    };

    //to perform creation of event when submit button is clicked
    clickSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true });
        const { EventDescription, EventName, EventType, EventOrganiser, DateOfEvent} = this.state
        this.postData = {
            EventName : EventName,
            EventType : EventType,
            EventOrganiser : EventOrganiser,
            DateOfEvent : DateOfEvent,
            EventDescription: EventDescription
        }

        if (this.isValid()) {
            const userId = isAuthenticated().user._id;
            const token = isAuthenticated().token;
        
            create(userId, token, this.postData).then(data => {
                if (data.error) this.setState({ error: data.error , loading: false});
                else {
                    this.setState({
                        loading: false,
                        EventName: "",
                        EventType: "",
                        EventOrganiser: "",
                        DateOfEvent:"",
                        EventDescription:"",
                        redirectToProfile: true
                    });
                }
            });
        }
    };

    //Event form 
    newEventForm = ({EventName, EventType, EventOrganiser, DateOfEvent, EventDescription } = this.state) => (
        <>
            
            <div className="field">
                <label className="label">Name of Event</label>
                <input
                    onChange={this.handleChange("EventName")}
                    type="text"
                    className="input is-rounded"
                    value={EventName}
                />
            </div>
            <div className="field">
                <label className="label">Type of Event</label>
                <input
                    onChange={this.handleChange("EventType")}
                    type="text"
                    className="input is-rounded"
                    value={EventType}
                />
            </div>
            <div className="field">
                <label className="label">Date of Event</label>
                <input
                    onChange={this.handleChange("DateOfEvent")}
                    type="date"
                    className="input is-rounded"
                    value={DateOfEvent}
                />
            </div>
            <div className="field">
                <label className="label">Event Organiser</label>
                <input
                    onChange={this.handleChange("EventOrganiser")}
                    type="text"
                    className="input is-rounded"
                    value={EventOrganiser}
                />
            </div>
           

            <div className="field">
                <label className="label">Event Description</label>
                <textarea
                    onChange={this.handleChange("EventDescription")}
                    type="text"
                    className="textarea is-info"
                    value={EventDescription}
                />
            </div>

            <button
                onClick={this.clickSubmit}
                className="button is-rounded is-focused is-black"
            >
                Create Post
            </button>
        </>
    );

    render() {
        const {
            EventName,
            EventType,
            EventOrganiser,
            DateOfEvent,
            EventDescription,
            error,
            user,
            loading,
            redirectToProfile
        } = this.state;

        if (redirectToProfile) {
            return <Redirect to={`/user/${user._id}`} />;
        }

        return (
            
            <div className="container box box-shadow mt-6">
                <h2 className="title">Create a new Event</h2>
                    <div className="notification is-danger"
                        style={{ display: error ? "" : "none" }}
                        >
                        {error}
                    </div>
                        {loading ?(
                            <progress class="progress is-small is-dark" max="100">15%</progress>
                            ):("")}

                    {this.newEventForm(EventName, EventType, EventOrganiser, DateOfEvent, DateOfEvent, EventDescription)}
            </div>
        );
    }
}

export default CreateEvent;
