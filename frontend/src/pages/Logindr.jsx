import React, { Component } from 'react'
import { toast, Slide, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import firebase from "../database/firebase"
import axios from 'axios'
export default class Logindr extends Component {
    constructor(props) {
        super()
        this.state = {
            email: null,
            password: null
        }
    }
    handlechange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    submitbtn = () => {
        const { password, email } = this.state

        if (email == null) {
            toast.info("Email Is Required...", {
                autoClose: 30000,
                transition: Slide
            })
        } else if (password == null) {
            toast.info("password is Required...", {
                autoClose: 30000,
                transition: Slide
            })
        } else {            
            axios.post(`${process.env.REACT_APP_SERVER}/doctor/login`, {
                email: email,
                password: password,
            }).then((res) => {                
                if (res.data.status !== false) {
                    firebase.auth().signInWithEmailAndPassword(email, res.data.msg)
                        .then((userCredential) => {
                            localStorage.setItem("doctor_id", userCredential.user.uid)
                            toast.success("Successfully Register..", {
                                autoClose: 30000,
                                transition: Slide
                            })
                            window.location.replace("/home")
                        })
                        .catch((error) => {
                            var errorMessage = error.message;
                            toast.info(errorMessage, {
                                autoClose: 30000,
                                transition: Slide
                            })
                        });
                } else {
                    toast.info("Email or Password in-valid", {
                        autoClose: 30000,
                        transition: Slide
                    })
                }
            }).catch((error) => {
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
        return (
            <div>
                <div className="card">
                    <h2 className="title">Doctor Sign In</h2>
                    {/* <p className="subtitle">Already have an account? <a href={"javascript"}> sign In</a></p> */}
                    <div className="email-login">
                       
                        <label htmlFor="email"> <b>Email</b></label>
                        <input type="email" placeholder="Enter Email" onChange={(e) => this.handlechange(e)} name="email" required />

                        <label htmlFor="psw"><b>Password</b></label>
                        <input type="password" placeholder="Enter Password" onChange={(e) => this.handlechange(e)} name="password" required />

                    </div>
                    <button className="cta-btn" onClick={this.submitbtn}>Sign In</button>
                    {/* <a className="forget-pass" href={"javascript"}>Forgot password?</a> */}
                    <p className="subtitle">Don't have an account? <a href={"/register"}> sign Up</a></p>
                    <p className="subtitle"><a href={"/"}>  Become A User</a></p>
                </div>
            </div>
        )
    }
}
