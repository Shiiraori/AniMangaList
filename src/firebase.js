import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAlHk4TNYZtkPkM5hb0G4SK8CBJ0PmY3S4",
  authDomain: "animangalist-d3d17.firebaseapp.com",
  projectId: "animangalist-d3d17",
  storageBucket: "animangalist-d3d17.appspot.com",
  messagingSenderId: "984319013731",
  appId: "1:984319013731:web:c4a3c328e365fe84d65956",
  measurementId: "G-P5P80LVEHJ"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();