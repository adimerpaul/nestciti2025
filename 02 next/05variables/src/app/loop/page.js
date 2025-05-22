'use client';
import { useState, useEffect } from 'react';
export default function Loop() {
    const [mensajes, setMensajes] = useState([
        { id: 1, texto: "Hola" },
    ]);
    const [nuevoMensaje, setNuevoMensaje] = useState("");

    const [numeroAleatorio, setNumeroAleatorio] = useState(0);

    useEffect(() => {
        setNumeroAleatorio(Math.floor(Math.random() * 100));
    }, []);

    return (
        <div>
        <h1>Ejemplo de bucle</h1>
        {/* <div>
            {numeroAleatorio}
        </div> */}
        <input
            type="number"
            value={nuevoMensaje}
            onChange={(e) => setNuevoMensaje(e.target.value)}
            />
        <button
            onClick={() => {
            const nuevoId = mensajes.length + 1;
            const nuevoTexto = parseInt(nuevoMensaje);
            let nuevoMensajeObj
            if (nuevoTexto === parseInt(numeroAleatorio)) {
                nuevoMensajeObj = { id: nuevoId, texto: "Gaste" };
            }else if (nuevoMensaje < numeroAleatorio) {
                nuevoMensajeObj = { id: nuevoId, texto: "Menor" };
            }else {
                nuevoMensajeObj = { id: nuevoId, texto: "Mayor" };
            }
            setMensajes([...mensajes, nuevoMensajeObj]);
            setNuevoMensaje("");
            }}
        >
            Agregar Mensaje
        </button>
        <ul>
            {mensajes.map((mensaje) => (
            <li key={mensaje.id}>{mensaje.texto}</li>
            ))}
        </ul>
        </div>
    );
    }
