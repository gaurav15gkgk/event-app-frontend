//to create an Event
const create = (userId, token, event) => {
    return fetch(`${process.env.REACT_APP_API_URL}/event/new/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(event)

    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

//to get all the events from the database
const list = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/events`, {
        method: "GET"
    })
        .then(response => {
            console.log(response)
            return response.json();
        })
        .catch(err => console.log(err));
};

// to show single event when clicked on read more
const singleEventfetch = eventId => {
   
    return fetch(`${process.env.REACT_APP_API_URL}/events/${eventId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

//to delete the user from the data base
const remove = (eventId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/event/${eventId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

//to update the post 
 const update = (eventId, token, event) => { 
    return fetch(`${process.env.REACT_APP_API_URL}/event/${eventId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(event)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

//to get all the events from a user
 const listByUser = (userId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/events/by/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export {
    create,
    list,
    singleEventfetch,
    remove,
    update,
    listByUser
}