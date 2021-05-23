import React, { Component } from 'react'
import "../assets/css/history.css"
import axios from 'axios'
export default class History extends Component {

    constructor(props) {
        super()
        this.state = {
            bookingdata: [],
            patient_userid: localStorage.getItem("patient_userid"),
        }
        const { patient_userid } = this.state
        if (patient_userid == null) {
            window.location.replace("/")
        }
    }

    componentDidMount = () => {
        const { patient_userid } = this.state
        axios.get(`${process.env.REACT_APP_SERVER}/appoinment/view`, {
            headers: {
                patient_userid: patient_userid
            }
        }).then((res) => {
            if (res.data) {
                this.setState({
                    bookingdata: res.data
                })
            }
        })

    }
    render() {
        const { bookingdata } = this.state
        return (
            <div className="container">
                <div className="row">
                    {
                        bookingdata.length !== 0 ? bookingdata.map((data, index) => (
                            <div className="col-md-3" key={index}>
                                <div className="historycard">
                                    <div className="card-header">
                                        <span>{data.slot_date}</span>
                                        <span style={{ float: "right" }}>{data.slot_time}</span>
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title">{data.doctor_name}</h5>
                                        <p className="card-text">{data.doctor_address}</p>
                                    </div>
                                </div>
                            </div>
                        )) : null

                    }

                </div>
            </div>
        )
    }
}
