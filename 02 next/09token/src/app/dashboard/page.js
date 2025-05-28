'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function DashboardPage() {

    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    const router = useRouter();
    useEffect(() => {

        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
        }

        productsGet();

    }, []);

    const productsGet = async () => {
        const token = localStorage.getItem('token');
        axios.get('http://localhost:3000/products',{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((res) => {
            // console.log(res.data)
            setProducts(res.data);
        })
    }

    const handleLogout = () => {
        const confirmation = confirm('Seguro que desea cerrar sesión?');
        if (confirmation) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            router.push('/login');
        }
    }
    const submitEvent = async (e) => {
        e.preventDefault();
        // console.log('submitEvent', name, price, description);
        const token = localStorage.getItem('token');

        axios.post('http://localhost:3000/products', {
            name,
            price,
            description
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((res) => {
            // console.log('Producto agregado:', res.data);
            alert('Producto agregado correctamente');
            setName('');
            setPrice('');
            setDescription('');
            productsGet();
        })
    }
    return (
        <>
            <h1>Dashboard Page</h1>
            <p>Welcome to the dashboard!</p>
            <p>This is a protected route.</p>


            <form style={{ padding: '10px'}} onSubmit={(e) => submitEvent(e)}>
                <input text="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre del producto" required />
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Precio del producto" required />
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descripción del producto" required />
                <button type='submit'>Agregar Producto</button>
            </form>

            <table border="1" style={{ width: '100%' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Descripción</th>
                        <th>Usuario</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product,index) => (
                        <tr key={index}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.description}</td>
                            <td>{product.userId}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br/>
            <br/>
            <button
                style={{marginTop: '10px'}}
                onClick={() => handleLogout()}
            >
                Logout
            </button>
        </>
    );
}