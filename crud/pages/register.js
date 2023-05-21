

import {app} from "../firebaseConfig"
import {getAuth, createUserWithEmailAndPassword, GoogleAuthProvider} from "firebase/auth"
import { useState } from "react";
import { useRouter } from 'next/router';

export default function Register(){
    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();
    const router = useRouter()
    const [email, setEmail] = useState("");
    const [password, setPassword]  = useState("");

    const signUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            router.push("/home")
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
    }

    const signUpWithGoogle = () => {
        signInWithPopup(auth, googleProvider)
            .then((response) => {
                sessionStorage.setItem('Token', response.user.accessToken)
                console.log(response.user)
                router.push('/home')
            })
    }



    return (
        <div>
            <h2>Register</h2>
            <input
                placeholder="Email"
                type="email"
                onChange={(event) => setEmail(event.target.value)}
                value={email}
            />
            <input
                type="password"
                placeholder="Password"
                onChange={(event) => setPassword(event.target.value)}
                value={password}
            />
            <button
                onClick={signUp}
            >Sign Up</button>
            <hr />
            <button
             onClick={signUpWithGoogle}
            >Sign Up With Google</button>
        </div>
    )
}