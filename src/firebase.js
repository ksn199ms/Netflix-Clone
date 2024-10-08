
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";



const firebaseConfig = {
  apiKey: "AIzaSyCE-5MLDQAnW2IHFtuZzUy92IPwz7vEPec",
  authDomain: "netflix-clone-49cf6.firebaseapp.com",
  projectId: "netflix-clone-49cf6",
  storageBucket: "netflix-clone-49cf6.appspot.com",
  messagingSenderId: "981235225722",
  appId: "1:981235225722:web:241c580d8f9e5e515ed7c3"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);


const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email
        })
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}


const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}


const logout = () => {
    signOut(auth);
}

export { auth, db, signup, login, logout }