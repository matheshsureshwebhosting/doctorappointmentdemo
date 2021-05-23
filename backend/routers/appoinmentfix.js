const router = require("express").Router();
const firebase = require("../database/firebase")
const db = firebase.firestore()
const UUID = require("../helper/uuid")

router.post("/", async (req, res) => {
    const { doctor_id, patient_userid } = req.headers
    const { slot, date, pname, page, slot_time } = req.body
    const today = new Date();
    const monthsandday = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40",
        "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60"]
    const day = today.getFullYear() + '-' + (monthsandday[today.getMonth() + 1]) + '-' + (monthsandday[today.getDate()]);
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = day + ' ' + time;
    const apoid = await UUID.randomId()
    try {
        db.collection("doctors").doc(doctor_id).get().then((doc) => {
            db.collection("patient").doc(patient_userid).collection("myappoinments").doc(apoid).set({
                doctor_id: doctor_id,
                patient_userid: patient_userid,
                date: dateTime,
                slot: slot,
                slot_time: slot_time,
                slot_date: date,
                doctor_address: doc.data().doctor_address,
                doctor_name: doc.data().doctor_name,
                appoinment_id: apoid
            }).then(() => {
                db.collection("doctors").doc(doctor_id).collection(date).doc(slot).update({
                    patient_userid: patient_userid,
                    status: "Booked",
                }).then(() => {
                    db.collection("doctors").doc(doctor_id).collection("appoinments").doc().set({
                        pname: pname,
                        page: page,
                        slot: slot,
                        slot_time: slot_time,
                        slot_date: date,
                        date: dateTime
                    }).then(() => {
                        return res.send({ status: true, msg: "Appoinment Fixed.." })
                    })
                }).catch(() => {
                    return res.send({ status: false, msg: "Appoinment Not Fixed.." })
                })

            })
        })
            .catch(() => {
                return res.send({ status: false, msg: "Appoinment Not Fixed.." })
            })
    } catch (error) {
        return res.status(error.status).send(error.message)
    }
})

router.get("/view", (req, res) => {
    const { patient_userid } = req.headers
    try {
        db.collection("patient").doc(patient_userid).collection("myappoinments").get().then((snap) => {
            var data = []
            snap.forEach((doc) => {
                if (doc.data() != undefined) {
                    data.push(doc.data())
                }
            })
            return res.send(data)
        })
    } catch (error) {
        return res.status(error.status).send(error.message)
    }
})

router.get("/bookingdata", (req, res) => {
    const { doctor_id } = req.headers
    try {
        db.collection("doctors").doc(doctor_id).collection("appoinments").get().then((snap) => {
            var data = []
            snap.forEach((doc) => {
                if (doc.data() != undefined) {
                    data.push(doc.data())
                }
            })
            return res.send(data)
        })
    } catch (error) {
        return res.status(error.status).send(error.message)
    }
})



router.get("/single", (req, res) => {
    const { puserid, appoinment_id } = req.headers
    try {
        db.collection("patient").doc(puserid).collection("myappoinments").doc(appoinment_id).get().then((doc) => {
            if (doc.data() != undefined) {
                return res.send(doc.data())
            }
        })
    } catch (error) {
        return res.status(error.status).send(error.message)
    }
})

module.exports = router