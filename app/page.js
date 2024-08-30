
"user client"


import BlogList from "@/Components/BlogList";
import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from "next/image";

export default function Home() {
  return (
    <>
    <ToastContainer theme="dark"/>
    <Header/>
    <BlogList/>
    <Footer/>
   
    </>
   
  );
}