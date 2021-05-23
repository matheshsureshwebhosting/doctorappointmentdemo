import React, { Component } from 'react'
import "../assets/css/home.css"
import axios from 'axios'
import { Link } from 'react-router-dom'
import doctor from "../assets/images/usman-yousaf-pTrhfmj2jDA-unsplash.jpg"
export default class Home extends Component {

    constructor(props) {
        super()
        this.state = {
            doctordata: [],
            patient_userid: localStorage.getItem("patient_userid"),
            doctor_id: localStorage.getItem("doctor_id")
        }    
    }

    componentDidMount = async () => {        
        axios.get(`${process.env.REACT_APP_SERVER}/doctor/viewall`).then(async res => {            
            this.setState({
                doctordata: res.data,
            })

        })

    }
    render() {
        const { doctordata } = this.state        
        return (
            <div className="container">
                <div className="row">
                    {
                        doctordata.length !== 0 ? doctordata.map((data, index) => (
                            <div className="col-md-6" key={index}>
                                <div className="homecard mb-3" style={{ maxWidth: "540px" }}>
                                    <div className="row g-0">
                                        <div className="col-md-5">
                                            <img src={doctor} className="card-img-top" alt="doctor" style={{ height: "28vh" }} />
                                        </div>
                                        <div className="col-md-7">
                                            <div className="card-body">
                                                <h5 className="card-title">{data.doctor_name}</h5>
                                                <p>{data.doctor_mobile}</p>
                                                <p className="card-text blogshort">{data.doctor_description}</p>
                                                <p>{data.doctor_address}</p>
                                                <button className="btn btn-primary"><Link to={`book/${data.doctor_id}`} style={{ textDecoration: "none", color: "white" }}>Book Now</Link></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )) : <div style={{textAlign:"center",fontWeight:"bold"}}>Please Wait...</div>

                    }                   
                </div>
            </div>
        )
    }
}
