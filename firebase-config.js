// firebase-config.js (ESModules)
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDoGN9NS3iRhqla2JgpuUhc2kebY_7J0lY",
  authDomain: "lucas-tareafinalprimerparcial.firebaseapp.com",
  projectId: "lucas-tareafinalprimerparcial",
  storageBucket: "lucas-tareafinalprimerparcial.appspot.com",
  messagingSenderId: "784833180917",
  appId: "1:784833180917:web:69af8b7f54077e61f601bc"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
