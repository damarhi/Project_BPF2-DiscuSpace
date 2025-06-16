export default function Footer() {
    return (

        <div id="sidebar-footer" className="mt-auto flex flex-col items-center px-4" >
            <div
                id="footer-card"
                className="relative mt-14 w-[256px] rounded-[20px] bg-gradient-to-br from-[#868CFF] via-[#432CF3] to-brand-500 pb-4 shadow-lg"
            >

                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 flex h-24 w-24 items-center justify-center rounded-full border-[4px] border-white bg-gradient-to-b from-[#868CFF] to-brand-500 dark:!border-navy-800">
                    <img
                        id="footer-avatar"
                        src="https://avatar.iran.liara.run/public/28"
                        alt="avatar"
                        className="h-20 w-20 rounded-full object-cover"
                    />
                </div>

                <div className="mt-16 flex flex-col items-center px-4 text-white">
                    <span className="text-sm font-medium text-center">
                        Halo Admin, Ingin Berkunjung Ke
                    </span>

                    <div
                        id="add-menu-button"
                        className="mt-4 flex justify-center items-center px-4 py-2 bg-white rounded-full cursor-pointer transition hover:bg-gray-200"
                    >
                        <span className="text-gray-600 font-semibold">DiscuSpace</span>
                    </div>
                </div>
            </div>

            <span
                id="footer-brand"
                className="mt-3 block text-sm font-bold text-gray-400 text-center"
            >
                DiscuSpace Admin Dashboard
            </span>
            <p
                id="footer-copyright"
                className="text-xs font-light text-gray-400 text-center"
            >
                &copy; 2025 All Right Reserved
            </p>
        </div >
    )
}