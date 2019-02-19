import firebase from 'firebase'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDMs1U3atkfEn93a3Qj_H8eOnEMtWcx4go',
  authDomain: 'pcology-c9c4f.firebaseapp.com',
  databaseURL: 'https://pcology-c9c4f.firebaseio.com',
  projectId: 'pcology-c9c4f',
  storageBucket: 'pcology-c9c4f.appspot.com',
  messagingSenderId: '791731404961'
}

firebase.initializeApp(firebaseConfig)
const firestore = firebase.firestore()
const settings = {
  //timestampsInSnapshots: true
}
firestore.settings(settings)
export default firebase
