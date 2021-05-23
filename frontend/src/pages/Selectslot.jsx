import axios from 'axios'
import React, { Component } from 'react'
import { toast, Slide, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
export default class Selectslot extends Component {
    constructor(props) {
        super()
        this.state = {
            appoinmentdata: null,
            slotdata: [],
            selecteddateid: null,
            selectedslot: null
        }
    }
    componentDidMount = () => {
        const { selecteddate, doctordata } = this.props.location.state
        axios.post(`${process.env.REACT_APP_SERVER}/slot/view`, {
            date: selecteddate
        }, {
            headers: {
                doctor_id: doctordata.doctor_id
            }
        }).then((res) => {
            this.setState({
                slotdata: res.data
            })
        })
        this.setState({
            appoinmentdata: this.props.location.state
        })
    }
    getdate = (e) => {
        this.setState({
            selecteddateid: Number(e.target.id),
            selectedslot: e.target.value
        })
    }
    sendbtn = () => {
        const { appoinmentdata, selectedslot } = this.state
        const { pname, page, selecteddate, doctordata, patient_userid } = appoinmentdata
        console.log(pname, page, selecteddate, doctordata.doctor_hospital, doctordata.doctor_name, doctordata.doctor_mobile, selectedslot, doctordata.doctor_id, patient_userid)
        axios.post(`${process.env.REACT_APP_SERVER}/appoinment/`, {
            date: selecteddate,
            slot: selectedslot.split("/")[0],
            slot_time: selectedslot.split("/")[1],
            pname: pname,
            page: page
        }, {
            headers: {
                doctor_id: doctordata.doctor_id,
                patient_userid: patient_userid
            }
        }).then((res) => {
            toast.info(res.data.msg, {
                autoClose: 3000,
                transition: Slide
            })
            if (res.data.status !== false) {             
                setTimeout(() => { window.location.replace("/history") }, 3000)
            }else{
                setTimeout(() => { window.location.reload("/") }, 3000)
            }
        })
    }
    render() {
        const { slotdata, selecteddateid } = this.state
        return (
            <div>
                <div className="card" id="regcard">
                    <h2 className="title mb-5"> Appoinment Booking</h2>
                    <div className="email-login">


                        <label htmlFor="email"> <b>Select Slot</b></label>
                        <div className="inline">
                            {
                                slotdata.length !== 0 ? slotdata.map((slots, index) => (slots.status ?
                                    <label className={`radio-inline btn ${slots.status === "Booked" ? "btn-danger" : `${selecteddateid === index ? "btn-success" : "btn-info"}`}  `} htmlFor={index} key={index} >
                                        <input className="radio" type="radio" name="optradio" id={index} value={`${slots.slot_name}/${slots.slot_time}`} onChange={(e) => this.getdate(e)} disabled={slots.status === "Booked" ? true : false} />{slots.slot_time}
                                    </label> : null
                                )) : <div>Please Wait</div>
                            }
                        </div>


                    </div>
                    {
                        selecteddateid !== null ? <div>
                            <button className="btn btn-primary" onClick={this.sendbtn} >Submit</button>
                        </div> : null
                    }

                </div>
                <ToastContainer />
            </div>
        )
    }
}
