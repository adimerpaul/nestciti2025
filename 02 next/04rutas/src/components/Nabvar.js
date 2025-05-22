import Link from "next/link";
export default function Nabvar() {
    return (
        <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/usuarios">Usuarios</Link>
        </li>
        <li>
          <Link href="/productos">Productos</Link>
        </li>
        <li>
          <Link href="/sobre">Sobre</Link>
        </li>
      </ul>
    );
}