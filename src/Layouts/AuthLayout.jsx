import { IoMdArrowRoundBack } from "react-icons/io";
import { Outlet } from "react-router-dom";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Link } from "react-router-dom";

export default function AuthLayout() {
    return (
        <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center px-4">

            {/* Lottie Background Fullscreen */}
            <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
                <DotLottieReact
                    src="https://lottie.host/db936f3d-65d7-424a-bffc-98999c74ac8f/3RoniSFQqq.lottie"
                    loop
                    autoplay
                    style={{
                        width: '1600px',
                        height: '1000px',
                        objectFit: 'cover',
                    }}
                />
            </div>

            {/* Konten Login/Register (Card) */}
            <div className="relative z-10 bg-white p-8 rounded-2xl shadow-md w-full max-w-2xl h-[88vh] overflow-y-auto">
                <Link
                    to="/"
                >
                    <IoMdArrowRoundBack />
                </Link>
                <div className="flex items-center justify-center mb-6">

                    <h1 className="text-4xl font-poppins font-extrabold text-gray-800">

                        <a href="/">
                            <div className="mt-1 ml-1 text-[30px] font-bold uppercase text-blue-600">
                                Discu <span className="font-medium normal-case text-blue-400">SPACE</span>
                            </div>
                        </a>
                    </h1>
                </div>

                <Outlet />


            </div>
        </div>
    );
}
