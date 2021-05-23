import React, { Component } from 'react'
import { Switch, Route } from "react-router-dom"
import Login from './pages/Login'
import Register from './pages/Register'
import Signup from './pages/Signup'
import Logindr from './pages/Logindr'
import Home from './pages/Home'
import Apoinmentfix from './pages/Apoinmentfix'
import History from './pages/History'
import Appoinments from './pages/Appoinments'
import Slot from './pages/Slot'
import Selectslot from './pages/Selectslot'

export default class Layout extends Component {

    
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/drlogin" component={Logindr} />
                    <Route exact path="/home" component={Home} />
                    <Route exact path="/book/:doctor_id" component={Apoinmentfix} />
                    <Route exact path="/history" component={History} />
                    <Route exact path="/appoinments" component={Appoinments} />
                    <Route exact path="/slot" component={Slot} />
                    <Route exact path="/select" component={Selectslot} />
                </Switch>
            </div>
        )
    }
}
