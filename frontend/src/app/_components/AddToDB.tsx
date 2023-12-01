"use client";

export default function AddToDBForm() {
  async function addItemToDB(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const res = await fetch("/api/db/item/add");
    const data = await res.json();
    console.log(data);
  }

  return (
    <form onSubmit={addItemToDB}>
      <button>Add item to database</button>
    </form>
  );
}
