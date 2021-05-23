const express=require("express")
const morgan=require("morgan")
const dotenv=require("dotenv").config()
const cors=require("cors")
const port=4000 || process.env.PORT
var app=express()


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan("dev"))
app.use(cors({
    origin:"http://localhost:3000"
}))
app.get("/",(req,res)=>{
    res.send("okay")
})

app.use("/slot",require('./routers/slot'))
app.use("/doctor", require("./routers/adddoctor"))
app.use("/editdoctor", require("./routers/editdoctor"))
app.use("/user", require("./routers/patientlogin"))
app.use("/appoinment", require("./routers/appoinmentfix"))

app.listen(port,()=>{console.log(`App Running On http://localhost:${port}`)})