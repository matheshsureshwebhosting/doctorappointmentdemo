import React, { Component } from 'react'
import { toast, Slide, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import axios from 'axios'
import firebase from "../database/firebase"
var db = firebase.firestore()
export default class Register extends Component {
    constructor(props) {
        super()
        this.state = {
            submitbtnsign: false,
            doctor_name: null,
            doctor_hospital: null,
            doctor_description: null,
            doctor_email: null,
            doctor_mobile: null,
            doctor_address: null,
            doctor_password: null
        }
    }

    handlechange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    submitbtnsign = async () => {
        const { doctor_name, doctor_hospital, doctor_description, doctor_email, doctor_mobile, doctor_address, doctor_password } = this.state

        if (doctor_name == null) {
            toast.info("Doctor Name Is Required...", {
                autoClose: 30000,
                transition: Slide
            })
        } else if (doctor_email == null) {
            toast.info("Doctor Email is Required...", {
                autoClose: 30000,
                transition: Slide
            })

        }
        else if (doctor_mobile == null) {
            toast.info("Doctor number is Required...", {
                autoClose: 30000,
                transition: Slide
            })
        }
        else if (doctor_hospital == null) {
            toast.info("Doctor Hospital Name is Required...", {
                autoClose: 30000,
                transition: Slide
            })
        }
        else if (doctor_description == null) {
            toast.info("Doctor Description is Required...", {
                autoClose: 30000,
                transition: Slide
            })
        }
        else if (doctor_address == null) {
            toast.info("Doctor Address is Required...", {
                autoClose: 30000,
                transition: Slide
            })
        } else if (doctor_password == null) {

            toast.info("Password is Required...", {
                autoClose: 30000,
                transition: Slide
            })
        }
        else {
            toast.info("Please Wait...", {
                autoClose: 30000,
                transition: Slide
            })
            console.log(doctor_password);
            const today = new Date();
            const monthsandday = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40",
                "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60"]
            const date = today.getFullYear() + '-' + (monthsandday[today.getMonth() + 1]) + '-' + (monthsandday[today.getDate()]);
            const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            const dateTime = date + ' ' + time;
            await axios.post(`${process.env.REACT_APP_SERVER}/doctor/add`, {
                password: doctor_password,
            }).then(res => {
                console.log(res.data)
                if (res.data.status !== false) {
                    firebase.auth().createUserWithEmailAndPassword(doctor_email, res.data.msg)
                        .then((userCredential) => {
                            // Signed in                             
                            db.collection("doctors").doc(userCredential.user.uid).set({
                                doctor_name: doctor_name,
                                doctor_email: doctor_email,
                                doctor_mobile: doctor_mobile,
                                password: res.data.msg,
                                doctor_hospital: doctor_hospital,
                                doctor_address: doctor_address,
                                date: dateTime,
                                doctor_description:doctor_description,
                                doctor_id: userCredential.user.uid,
                            }).then(() => {
                                toast.success("Suceessfully Created", {
                                    autoClose: 30000,
                                    transition: Slide
                                })
                                localStorage.setItem("doctor_id", userCredential.user.uid)
                                window.location.replace("/home")
                            })
                            // ...
                        })
                        .catch((error) => {
                            var errorMessage = error.message;
                            // ..
                            toast.error(errorMessage, {
                                autoClose: 30000,
                                transition: Slide
                            })
                        });
                }

            }).catch(error => {
                console.log(error);
                if (error) {
                    toast.info("Something Wrong Try Agin Later", {
                        autoClose: 30000,
                        transition: Slide
                    })
                    // window.location.reload()
                }
            })

        }

    }

    render() {
        const { submitbtnsign } = this.state
        return (
            <div>
                <div className="card" id="regcard">
                    <h2 className="title mb-5"> Doctor Registation</h2>
                    {/* <p className="subtitle">Already have an account? <a href={"javascript"}> sign In</a></p> */}
                    <div className="email-login">
                        <label htmlFor="email"> <b>Doctor Name</b></label>
                        <input type="text" placeholder="Enter Doctor Name" onChange={(e) => this.handlechange(e)} name="doctor_name" required />

                        <label htmlFor="email"> <b>Doctor Email</b></label>
                        <input type="text" placeholder="Enter Doctor Email" onChange={(e) => this.handlechange(e)} name="doctor_email" required />

                        <label htmlFor="email"> <b>Doctor Phone Number</b></label>
                        <input type="number" placeholder="Enter Doctor Phone Number" onChange={(e) => this.handlechange(e)} name="doctor_mobile" required />

                        <label htmlFor="email"> <b>Hospital Name</b></label>
                        <input type="text" placeholder="Enter Hospital Name" name="doctor_hospital" onChange={(e) => this.handlechange(e)} required />

                        <label htmlFor="email"> <b>Doctor's Description</b></label>
                        <textarea type="text" placeholder="Enter Doctor's Description" maxLength="100" name="doctor_description" onChange={(e) => this.handlechange(e)} required />

                        <label htmlFor="email"> <b>Hospital Address</b></label>
                        <input type="text" placeholder="Enter Hospital Address"   name="doctor_address" onChange={(e) => this.handlechange(e)} required />

                        <label htmlFor="psw"><b>Password</b></label>
                        <input type="text" placeholder="Enter Password" name="doctor_password" onChange={(e) => this.handlechange(e)} required />

                    </div>
                    {

                        !submitbtnsign ? <button className="btn btn-primary" onClick={this.submitbtnsign}>Register</button> : <button className="btn btn-primary" type="button" disabled>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>  Please Wait...
</button>
                    }
                    {/* <a className="forget-pass" href={"javascript"}>Forgot password?</a> */}
                    <p className="subtitle">Already have an account? <a href={"/drlogin"}> sign In</a></p>
                    <p className="subtitle"><a href={"/signup"}>  Become A User</a></p>
                </div>
                <ToastContainer />
            </div>
        )
    }
}
