'use client';
import { use, useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
export default function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (value) => {
        setUsername(value);
    }
    const handlePasswordChange = (value) => {
        setPassword(value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        // http://localhost:3000/auth/login
        axios.post('http://localhost:3000/auth/login', {
            username,
            password
        }).then((res) => {
            // console.log('Login successful:', res.data);
            const { token, user } = res.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            router.push('/dashboard');
        }).catch((error) => {
            // console.error('Login failed:', error.response.message);
            alert('Login failed: ' + error.response.data.message);
        });
    }

    useEffect(() => {
        setUsername('sara');
        setPassword('123456');
    }, []);


    return (
        <>
        <h1>Login Page</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
            <div>
                <label>Usuario</label>
                <input
                    type="text"
                    value={username}
                    required
                    autoFocus
                    onChange={(e) => handleUsernameChange(e.target.value)}
                    placeholder="Ingrese su usuario" />
            </div>
            <div>
                <label>Contraseña</label>
                <input
                    required
                    type="password"
                    value={password}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    placeholder="Ingrese su contraseña" />
            </div>
            <div>
                <button type="submit">Iniciar Sesión</button>
            </div>
            <div>
                <pre> {JSON.stringify({ username, password }, null, 2)}</pre>
            </div>
        </form>
        </>
    );
}