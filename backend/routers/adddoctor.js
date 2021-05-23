const router = require("express").Router();
const firebase = require("../database/firebase")
const db = firebase.firestore()
const hash = require("../helper/bcrypt")    
const UUID = require("../helper/uuid")

router.post("/add", async (req, res) => {

    const {password} = req.body    
    console.log(password)
    try {
        const hashPwd = await hash.hashGenerator(password)
        console.log(hashPwd)
        return res.send({status:true,msg:hashPwd})
    } catch (error) {
        return res.send(error)

    }
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body    
    const accoutCheck = await accoutchecked(email, password)   
    console.log(accoutCheck) 
    if (accoutCheck.length === 1) {
        const hashverify = await hash.hashVerify(password, accoutCheck[0].password)
        if (hashverify === true) {
            return res.send({status:true,msg:accoutCheck[0].password})            
        }
        else {
            return res.send(hashverify)
        }
    } else {
        return res.send(false)
    }
})

accoutchecked = async (email, password) => {    
    const accoutcheck = new Promise(async (resolve, reject) => {
        await db.collection("doctors").where("doctor_email", "==", email).get().then((snap) => {
            var data = []
            snap.forEach(async (doc) => {
                data.push(doc.data())
            })
            return resolve(data)
        })
    })
    return await accoutcheck
}


router.get("/viewall", async (req, res) => {
    try {
        db.collection("doctors").get().then((snap) => {
            const data = []
            snap.forEach((doc) => {
                data.push(doc.data())
            })
            return res.send(data)
        }).catch((error) => { throw error })
    } catch (error) {
        return res.status(error.status).send(error.message)
    }
})
module.exports = router