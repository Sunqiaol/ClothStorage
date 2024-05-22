import { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'next/router';
import { auth } from "../firebase";
import axios from 'axios';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSignup = async (event) => {
        event.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const firebaseId = user.uid;
            const role = 'Worker';
            try {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/addUser`, { firebaseId, email, role });
                router.push('/orderlist');
            } catch (error) {
                console.error('Error signing up:', error.response ? error.response.data : error.message);
            }
            console.log('User signed up:', user);
        } catch (error) {
            console.error('Error signing up:', error.code, error.message);
        }
    };

    return (
        <div>
            <h1>Sign Up Page</h1>
            <form onSubmit={handleSignup}>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default Signup;
