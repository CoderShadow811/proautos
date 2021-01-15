import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAJS3ScNnl3kU2Ir3_eBZqXSDQ3F3lq7HY",
    authDomain: "crm-ennoble.firebaseapp.com",
    databaseURL: "https://crm-ennoble.firebaseio.com",
    projectId: "crm-ennoble",
    storageBucket: "crm-ennoble.appspot.com",
    messagingSenderId: "4577969880",
    appId: "1:4577969880:web:287d7be7912e22c36bb9ad"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

firebaseApp.firestore()

export default firebaseApp.firestore()