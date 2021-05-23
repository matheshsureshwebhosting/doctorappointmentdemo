import React, { Component } from 'react'
import "../assets/css/signup.css"
import axios from 'axios'
import { toast, Slide, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import firebase from "../database/firebase"
var db = firebase.firestore()
export default class Signup extends Component {

    constructor(props) {
        super()
        this.state = {
            submitbtnsign: false,
            name: null,
            email: null,
            number: null,
            dob: null,
            age: null,
            password: null,
        }
        // const { userid } = this.state
        // if (userid != null) {
        //     window.location.replace("/home")
        // }
    }
    handlechange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    submitbtnsign = () => {
        const { password, email, name, number, dob, age } = this.state

        if (name == null) {
            toast.info("Email Is Required...", {
                autoClose: 30000,
                transition: Slide
            })
        } else if (email == null) {
            toast.info("Email is Required...", {
                autoClose: 30000,
                transition: Slide
            })

        }
        else if (number == null) {
            toast.info("number is Required...", {
                autoClose: 30000,
                transition: Slide
            })
        }
        else if (dob == null) {
            toast.info("Date Of Birth is Required...", {
                autoClose: 30000,
                transition: Slide
            })
        }
        else if (age == null) {
            toast.info("Age is Required...", {
                autoClose: 30000,
                transition: Slide
            })
        } else if (password == null) {

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
            console.log(password, email, name, number, dob, age);
            const today = new Date();
            const monthsandday = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40",
                "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60"]
            const date = today.getFullYear() + '-' + (monthsandday[today.getMonth() + 1]) + '-' + (monthsandday[today.getDate()]);
            const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            const dateTime = date + ' ' + time;
            axios.post(`${process.env.REACT_APP_SERVER}/user/siginup`, {
                password: password,
            }).then(res => {
                console.log(res.data)
                if (res.data.status !== false) {
                    firebase.auth().createUserWithEmailAndPassword(email, res.data.msg)
                        .then((userCredential) => {
                            // Signed in                             
                            db.collection("patient").doc(userCredential.user.uid).set({
                                pname: name,
                                pemail: email,
                                pnumber: number,
                                password: res.data.msg,
                                pdob: dob,
                                page: age,
                                date: dateTime,
                                puserid: userCredential.user.uid,
                            }).then(() => {
                                toast.success("Suceessfully Created...", {
                                    autoClose: 30000,
                                    transition: Slide
                                })
                                localStorage.setItem("patient_userid", userCredential.user.uid)
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
                    window.location.reload()
                }
            })

        }

    }
    render() {
        const { submitbtnsign } = this.state
        return (
            <div>
                <div className="card">
                    <h2 className="title"> Register</h2>
                    {/* <p className="subtitle">Already have an account? <a href={"javascript"}> sign In</a></p> */}
                    <div className="email-login">
                        <label htmlFor="email"> <b>Name</b></label>
                        <input type="text" placeholder="Enter Name" onChange={(e) => this.handlechange(e)} name="name" required />

                        <label htmlFor="email"> <b>Email</b></label>
                        <input type="email" placeholder="Enter Email" onChange={(e) => this.handlechange(e)} name="email" required />

                        <label htmlFor="email"> <b>Phone Number</b></label>
                        <input type="number" placeholder="Enter Phone Number" onChange={(e) => this.handlechange(e)} name="number" required />

                        <label htmlFor="email"> <b>Date Of Birth</b></label>
                        <input type="date" placeholder="Enter Date Of Birth" onChange={(e) => this.handlechange(e)} name="dob" required />

                        <label htmlFor="email"> <b>Age</b></label>
                        <input type="number" placeholder="Enter Age" onChange={(e) => this.handlechange(e)} name="age" required />

                        <label htmlFor="psw"><b>Password</b></label>
                        <input type="password" placeholder="Enter Password" onChange={(e) => this.handlechange(e)} name="password" required />

                    </div>
                    {

                        !submitbtnsign ? <button className="btn btn-primary" onClick={this.submitbtnsign}>Sign Up</button> : <button className="btn btn-primary" type="button" disabled>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>  Please Wait...
</button>
                    }
                    {/* <a class="forget-pass" href={"javascript"}>Forgot password?</a> */}
                    <p className="subtitle mt-3">Already have an account? <a href={"/"}> sign In</a></p>
                    <p className="subtitle"><a href={"/register"}>  Become A Doctor</a></p>
                </div>
                <ToastContainer />
            </div>
        )
    }
}
