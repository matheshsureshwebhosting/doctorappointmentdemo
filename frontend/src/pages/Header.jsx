import React, { Component } from 'react'
import usericon from "../assets/images/usericon.png"
import { Link } from 'react-router-dom';
import "../assets/css/header.css"
export default class Header extends Component {
    constructor(props) {
        super()
        this.state = {
            patient_userid: localStorage.getItem("patient_userid"),
            doctor_id: localStorage.getItem("doctor_id")
        }
    }
    logout = () => {
        localStorage.removeItem("patient_userid")
        localStorage.removeItem("doctor_id")
        window.location.replace("/")
    }
    render() {
        const { patient_userid, doctor_id } = this.state
        return (
            <React.Fragment>
                <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "white" }}>
                    <div className="container-fluid">
                        <Link style={{ textDecoration: "none", color: "black" }} to={patient_userid === null ? "/" : "/home"}> <img alt="" style={{ height: "8vh" }}></img><span className="heading-title" style={{ fontSize: "20px", fontWeight: "bold" }} > &nbsp; Doctor Appointment</span></Link>
                        <div className="dropdown" id="dropdowndiv" style={{ marginLeft: "-100px" }}>
                            {
                                patient_userid !== null || doctor_id !== null ? <div>
                                    <a href={"javascript"} id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        <img src={usericon} width="40" height="40" className="rounded-circle" alt="" />
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1" style={{ marginLeft: "-120px" }}>

                                        {
                                            patient_userid !== null ? <li className="dropdown-item"> <h6 style={{ cursor: "pointer" }}><Link to="/history" style={{ textDecoration: "none", color: "black" }}>Appoinment History </Link></h6></li> : null}
                                        {
                                            doctor_id !== null ? <div><li className="dropdown-item"> <h6 style={{ cursor: "pointer" }}><Link to="/appoinments" style={{ textDecoration: "none", color: "black" }}>Booking History </Link></h6></li> <li className="dropdown-item"> <h6 style={{ cursor: "pointer" }}><Link to="/slot" style={{ textDecoration: "none", color: "black" }}>Slot Create </Link></h6></li></div> : null}
                                        <li><a className="dropdown-item" href="##" onClick={this.logout} style={{ cursor: "pointer", fontWeight: "bold" }} ><h6>Log Out</h6></a></li>
                                    </ul>
                                </div> : null
                            }

                        </div>
                    </div>
                </nav>
            </React.Fragment>
        )
    }
}
