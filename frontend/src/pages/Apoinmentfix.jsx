import React, { Component } from 'react'
import 'react-tabs/style/react-tabs.css';
import axios from 'axios'
import { Link } from 'react-router-dom';
import "../assets/css/appoinment.css"
import firebase from "../database/firebase"
var db = firebase.firestore()
export default class Apoinmentfix extends Component {

    constructor(props) {
        super()
        this.state = {
            doctordata: [],
            patient_userid: localStorage.getItem("patient_userid"),
            isreg: false,
            doctor_name: null,
            doctor_hospital: null,
            page: null,
            pname: null,
            appoinmentdate: [],
            selecteddateid:null,
            selecteddate:null
        }
    }

    componentDidMount = () => {
        axios.get(`${process.env.REACT_APP_SERVER}/editdoctor/view`, {
            headers: {
                doctor_id:this.props.match.params.doctor_id
            }
        }).then((res) => {
            if (res.data) {
                console.log(res.data);
                this.setState({
                    doctordata: res.data,
                    appoinmentdate: res.data.slotdates
                })
            }
        })

    }
    handlechange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
   
    getdate=(e)=>{
        this.setState({
            selecteddateid:Number(e.target.id),
            selecteddate:e.target.value
        })        
    }
    render() {
        const { doctordata, appoinmentdate,selecteddateid } = this.state
        return (
            <div>
                <div className="card" id="regcard">
                    <h2 className="title mb-5"> Appoinment Booking</h2>
                    {/* <p className="subtitle">Already have an account? <a href={"javascript"}> sign In</a></p> */}
                    <div className="email-login">

                        <label htmlFor="email"> <b>Doctor Name</b></label>
                        <input type="text" placeholder="Enter Doctor Name" defaultValue={doctordata.length !== 0 ? doctordata.doctor_name : ""} onChange={(e) => this.handlechange(e)} name="doctor_name" required disabled />

                        <label htmlFor="email"> <b>Hospital Name</b></label>
                        <input type="text" placeholder="Enter Hospital Name" defaultValue={doctordata.length !== 0 ? doctordata.doctor_hospital : ""} onChange={(e) => this.handlechange(e)} name="doctor_hospital" required disabled />

                        <label htmlFor="email"> <b>Patient Name</b></label>
                        <input type="text" placeholder="Enter Patient Name" name="pname" onChange={(e) => this.handlechange(e)} required />

                        <label htmlFor="email"> <b>Patient Age</b></label>
                        <input type="number" placeholder="Enter Patient Age" name="page" onChange={(e) => this.handlechange(e)} required />

                        <label htmlFor="email"> <b>Select Date</b></label>
                        <div className="inline">
                            {
                                appoinmentdate.length !== 0 ? appoinmentdate.map((dates, date_index) => (
                                    <label className={`radio-inline btn ${selecteddateid === date_index ? "btn-success" :"btn-info" } `} htmlFor={date_index} key={date_index}>
                                        <input className="radio" type="radio" id={date_index} name="optradio" value={dates} onChange={(e)=>this.getdate(e)}  />{dates}
                                    </label>
                                )) : <div>No Dates Avaliable</div>
                            }                         
                        </div>
                    </div>
                    <div>
                        {
                            selecteddateid  !== null ? <button className="btn btn-primary" style={{ float: "right" }}><Link to={{
                                 pathname:"/select",
                                 state:this.state
                            }} style={{ textDecoration: "none", color: "white" }}>Next</Link></button> : null
                        }

                    </div>
                </div>
            </div>
        )
    }
}
