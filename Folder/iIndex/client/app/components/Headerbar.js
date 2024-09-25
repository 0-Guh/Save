"use client"
import { useState } from "react"


export default function Headerbar() {
    const [isInputSearch, setIsInputSearch] = useState(false)

    return (
        <header className="absolute w-screen p-7 z-40">

            <div className={`fixed top-0 left-0 z-50 ${isInputSearch ? "w-screen h-screen" : "w-0 h-0"}`} onClick={() => setIsInputSearch(false)} />

            <nav className="relative flex justify-between items-center 2xl:w-4/5 2xl:mx-auto">

                <a className="font-extrabold text-5xl tracking-tighter 2xl:text-6xl" href="/"> iIndex </a>

                <ul className="flex gap-x-7 font-semibold text-xl absolute top-[200%] md:static">

                    <li> <a className="hover:duration-150 hover:pb-2 hover:border-b-2 hover:text-orange-500 hover:border-b-orange-500" href="/genres/filme"> Filmes </a> </li>

                    <li> <a className="hover:duration-150 hover:pb-2 hover:border-b-2 hover:text-orange-500 hover:border-b-orange-500" href="/genres/serie"> Series </a> </li>

                    <li> <a className="hover:duration-150 hover:pb-2 hover:border-b-2 hover:text-orange-500 hover:border-b-orange-500" href="/genres/anime"> Animes </a> </li>

                </ul>

                <button className="font-[Icon] font-medium text-5xl md:text-4xl hover:duration-150 hover:text-orange-500" onClick={() => setIsInputSearch(true)}> search </button>

                <div className={`flex items-center max-w-md overflow-hidden duration-500 z-50 absolute right-0 top-[300%] md:top-[150%] ${isInputSearch ? "w-full" : "w-0"}`}>

                    <input className="w-full pl-16 py-5 backdrop-blur-md bg-transparent font-medium border-b-2 border-b-orange-500 placeholder:text-white" placeholder="Pesquise ..." />

                    <button className="absolute left-2 pr-1 font-[Icon] font-medium text-4xl border-r-2 border-r-orange-500 hover:text-orange-500"> search </button>

                </div>

            </nav>

        </header>
    )
}