
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCWDqA79YxEpTQFrgg6QswNBjfntk3z-Wg",
  authDomain: "creanx-85a81.firebaseapp.com",
  projectId: "creanx-85a81",
  storageBucket: "creanx-85a81.appspot.com",
  messagingSenderId: "722795781345",
  appId: "1:722795781345:web:e4ea496ae6729ca633eba0",
  measurementId: "G-50DNRCN2WQ"
};



const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
