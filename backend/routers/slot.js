const createHttpError = require("http-errors")
const router = require("express").Router()
const firebase = require('../database/firebase');
var db = firebase.firestore()
const Slot = require('../models/slot');

router.post("/create", async (req, res) => {
    const { doctor_id } = req.headers
    try {
        if (!doctor_id) throw createHttpError(401, "Doctor Id Required")
        const createsolts = await Slot.createSlot(req.body)
        if (createsolts.length == 0) throw createHttpError(401, "Slot Can't Get, Please Try Again")
        const saveslots = await Slot.saveSlots(doctor_id, req.body)
        if (saveslots == false) throw createHttpError(401, "Slot Can't Update, Please Try Again")
        const slotlists = await Slot.slotLists(doctor_id, createsolts, req.body)
        if (slotlists.length != createsolts.length) throw createHttpError(401, "Something Went Wrong, Please Try Again")
        return res.send("Successfuly Created")
    } catch (error) {
        return res.status(error.status).send(error.message)
    }
})
router.post("/view", async (req, res) => {
    const { doctor_id } = req.headers
    const { date } = req.body
    try {
        if (!doctor_id) throw createHttpError(401, "Doctor Id Required")
        await db.collection("doctors").doc(doctor_id).collection(date)
        .orderBy("slot_time", "asc").get().then((snap) => {
            const data = []
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

router.post("/view/singleslot", async (req, res) => {
    const { doctor_id } = req.headers
    const { date, slot } = req.body
    try {
        if (!doctor_id) throw createHttpError(401, "Doctor Id Required")
        await db.collection("doctors").doc(doctor_id).collection(date).doc(slot).get().then((doc) => {
            if (doc.data() != undefined) {
                return res.send(doc.data())
            }
        })
    } catch (error) {
        return res.status(error.status).send(error.message)
    }
})
router.post("/view/singleslot/update", async (req, res) => {
    const { doctor_id } = req.headers
    console.log(req.body)
    try {
        if (!doctor_id) throw createHttpError(401, "Doctor Id Required")
        const slotupdate = await Slot.slotUpdate(doctor_id, req.body)
        return res.send(slotupdate)

    } catch (error) {
        return res.status(error.status).send(error.message)
    }
})


module.exports = router