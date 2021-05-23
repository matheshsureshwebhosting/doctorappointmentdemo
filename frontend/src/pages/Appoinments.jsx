import React, { Component } from 'react'
import "../assets/css/table.css"
import axios from 'axios'
export default class Appoinments extends Component {

    constructor(props) {
        super()
        this.state = {
            userdata: [],
            doctor_id: localStorage.getItem("doctor_id"),
        }
        const { doctor_id } = this.state
        if (doctor_id == null) {
            window.location.replace("/")
        }
    }

    componentDidMount = () => {
        const { doctor_id } = this.state
        axios.get(`${process.env.REACT_APP_SERVER}/appoinment/bookingdata`, {
            headers: {
                doctor_id: doctor_id
            }
        }).then((res) => {
            if (res.data) {
                this.setState({
                    userdata: res.data
                })
            }
        })

    }
    render() {
        const { userdata } = this.state        
        return (
            <div>
                <div className="container mt-5" style={{ overflowX: "auto" }}>
                    <table className="table table-bordered table-responsive tbl-header">
                        <thead id="tablebody">
                            <tr className="text-center">
                                <th>S. No</th>
                                <th>Patient Name</th>
                                <th>Age</th>                                
                                <th>Date</th>
                                <th>Time</th>

                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {
                                userdata.length !== 0 ? userdata.map((data, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{data.pname}</td>
                                        <td>{data.page}</td>                                        
                                        <td>{data.slot_date}</td>
                                        <td>{data.slot_time}</td>
                                    </tr>
                                )) : null}

                        </tbody>
                    </table>
                    {/* {
                        productreg.length === 0 ? <div style={{ textAlign: "center" }}>No Data Found</div> : userdata.length === 0 ? <div style={{ textAlign: "center" }}>Please wait..</div> : null
                    } */}
                </div>
            </div>
        )
    }
}
