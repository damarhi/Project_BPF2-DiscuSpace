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
                        src="data:image/png;base64,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"
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
