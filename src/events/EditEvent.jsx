//Required some modules
import React, { Component } from "react";
import { Redirect } from "react-router-dom";

//Required some Components
import { singleEventfetch, update } from "./apiEvent";
import { isAuthenticated } from "../auth";

//Edit Event Component Class
class EditEvent extends Component {
    constructor() {
        super();
        this.state = {
            id: "",
            EventName: "",
            EventType: "",
            EventOrganiser: "",
            DateOfEvent:"",
            EventDescription:"",
            redirectToProfile: false,
            error: "",
            loading: false,
            event:''
        };
    }

    //set the state with use of eventId
    init = eventId => {
        singleEventfetch(eventId).then(data => {
            if (data.error) {
                this.setState({ redirectToProfile: true });
            } else {
                this.setState({
                    id: data.postedBy._id,
                    EventName: data.EventName,
                    EventType: data.EventType,
                    EventOrganiser: data.EventOrganiser,
                    DateOfEvent: data.DateOfEvent,
                    EventDescription: data.EventDescription,
                    error: "",
                    event: data
                });
            }
        });
    };

    //to set eventId when the component loaded
    componentDidMount() {
        const eventId = this.props.match.params.eventId;
        this.init(eventId);
    }

    //some Client side Validation
    isValid = () => {
        const { EventDescription, EventName, EventType, EventOrganiser, DateOfEvent  } = this.state;
       
        if (EventName.length === 0 || EventDescription.length === 0 || EventOrganiser.length === 0 || EventType.length === 0 || DateOfEvent.length === 0) {
            this.setState({ error: "All fields are required", loading: false });
            return false;
        }
        return true;
    };

    //to set the state when input value is changed
    handleChange = input => event => {
        this.setState({ error: "" });
        const value =  event.target.value;
        this.setState({ [input]: value});
    };

    //to perform edit event when submit button is clicked
    clickSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true });
        const { EventDescription, EventName, EventType, EventOrganiser, DateOfEvent} = this.state
        this.eventData = {
            EventName : EventName,
            EventType : EventType,
            EventOrganiser : EventOrganiser,
            DateOfEvent : DateOfEvent,
            EventDescription: EventDescription
        }
        

        if (this.isValid()) {
            const eventId = this.props.match.params.eventId;
            const token = isAuthenticated().token;
            update(eventId, token, this.eventData).then(data => {
                if (data.error) this.setState({ error: data.error });
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

    //Edit event Form
    editEventForm = (EventName, EventType, EventOrganiser, DateOfEvent, EventDescription ) => (
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
                            className="button is-rounded is-warning"
                        >
                            Update Post
                        </button>
                </>
         );

    render() {
        const {
            id,
            EventName,
            EventType,
            EventOrganiser,
            DateOfEvent,
            EventDescription,
            redirectToProfile,
            error,
            loading,
            
        } = this.state;
        console.log(id)
        if (redirectToProfile) {
            return <Redirect to={`/user/${isAuthenticated().user._id}`} />;
        }

        return (
            <div className="container box box-shadow mt-6">
                <div className="is-size-5 mb-2"> Change details of that fields whom you want to update </div>

                <div className="notification is-danger"
                        style={{ display: error ? "" : "none" }}
                        >
                        {error}
                    </div>

                        {loading ?(
                            <progress class="progress is-small is-dark" max="100">15%</progress>
                            ):("")}
                
               
                {isAuthenticated().user._id === id &&
                    this.editEventForm(EventName, EventType, EventOrganiser, DateOfEvent, EventDescription)}
            </div>
        );
    }
}

export default EditEvent;
