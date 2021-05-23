import React, { Component } from 'react'
import axios from 'axios'
import { toast, Slide, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
export default class Slot extends Component {

    constructor(props) {
        super()
        this.state = {
            startingTime: null,
            endingTime: null,
            date: null,
            duration: 30,
            doctor_id: localStorage.getItem("doctor_id"),
            submitbtn:false
        }
    }
    handlechange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    submitbtn = () => {
        toast.info("Please Wait...", {
            autoClose: 30000,
            transition: Slide
        })
        const { startingTime, endingTime, date, duration, doctor_id } = this.state

        axios.post(`${process.env.REACT_APP_SERVER}/slot/create`, {
            startingTime: startingTime,
            endingTime: endingTime,
            date: date,
            duration: duration
        }, {
            headers: {
                doctor_id: doctor_id
            }
        }).then(res => {
            if (res.data) {
                console.log(res.data);
                toast.success("Suceessfully Created...", {
                    autoClose: 30000,
                    transition: Slide
                })
                setTimeout(() => { window.location.replace("/home") }, 3000)
            }
        })



    }
    render() {
        const { submitbtn } = this.state
        return (
            <div>
                <div className="card">
                    <h2 className="title mb-3"> Slot Create</h2>
                    <div className="email-login">

                        <label htmlFor="date"> <b>Date</b></label>
                        <input type="date" placeholder="Enter Date" onChange={(e) => this.handlechange(e)} name="date" required />

                        <label htmlFor="stime"> <b>Starting Time</b></label>
                        <input type="time" placeholder="Enter Starting Time" onChange={(e) => this.handlechange(e)} name="startingTime" required />

                        <label htmlFor="etime"><b>Ending Time</b></label>
                        <input type="time" placeholder="Enter Ending Time" onChange={(e) => this.handlechange(e)} name="endingTime" required />

                        <label htmlFor="duration"> <b>Duration</b></label>
                        <input type="number" placeholder="Enter Duration" defaultValue="30" onChange={(e) => this.handlechange(e)} name="duration" disabled required />
                    </div>
                    {

                        !submitbtn ? <button className="btn btn-primary" onClick={this.submitbtn}>Submit</button> : <button className="btn btn-primary" type="button" disabled>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>  Please Wait...
</button>
                    }

                </div>
                <ToastContainer />
            </div>
        )
    }
}
