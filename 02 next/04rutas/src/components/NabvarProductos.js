import Link from "next/link";
export default function NabvarProductos() {
    return (
        <>
        <ul>
            <li>
                <Link href="/productos">Producto</Link>
            </li>
            <li>
                <Link href="/productos/laptops">Laptops</Link>
            </li>
            <li>
                <Link href="/productos/ratones">Ratones</Link>
            </li>
            <li>
                <Link href="/productos/tables">tables</Link>
            </li>
        </ul>
        </>
    )
}
