# Api Docuemntation

## Doctors

post: `http://localhost:4000/doctor/add`
header: nil
body

```js
{
    "doctor_hospital": "ABC Hospital",
    "doctor_description": "Eye Care",
    "doctor_email": "jhon@gmail.com",
    "doctor_mobile": "917845869542",
    "doctor_address": "123,abc,xyz-61"
}
```

GET: `http://localhost:4000/doctor/viewall`
GET: `http://localhost:4000/editdoctor/view`
header: `doctor_id 77c5f75a-76e5-47d0-bdf3-78da4ee9f38c`

## Slot

Post: `http://localhost:4000/slot/create`
header: nil
doction_id: `77c5f75a-76e5-47d0-bdf3-78da4ee9f38c`
body

```js
{
	"date":"2021-05-16",
	"startingTime":"10:00",
	"endingTime":"15:00",
	"duration":"30"
}
```

Post: `http://localhost:4000/slot/view`
header: nil
doction_id: `77c5f75a-76e5-47d0-bdf3-78da4ee9f38c`
body

```js
"date":"2021-05-16",
```

## Patient

post: `http://localhost:4000/user/siginup`,
header: 'nil'
body:

```js
{
    "pname": "Max",
    "pemail": "max@gmail.com",
    "pnumber": "042256587",
    "password": "max@gmail.com",
    "pdob": "1978-05-15",
    "page":"48"
}
```

## Appointment

post: `http://localhost:4000/appoinment`
header: nil
doctor_id: `77c5f75a-76e5-47d0-bdf3-78da4ee9f38c`
puserid: `fd5a82ac-a14d-4b82-85f9-a356206dbf6d`

body

```js
    "slot":"slot_2",
	"date":"2021-05-16"
```

# Heroku Deployment Steps

The folder structure was changed, pre deploment as it was not feasible.
Changed structure

Root

- Contains package.json for backend, npm start should be initaited in root, not in backend
- .env file is to be moved to root. It from here variables can be accessed both fortend and backend
- added node eviroment varable, to tract if App is in developemnt or production etc,.

Backend

- Contains all api, backend files

Frontend

- Contains all UI, Front end files, with its own package.json

Step1: Create a static patch to index.html after deployment

```js
const path = require('path')

const __directory = path.resolve()

app.use(express.static(path.join(__directory, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__directory, 'frontend', 'build', 'index.html'))
```

Step2: Add post build script for freont end

```js
"heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix frontend && npm run build --prefix frontend"
```

Step3: Heroku Login and Heroku Create 'app-name' **name has to be unique**

Step4: Add heroku Procfile in root folder and add `web: node backend/app.js`

Step5: Add heroku remote git to the app `heroku git:clone -a doctor-appointment-book`

Step6: git push heroku master

Step7: Add Config Vars in Hero dashboard Setting, add the .env values

After Changes, just run, `git push heroku master`
