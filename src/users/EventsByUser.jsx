//Import Some modules
import React, { Component } from "react";
import { Link } from "react-router-dom";

//Events By user Class Component
class EventsByUser extends Component {
    render() {
        const { events } = this.props;
        console.log(events)
        return (
            <div className="mt-4">
                    <div className="container">
                        <h3 className="is-size-4 has-text-weight-semibold">{events.length} Events</h3>
                        <hr />
                        {events.map((event, i) => (
                            <div key={i}>
                                <div>
                                    <Link to={`/events/${event._id}`}>
                                        <div>
                                            <p className="is-size-5">{event.EventName}</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                
            </div>
        );
    }
}
export default EventsByUser;
