import Image from "next/image";
import { Header } from "./_components/Header";
import AddToDBForm from "./_components/AddToDB";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Header />
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1>Uinify</h1>
      </div>
      <AddToDBForm />
    </main>
  );
}
