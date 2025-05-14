import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [num1, setCount] = useState(10)
  const [num2, setCount2] = useState(23)
  const [boleanos, setBoleanos] = useState(false)
  const [array, setArray] = useState([1,2,3,4,5])
  const [object, setObject] = useState({name: 'Juan', age: 23})
  return (
    <>
    <input type="text" value={num1} onChange={(e) => setCount(e.target.value)} />
    <input type="text" value={num2} onChange={(e) => setCount2(e.target.value)} />
    <h4>{num1} + {num2} = {parseInt(num1) + parseInt(num2)}</h4>
    <div>
      <h4>{boleanos ? 'true' : 'false'}</h4>
      <button onClick={() => setBoleanos(!boleanos)}>Cambiar</button>
    </div>
    <div>
      <h4>{array.join(', ')}</h4>
      <button onClick={() => setArray([...array, array.length + 1])}>Agregar</button>
    </div>
    <div>
      <h4>{object.name} - {object.age}</h4>
      <button onClick={() => setObject({name: 'Pedro', age: 30})}>Cambiar</button>
    </div>
    </>
  )
}

export default App
