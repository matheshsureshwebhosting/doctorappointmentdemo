const express = require('express')
const path = require('path')
const morgan = require('morgan')
const dotenv = require('dotenv').config()
const cors = require('cors')
const port = process.env.PORT || 4000
var app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(
  cors({
    origin: 'https://doctor-appointment-book.herokuapp.com',
  })
)

app.use('/slot', require('./routers/slot'))
app.use('/doctor', require('./routers/adddoctor'))
app.use('/editdoctor', require('./routers/editdoctor'))
app.use('/user', require('./routers/patientlogin'))
app.use('/appoinment', require('./routers/appoinmentfix'))

app.listen(port, () => {
  console.log(`App Running On http://localhost:${port}`)
})

const __directory = path.resolve()

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__directory, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__directory, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('okay')
  })
}
