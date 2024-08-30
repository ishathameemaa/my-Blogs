import { assets } from "@/Assets/assets";
import Sidebar from "@/Components/AdminComponents/Sidebar";
import Image from "next/image";

import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Layout({ children }) {
  return (
    <>
      <div className="flex min-h-screen">
        <ToastContainer theme='dark'/>
        <Sidebar />
        <div className="flex flex-col w-full">
          <header className="flex items-center justify-between w-full py-3 max-h-[60px] px-6 sm:px-12 border-b border-black">
            <h2 className="font-semibold text-lg">Admin Panel</h2>
            <Image
              src={assets.profile_icon}
              width={40}
              height={40}
              alt="Profile Icon"
              aria-label="Profile Icon"
            />
          </header>
          <main className="flex-grow">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}

