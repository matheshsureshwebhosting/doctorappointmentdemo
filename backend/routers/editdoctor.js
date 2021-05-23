const router = require("express").Router();
const firebase = require("../database/firebase")
const db = firebase.firestore()
const UUID = require("../helper/uuid")


router.get("/view", async (req, res) => {
    const { doctor_id } = req.headers
    try {
        if (!doctor_id) throw ("Doctor ID Must")        
        db.collection("doctors").doc(doctor_id).get().then((doc) => {
            if (doc.data() == undefined) return res.send("Doctor Not Founded")
            return res.send(doc.data())
        }).catch((error) => { throw error })
    } catch (error) {
        return res.send(error)
    }
})


router.post("/edit", async (req, res) => {
    const { doctor_id } = req.headers
    try {
        if (!doctor_id) throw ("Doctor ID Must")       
        db.collection("doctors").doc(doctor_id).update(req.body).then(() => { return res.send("Details Updated") })
    } catch (error) {
        return res.send(error)
    }
})

module.exports = router