export default function Footer() {
    return (
        <div id="sidebar-footer" className="mt-auto flex flex-col items-center px-4">
            <div
                id="footer-card"
                className="relative mt-10 w-[190px] rounded-[16px] bg-gradient-to-br from-[#868CFF] via-[#432CF3] to-brand-500 pb-4 shadow-lg"
            >
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 flex h-20 w-20 items-center justify-center rounded-full border-[3px] border-white bg-gradient-to-b from-[#868CFF] to-brand-500 dark:!border-navy-800">
                    <img
                        id="footer-avatar"
                        src="https://avatar.iran.liara.run/public/29"
                        alt="avatar"
                        className="h-16 w-16 rounded-full object-cover"
                    />
                </div>

                <div className="mt-14 flex flex-col items-center px-2 text-white text-sm">
                    <span className="text-xs font-medium text-center">
                        Halo Admin, Ingin Berkunjung Ke
                    </span>

                    <div
                        id="add-menu-button"
                        className="mt-3 flex justify-center items-center px-3 py-1.5 bg-white rounded-full cursor-pointer transition hover:bg-gray-200"
                    >
                        <span className="text-gray-600 font-semibold text-sm">DiscuSpace</span>
                    </div>
                </div>
            </div>

            <span
                id="footer-brand"
                className="mt-2 block text-xs font-bold text-gray-400 text-center"
            >
                DiscuSpace Admin Dashboard
            </span>
            <p
                id="footer-copyright"
                className="text-[10px] font-light text-gray-400 text-center"
            >
                &copy; 2025 All Right Reserved
            </p>
        </div>
    );
}
