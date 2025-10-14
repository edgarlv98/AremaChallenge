import React, { useState } from 'react';
import { login } from '../services/api.ts';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await login(email, password);
        console.log(res);
        if (res.token) {
            setToken(res.token);
            localStorage.setItem("token", res.token);
        } else {
            alert('An error has ocurred');
        }
    };

    return (
        <div style={{margin: '25px'}}>
            <form onSubmit={(e) => handleLogin(e)}>
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
                <button type='submit'>Submit</button>
            </form>
            { token && <p>Login successfull with Token: { token }</p> }
        </div>
    )
}

export default LoginPage;
