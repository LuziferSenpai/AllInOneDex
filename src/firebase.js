import firebase from "firebase/app"
import "firebase/firestore"

const app = firebase.initializeApp({
    apiKey: "AIzaSyBCE-A9bSgsjdpNRPJzZ2cOQzD1SG9TC0o",
    authDomain: "allinonedex.firebaseapp.com",
    projectId: "allinonedex",
    storageBucket: "allinonedex.appspot.com",
    messagingSenderId: "284226349736",
    appId: "1:284226349736:web:af0ec551328976ecc6b09d"
})

const firestore = app.firestore()

firestore.settings({cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED})
firestore.enablePersistence()

export const database = {
    home: firestore.collection("home"),
    kanto: firestore.collection("kanto"),
    johto: firestore.collection("johto"),
    "johto-akt": firestore.collection("johto-akt"),
    hoenn: firestore.collection("hoenn"),
    "hoenn-akt": firestore.collection("hoenn-akt"),
    sinnoh: firestore.collection("sinnoh"),
    einall: firestore.collection("einall"),
    "einall-akt": firestore.collection("einall-akt"),
    "kalos-zentral": firestore.collection("kalos-zentral"),
    "kalos-kueste": firestore.collection("kalos-kueste"),
    "kalos-gebirgs": firestore.collection("kalos-gebirgs"),
    alola: firestore.collection("alola"),
    "alola-akt": firestore.collection("alola-akt"),
    galar: firestore.collection("galar")
}
export default app