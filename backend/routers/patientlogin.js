const router = require("express").Router();
const firebase = require("../database/firebase")
const db = firebase.firestore()
const hash = require("../helper/bcrypt")
const UUID = require("../helper/uuid")

router.post("/siginup", async (req, res) => {
    const {password} = req.body    
    try {
        const hashPwd = await hash.hashGenerator(password)
        return res.send({status:true,msg:hashPwd})
    } catch (error) {
        return res.send(error)

    }
})


router.post("/login", async (req, res) => {
    const { email, password } = req.body
    const accoutCheck = await accoutcheck(email, password)    
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

accoutcheck = async (email, password) => {
    const accoutcheck = new Promise(async (resolve, reject) => {
        await db.collection("patient").where("pemail", "==", email).get().then((snap) => {
            var data = []
            snap.forEach(async (doc) => {
                data.push(doc.data())
            })
            return resolve(data)
        })
    })
    return await accoutcheck
}


module.exports = router