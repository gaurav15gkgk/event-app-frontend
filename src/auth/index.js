// for registering the user
const registeruser = user => {
    return fetch(`${process.env.REACT_APP_API_URL}/register`, {
        method: 'POST',
        headers:{
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then( response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

//for login the user
 const loginuser = user => {
    return fetch(`${process.env.REACT_APP_API_URL}/login`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

//for authenticate the user
const authenticate = (jwt, next) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(jwt));
        next();
    }
};

//for loggin out the user
 const logout = next => {
    if (typeof window !== 'undefined') 
        localStorage.removeItem('jwt');
    return fetch(`${process.env.REACT_APP_API_URL}/logout`, {
        method: 'GET'
    })
        .then(response => {
            console.log('signout', response);
            return response.json();
        })
        .catch(err => console.log(err));
};


//for checking whether the logged in user is the given user who perform some 
 const isAuthenticated = () => {
    if (typeof window == 'undefined') {
        return false;
    }
    if (localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'));
    } else {
        return false;
    }
};

export {
    registeruser,
    loginuser , authenticate,
    logout, isAuthenticated
}