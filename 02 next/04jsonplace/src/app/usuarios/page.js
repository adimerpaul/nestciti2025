'use client';
import { useEffect, useState } from 'react';
const API = 'https://jsonplaceholder.typicode.com/users'
export default function Usuarios() {

    const [usuarios,setUsuarios] = useState([]);
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [editandoId, setEditandoId] = useState(null);

    useEffect(() => {
        fetch(API)
        .then((response) => response.json())
        .then((data) => {
            console.log('Usuarios cargados', data);
            setUsuarios(data);
        })
    }, []);

    const handleDelete = (id) => {
        const confirmato = confirm('¿Estás seguro de eliminar el usuario?');
        if(!confirmato) return;
        const userIndex = usuarios.findIndex((usuario) => usuario.id === id);
        console.log('Usuario encontrado', userIndex);
        if(userIndex !== -1){
            const newUsuarios = [...usuarios];
            newUsuarios.splice(userIndex, 1);
            setUsuarios(newUsuarios);
            console.log('Usuario eliminado', newUsuarios);
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log('Enviando formulario');
        if(editandoId){
            console.log('Editando usuario', editandoId);
            const updateUsuarios = usuarios.map((usuario) => {
                if(usuario.id === editandoId){
                    return {
                        ...usuario,
                        name: nombre,
                        email: email
                    }
                }
                return usuario;
            });
            setUsuarios(updateUsuarios);
            setEditandoId(null);
            setNombre('');
            setEmail('');
            return false
        }

        const newUsuario = {
            id: Math.max(...usuarios.map((usuario) => usuario.id)) + 1,
            name: nombre,
            email: email
        }
        setUsuarios([...usuarios, newUsuario]);
        setNombre('');
        setEmail('');
    }
    const handleEdit = (usuario) => {
        setNombre(usuario.name);
        setEmail(usuario.email);
        setEditandoId(usuario.id);
    }

    return (
        <>
        Usuarios
        <div>
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder='Nombre' value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                <input type='email' placeholder='Correo' value={email} onChange={(e) => setEmail(e.target.value)} />
                <button type='submit'>Enviar</button>
            </form>
            {/* <pre>
                {nombre}
            </pre> */}
        </div>
        <ul>
            {usuarios.map((usuario) => (
                <li key={usuario.id}>
                    <b>{usuario.name}</b>
                    <span> - {usuario.email} </span>
                    <button onClick={() => handleEdit(usuario)}>Editar</button>
                    <button onClick={() => handleDelete(usuario.id)}> Eliminar</button>
                </li>
            ))}
        </ul>
        {/* <pre>
            {JSON.stringify(usuarios, null, 2)}
        </pre> */}
        </>
    );
}