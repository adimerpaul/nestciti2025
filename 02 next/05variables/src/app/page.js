'use client';
import { useState } from 'react';
export default function Home() {
  const [edad,setEdad] = useState(0);
  const [mensaje,setMensaje] = useState("");

  const handleChange = (e) => {
    const valor = e.target.value;
    setEdad(valor);
    if (valor < 18){
      setMensaje("Eres menor de edad");
    }else{
      setMensaje("Eres mayor de edad");
    }
  }
  return (
    <div>
      <input type="number" value={edad}
      onChange={handleChange} />
      <div>
        {mensaje}
      </div>
    </div>  
  );
}
