//Required some Modules
import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'
import { connect } from 'react-redux'


//Required some Components or functions
//import { list } from "./apiEvent";
import { fetchEvents, clearCurrentEvent } from "../redux/actions/eventActions";
import {AuthUser} from "../redux/actions/userActions"



//Events Class Component
class Events extends Component {
    

    //to set the events to the state 
    componentDidMount() {
            console.log(this.props)
            this.props.fetchEvents()
            this.props.AuthUser()
            this.props.clearCurrentEvent()
            
       /* list().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                console.log(data)
                this.setState({ events: data });
            }
        }); */
    }

    

    //Render events method
    renderEvents = events => (
        
        <div className="columns is-multiline">
            {events.map((event, i) =>{
                
            const posterName = event.postedBy
                ? event.postedBy.name
                : " Unknown";
                return (
                        <div className="card column is-one-third mt-2" key={i}>
                            <div className = "card-content">
                                <h5 className="card-title is-size-5"><strong>Name of the Event : {event.EventName}</strong></h5>
                                <br />
                                <div className="is-size-6 has-text-weight-medium">Type of the Event : <strong>{event.EventType}</strong></div>
                                    
                                <div className="is-size-6 has-text-weight-medium ">Name of the Organizer : <strong>{event.EventOrganiser}</strong></div>
                                    
                                <div className="is-size-6 has-text-weight-medium">Date of the event : <strong>{new Date(event.DateOfEvent).toDateString()}</strong></div>
                                <br />
                                <div className="has-text-wieght-medium"><strong>Event Description</strong></div>
                                <p className="content has-text-weight-normal">
                                    {event.EventDescription.substring(0, 100)}
                                </p>
                                        
                                <div className = "content">
                                    <p className="is-family-monospace content has-text-weight-semibold">
                                        Posted by{" "}
                                            <span >
                                                {posterName}{" "}
                                            </span>
                                                on {new Date(event.created).toDateString()}
                                    </p>      
                                </div>
                                    <Link
                                            to={`/events/${event._id}`}
                                            className="button is-rounded is-black "
                                    >
                                        Read more
                                    </Link>
                            </div>
                        
                        </div>     
                )
            })}   
    
        </div>
    );

    render() {
        
        const events = this.props.events;
        return (
            <div className="container box box-shadow">
                <h2 className="title">Recent Events</h2>
                {this.renderEvents(events)}
            </div>
        );
    }
}

Events.propTypes = {
    fetchEvents: PropTypes.func.isRequired,
    AuthUser: PropTypes.func.isRequired,
    clearCurrentEvent: PropTypes.func.isRequired,
    events: PropTypes.array.isRequired
    
}

const mapStatetoProps = state => ({
    events: state.Allevents.events
})

export default connect(mapStatetoProps, { fetchEvents, AuthUser, clearCurrentEvent})(Events);