'use client';
import { useEffect, useState } from "react";
const API='http://localhost:3000/users';

export default function Users() {
    const [usuarios, setUsuarios] = useState([]);
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [editandoId, setEditandoId] = useState(null);

    useEffect(() => {
        fetchUsuarios();
    }, []);

    const fetchUsuarios = async () => {
        const response = await fetch(API);
        const data = await response.json();
        setUsuarios(data);
    }
    const handleDelete = async (id) => {
        const confirmDelete = confirm('¿Está seguro de que desea eliminar este usuario?');
        if (!confirmDelete) {
            return;
        }
        await fetch(`${API}/${id}`, {
            method: 'DELETE',
        });
        fetchUsuarios();
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (editandoId == null) {
            const user = {
                firstName: nombre,
                lastName: apellido,
                isActive: true
            };
            await fetch(API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            setNombre('');
            setApellido('');
            fetchUsuarios();
        }else{
            const user = {
                firstName: nombre,
                lastName: apellido,
                isActive: true
            };
            await fetch(`${API}/${editandoId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            setNombre('');
            setApellido('');
            setEditandoId(null);
            fetchUsuarios();
        }
    }
    const handleEdit = async (user) => {
        setEditandoId(user.id);
        setNombre(user.firstName);
        setApellido(user.lastName);
    }

    return (
        <div>
            Users
            <div>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="firstName" placeholder="Nombre" required value={nombre} onChange={(e) => setNombre(e.target.value)} />
                    <input type="text" name="lastName" placeholder="Apellido" required value={apellido} onChange={(e) => setApellido(e.target.value)} />
                    <button type="submit">
                        {editandoId == null ? 'Agregar' : 'Actualizar'}
                    </button>
                </form>
            </div>
            <table border={1} style={{ collapse: 'collapse', width: '100%', border: '1px solid black' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map(usuario => (
                        <tr key={usuario.id}>
                            <td>{usuario.id}</td>
                            <td>{usuario.firstName}</td>
                            <td>{usuario.lastName}</td>
                            <td>
                                <button onClick={() => handleEdit(usuario)}>
                                    Editar
                                </button>
                                <button onClick={() => handleDelete(usuario.id)}>
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <pre>
                {JSON.stringify(usuarios, null, 2)}
            </pre>
        </div>
    );
}