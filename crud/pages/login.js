
import { app } from '../firebaseConfig';
import { useEffect } from 'react';
import {
    getAuth,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    GithubAuthProvider,
    signInWithPopup
} from 'firebase/auth'
import { useState } from 'react';
import { useRouter } from 'next/router';
export default function Login() {
    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signUp = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((response) => {
                console.log(response.user)
                sessionStorage.setItem('Token', response.user.accessToken);
                router.push('/home')
            })
            .catch(err => {
                alert('Cannot Log in')
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
            <main>
                <h1>Login</h1>

                <input
                    placeholder='Email'
                    onChange={(event) => setEmail(event.target.value)}
                    value={email}
                    type='email'
                />
                <input
                    placeholder='Password'
                    onChange={(event) => setPassword(event.target.value)}
                    value={password}
                    type='password'
                />

                <button
                    onClick={signUp}
                >Sign In</button>
                <hr />
                <button
                    onClick={signUpWithGoogle}>
                    Sign Up with Google
                </button>
            
            </main>
        </div>
    )
}