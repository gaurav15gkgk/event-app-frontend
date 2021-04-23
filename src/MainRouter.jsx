// imported some modules
import React from 'react'
import { Route, Switch } from "react-router-dom"

//imported some Components
import Register from './users/Register'
import Login from './users/Login'
import Profile from './users/Profile'
import Navbar from './core/Navbar'
import PrivateRoute from './auth/PrivateRoute'
import EditProfile from "./users/EditProfile"
import CreateEvent from './events/CreateEvent'
import Home from './core/Home'
import SingleEvent from './events/SingleEvent'
import EditEvent from './events/EditEvent'

const MainRouter = () => (
    <>  {/* Navbar component*/}
        <Navbar />
        <Switch>
            {/* Home component which have all the events */}
            <Route exact path="/" component = {Home} />

            {/* To Create Event */}
            <PrivateRoute exact path="/event/:userId" component={CreateEvent} />

            {/* to fetch single event*/}
            <Route exact path="/events/:eventId" component={SingleEvent} />

            {/* to edit a event  */}
            <PrivateRoute
                exact
                path="/event/edit/:eventId"
                component={EditEvent}
            />

            {/* Login  */}
            <Route exact path="/login" component={Login} />

            {/* Register*/}
            <Route exact path="/register" component={Register} />

            {/* Edit Profile */}
            <PrivateRoute exact path="/user/edit/:userId" component={EditProfile} />
           
            {/* to fetch the logged in user's profile */}
            <Route exact path="/user/:userId" component={Profile} />
            
        </Switch> 
    </>
)
export default MainRouter