//imported some Modules
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

//imported some components or functions
import { isAuthenticated } from '../auth';
import {  remove } from './apiEvent';
import { fetchCurrentEvent  , clearCurrentEvent} from '../redux/actions/eventActions'

//SingleEvent Class Component
class SingleEvent extends Component {
    state = {
        event: '',
        redirectToHome: false,
        redirectToSignin: false,
    };

    // to fetch the single event by its eventId
    componentDidMount = () => {
        const eventId = this.props.match.params.eventId;

        this.props.fetchCurrentEvent(eventId)
        

       /* singleEventfetch(eventId).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({
                    event: data  
                });
            }
        });
    
     */
    }

    //Delete post fuction
    deletePost = () => {
        const eventId = this.props.match.params.eventId;
        const token = isAuthenticated().token;
        remove(eventId, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ redirectToHome: true });
            }
        });
    };

    //to ask for confirmation for deletion of events
    deleteConfirmed = () => {
        let answer = window.confirm('Are you sure you want to delete your event?');
        if (answer) {
            this.deletePost();
        }
    };

    // renderEvent  function
    renderEvent = event => {  
        const posterName = event.postedBy ? event.postedBy.name : ' Unknown';
        return (
            <div className="card p-3">
                <div className="columns">
                    <div className="column">
                        <div className="is-size-6-mobile has-text-weight-medium is-size-4-desktop">Type of the Event : <strong>{event.EventType}</strong></div>
                        
                        <div className="is-size-4-desktop has-text-weight-medium is-size-6-mobile">Name of the Organizer : <strong>{event.EventOrganiser}</strong></div>
                        
                        <div className="is-size-4-desktop is-size-6-mobile has-text-weight-medium">Date of the event : <strong>{new Date(event.DateOfEvent).toDateString()}</strong></div>
                            <br />
                            <div className="is-size-4-desktop  is-size-6-mobile has-text-wieght-medium"><strong>Event Description</strong></div>
                            <p className="content has-text-weight-normal is-size-4-desktop is-size-6-mobile">
                                {event.EventDescription}
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
                    </div>

                        <div className="column">
                            <div className="buttons">
                                <Link to={`/`} className=" mt-2 button is-rounded is-focused is-dark" onClick = {() => this.props.clearCurrentEvent()}>
                                    Back to posts
                                </Link>

                                {isAuthenticated().user && isAuthenticated().user._id === event.postedBy._id && (
                                    <>
                                        <Link to={`/event/edit/${event._id}`} className=" button is-rounded is-focused is-warning">
                                            Update Post
                                        </Link>
                                        <button onClick={this.deleteConfirmed} className="button is-rounded is-focused is-danger">
                                            Delete Post
                                        </button>
                                    </>
                                )}
                           
                            </div>
                        </div>
                </div>                  
            </div>
        );
    };

    
    render() {
        const {  redirectToHome, redirectToSignin,  } = this.state;
        const event = this.props.currentEvent
        if (redirectToHome) {
            return <Redirect to={`/`} />;
        } else if (redirectToSignin) {
            return <Redirect to={`/signin`} />;
        }
        return (
            <div className="container box box-shadow mt-6">
                <h2 className="title is-size-2-desktop is-size-4-mobile mt-5 mb-5">Name of the Event: <span className="is-family-secondary"><strong>{event.EventName}</strong></span></h2>
                {!event ? (
                            <progress class="progress is-small is-dark" max="100">15%</progress>
                        ) : (
                    this.renderEvent(event)
                )}
            </div>
        );
    }
}

SingleEvent.propTypes = {
    fetchCurrentEvents: PropTypes.func.isRequired,
    clearCurrentEvent: PropTypes.func.isRequired,
    currentEvent: PropTypes.object.isRequired
    
}

const mapStatetoProps = state => ({
    currentEvent: state.CurrentEvent.currentEvent
})

export default connect(mapStatetoProps, { fetchCurrentEvent, clearCurrentEvent })(SingleEvent);


