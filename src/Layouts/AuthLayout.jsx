import { Outlet } from "react-router-dom";

export default function AuthLayout() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
                <div className="flex items-center justify-center mb-6">
                    <h1 className="text-4xl font-poppins font-extrabold text-gray-800">
                        <div className="mt-1 ml-1 text-[30px] font-bold uppercase text-blue-600">
                            Discu <span className="font-medium normal-case text-blue-400">SPACE</span>
                        </div>
                    </h1>
                </div>

                <Outlet />

                <p className="text-center text-sm text-gray-500 mt-6">
                    © 2025 discuspace Admin Dashboard. All rights
                    reserved.
                </p>
            </div>
        </div>
    )
}
