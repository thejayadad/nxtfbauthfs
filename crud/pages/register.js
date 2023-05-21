

import {app} from "../firebaseConfig"
import {getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from "firebase/auth"
import { useState } from "react";
import { useRouter } from 'next/router';
import { useEffect } from 'react';



export default function Register(){
    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();
    const router = useRouter()
    const [email, setEmail] = useState("");
    const [password, setPassword]  = useState("");

    const signUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((response) => {
                console.log(response.user)
                sessionStorage.setItem('Token', response.user.accessToken);
                router.push('/home')
            })
    }


    const signUpWithGoogle = () => {
        signInWithPopup(auth, googleProvider)
            .then((response) => {
                sessionStorage.setItem('Token', response.user.accessToken)
                console.log(response.user)
                router.push('/home')
            })
    }

    useEffect(() => {
        let token = sessionStorage.getItem('Token')

        if(token){
            router.push('/home')
        }
    }, [])



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