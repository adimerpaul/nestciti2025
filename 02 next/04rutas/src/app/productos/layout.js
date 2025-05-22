import NabvarProductos from "@/components/NabvarProductos";
import Link from "next/link";
export const metadata = {
  title: "Productos",
};
export default function RootLayout({ children }) {
  return (
    <div>
        <NabvarProductos />
        {children}
    </div>
  );
}