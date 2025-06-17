/* eslint-disable */

import { HiX } from "react-icons/hi";
import ListMenu from "./ListMenu";
import Footer from "./Footer";

export default function Sidebar({ open, onClose }) {
    return (
        <div
            className={`fixed z-50 flex min-h-full w-64 flex-col bg-white pb-10 shadow-2xl transition-all duration-200 ease-linear xl:z-0 ${open ? "translate-x-0" : "-translate-x-96"
                } xl:translate-x-0`}
        >

            {/* Close Button for Mobile */}
            <span
                className="absolute right-4 top-4 block cursor-pointer xl:hidden"
                onClick={onClose}
            >
                <HiX className="h-6 w-6" />
            </span>

            {/* Logo or Brand */}
            <div className="mx-14 mt-9 flex items-center">
                <div className="mt-1 ml-1 text-[20px] font-bold uppercase text-blue-600">
                    Discu <span className="font-medium normal-case text-blue-400">SPACE</span>
                </div>
            </div>

            {/* Divider */}
            <div className="my-7 h-px bg-blue-200" />

            {/* Navigation Links */}
            <ul className="mb-auto pt-1">
                <ListMenu />
            </ul>
                <Footer/>


        </div>
    );
}
