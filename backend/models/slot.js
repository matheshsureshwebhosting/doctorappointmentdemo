const firebase = require('../database/firebase');
const db = firebase.firestore()
module.exports.createSlot = async (slot) => {
    const { startingTime, endingTime, duration } = slot
    const createSlot = new Promise(async (resolve, rejeject) => {
        var starttime = `${startingTime}:00`;
        var endtime = `${endingTime}:00`;
        var interval = `${duration}`;
        var startTimeInMin = convertToMin(starttime);
        var endTimeInMin = convertToMin(endtime);

        timeIntervel = parseInt(endTimeInMin - startTimeInMin) / (parseInt(interval) * 60);

        nextSlot = starttime;

        slotArra = [nextSlot];
        for (i = 0; i < timeIntervel; i++) {
            var nextSlot = getNextSlot(nextSlot, interval);
            slotArra.push(nextSlot);
        }
        return resolve(slotArra)


    })

    return await createSlot
}
module.exports.saveSlots = async (doctor_ID, slotinfos) => {
    const saveSlots = new Promise(async (resolve, reject) => {
        const slotinfo = await slotInfo(doctor_ID, slotinfos)
        return resolve(slotinfo)
    })
    return await saveSlots
}
module.exports.slotLists = async (doctor_Id, slots, slotinfos) => {
    const slotLists = new Promise(async (resolve, reject) => {
        const newslotlists = await newSlotLists(doctor_Id, slots, slotinfos)
        return resolve(newslotlists)
    })
    return await slotLists
}

module.exports.slotUpdate = async (doctor_id, slotInfo) => {
    const slotUpdate = new Promise(async (resolve, reject) => {
        const { date, status, slot } = slotInfo
        await db.collection("doctors").doc(doctor_id).collection(date).doc(slot).update({
            status: status,
        }).then(() => {
            return resolve("Updated")
        }).catch(() => {
            return resolve("Not Updated")
        })
    })
    return await slotUpdate
}

newSlotLists = async (doctor_ID, Slots, slotInfos) => {
    const newSlotLists = new Promise(async (resolve, reject) => {
        const { date } = slotInfos
        const uploadSlots = []
        for (var i = 0; i < Slots.length; i++) {
            await db.collection("doctors").doc(doctor_ID).collection(date).doc(`slot_${i + 1}`).set({
                slot_time: Slots[i],
                status: "Avaliable",
                doctor_id: doctor_ID,
                slot_name: `slot_${i + 1}`
            }).then(() => {
                uploadSlots.push(`slot_${i + 1}`)
            })
        }
        return resolve(uploadSlots)
    })
    return await newSlotLists
}
slotInfo = async (doctor_Id, Slotinfos) => {
    const slotInfo = new Promise(async (resolve, reject) => {
        const { date, startingTime, endingTime, duration } = Slotinfos
        const dates = new Date()
        const monthsandday = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40",
            "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60"]
        const day = dates.getFullYear() + "-" + (monthsandday[dates.getMonth() + 1]) + "-" + dates.getDate()
        var time = (monthsandday[dates.getHours()]) + ":" + dates.getMinutes() + ":" + dates.getSeconds();
        const today = day + " " + time
        const doctors = await db.collection("doctors").doc(doctor_Id)
        await doctors.collection(date).doc("slot_info").set({
            date: today,
            startingTime: startingTime,
            endingTime: endingTime,
            duration: duration,
            doctor_Id: doctor_Id
        }).then(() => {
            doctors.update({
                slotdates: firebase.firestore.FieldValue.arrayUnion(date)
            }).then(() => {
                return resolve(true)
            }).catch((error) => {
                if (error) {
                    return resolve(false)
                }
            })

        }).catch((error) => {
            if (error) {
                return resolve(false)
            }
        })
    })

    return await slotInfo
}
convertToMin = (inputTime) => {
    inputTime = inputTime.split(':');
    var hrinseconds = parseInt(inputTime[0]) * 3600;
    var mininseconds = parseInt(inputTime[1]) * 60;
    return parseInt(hrinseconds) + parseInt(mininseconds) + parseInt(inputTime[2])
}

getNextSlot = (starttime, interval) => {
    var piece = starttime.split(':');
    var hour = piece[0];
    var minutes = piece[1];
    var seconds = piece[2];
    var newMinute = parseInt(minutes) + parseInt(interval)
    if (newMinute >= 60) {
        hour = parseInt(hour) + 1;
        newMinute = newMinute % 60
        if (newMinute == 0)
            newMinute = '00';
    }
    var newTim = hour + ':' + newMinute + ':' + seconds;
    return newTim;
}
