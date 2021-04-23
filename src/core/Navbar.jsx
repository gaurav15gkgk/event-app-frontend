//required some modules
import React ,{ Fragment } from 'react'
import { Link, withRouter  } from 'react-router-dom';

////Required some components
import { logout, isAuthenticated} from "../auth"

//Navbar class component
 class  Navbar extends React.Component {
    render(){
        return (
            <>
                <nav class="navbar is-black" role="navigation" aria-label="main navigation">
                    <div class="navbar-brand">
                        <Link to ="/">
                                <div className="navbar-item"><strong className="is-size-3 has-text-white is-fixed">Event Fusion</strong></div>
                        </Link>
                        
                        <div role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </div>
                    </div>
        
                    <div id="navbarBasicExample" class="navbar-menu">
                        <div class="navbar-end">
                            <Link className="navbar-item is-size-5" to="/event/:userId">
                                Create New Event 
                            </Link>
                            {/* to show logged in user in navbar */}
                            {isAuthenticated() && (
                                <Fragment>
                                        <Link
                                            to={`/user/${isAuthenticated().user._id}`}
                                            className="navbar-item is-size-5 "
                                            
                                        >
                                            {`${isAuthenticated().user.name}'s profile`}
                                        </Link>
                                    
                                        <span onClick={() => {logout() 
                                                                this.props.history.push('/')
                                                            }}             
                                            className="navbar-item is-size-5 " style = {{ cursor: 'pointer'}}>
                                            Log Out
                                        </span>
                                </Fragment>
                            )}
                            {/* to show register and login when not logged in */}
                            {!isAuthenticated() && (
                                <Fragment>
                                   <div class="navbar-item">
                                        <div class="buttons">
                                            <Link class="button is-light" to="/register">
                                                    <strong>Register</strong>
                                            </Link>
                                            <Link class="button is-light" to="/login">
                                                  <strong>Log in</strong>  
                                            </Link>
                                         </div>
                                    </div>
                                </Fragment>
                            )}
                        </div>
                    </div>
                </nav> 
            </>
        )
    }
    
}

export default withRouter(Navbar)
