import React, { useState } from 'react';
import { signup } from '../services/api.ts';

const SignUpPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await signup(email, password, confirmPassword);
        if (res.userId) {
            alert('User created with Id: ' + res.userId);
        } else {
            alert('An error has ocurred');
        }
    };

    return (
        <div style={{margin: '25px'}}>
            <form onSubmit={(e) => handleSignup(e)}>
                <div style={{padding: '10px'}}>
                    <label style={{paddingRight: '10px'}}>Email</label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div style={{padding: '10px'}}>
                    <label style={{paddingRight: '10px'}}>Password</label>
                    <input
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div style={{padding: '10px'}}>
                    <label style={{paddingRight: '10px'}}>Confirm password</label>
                    <input
                        type='password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default SignUpPage;
