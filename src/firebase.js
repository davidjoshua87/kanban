import * as firebase from 'firebase'
const app = firebase.initializeApp({
  apiKey: 'AIzaSyCpgmL-qRq9KWZJ4RI7mthGA1qfg_GNk20',
  authDomain: 'kanban-57031.firebaseapp.com',
  databaseURL: 'https://kanban-57031.firebaseio.com',
  projectId: 'kanban-57031',
  storageBucket: 'kanban-57031.appspot.com',
  messagingSenderId: '158717100983'
})

const db = app.database()
export const todosRef = db.ref('todos')
