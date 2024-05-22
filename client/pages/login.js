import { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router';
import Link from 'next/link';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log('Logged in Successfully');
            router.push('/orderlist');
        } catch (error) {
            let userErrorMessage = '';

            if (error.code === 'auth/invalid-email') {
                userErrorMessage = 'Wrong Email';
            } else if (error.code === 'auth/missing-password') {
                userErrorMessage = 'Missing Password';
            } else if (error.code === 'auth/wrong-password') {
                userErrorMessage = 'Wrong Password';
            } else {
                userErrorMessage = 'Wrong User Credentials';
            }
            setError(userErrorMessage);
        }
    }

    return (
        <div>
            <form onSubmit={handleLogin}>
                <input
                    type='email'
                    placeholder='Enter Your Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type='password'
                    placeholder='Enter Your Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type='submit'>Login</button>
            </form>
            {error && <p>{error}</p>}


            <Link href='/signup'>Sign Up Page</Link>
        </div>
    );
}

export default Login;
