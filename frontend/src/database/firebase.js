import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyCTsD0FZCNyb8yFlJGNGJYXE8Wl1r9CD3M',
  authDomain: 'doctors-appointment-book-257a1.firebaseapp.com',
  databaseURL: process.env.REACT_APP_DATABASEURL,
  projectId: 'doctors-appointment-book-257a1',
  storageBucket: 'doctors-appointment-book-257a1.appspot.com',
  messagingSenderId: '171553867087',
  appId: '320934731445:1:171553867087:web:a98d05c1205e91753d313a',
}

firebase.initializeApp(firebaseConfig)

export default firebase
