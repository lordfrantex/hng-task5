import Image from "next/image";

export default function Home() {
  return (
    <main className="">

      <div className="dropdown w-full">
        <div tabIndex={0} role="button" className="btn m-1">Click</div>
        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-full p-2 shadow">
          <li ><a className="hover:bg-red-800">Item 1</a></li>
          <li><a>Item 2</a></li>
        </ul>
      </div>


    </main>
  );
}
