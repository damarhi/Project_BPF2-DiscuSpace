export default function Footer() {
  return (
    <footer className="bg-white text-gray-800 px-10 py-12 border-t border-gray-200 shadow-inner">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* DISCU SPACE */}
        <div>
          <h6 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
            DISCU SPACE
          </h6>
          <p className="text-sm mt-2 text-gray-500">© 2025 All Rights Reserved</p>
        </div>


        {/* Services */}
        <nav>
          <h6 className="text-base font-semibold mb-3 text-gray-700 uppercase">Services</h6>
          <ul className="space-y-2 text-sm">
            <li><a className="hover:text-blue-600 cursor-pointer">Branding</a></li>
            <li><a className="hover:text-blue-600 cursor-pointer">Design</a></li>
            <li><a className="hover:text-blue-600 cursor-pointer">Marketing</a></li>
            <li><a className="hover:text-blue-600 cursor-pointer">Advertisement</a></li>
          </ul>
        </nav>


        {/* Company */}
        <nav>
          <h6 className="text-base font-semibold mb-3 text-gray-700 uppercase">Company</h6>
          <ul className="space-y-2 text-sm">
            <li><a className="hover:text-blue-600 cursor-pointer">About us</a></li>
            <li><a className="hover:text-blue-600 cursor-pointer">Contact</a></li>
            <li><a className="hover:text-blue-600 cursor-pointer">Jobs</a></li>
            <li><a className="hover:text-blue-600 cursor-pointer">Press kit</a></li>
          </ul>
        </nav>


        {/* Legal */}
        <nav>
          <h6 className="text-base font-semibold mb-3 text-gray-700 uppercase">Legal</h6>
          <ul className="space-y-2 text-sm">
            <li><a className="hover:text-blue-600 cursor-pointer">Terms of use</a></li>
            <li><a className="hover:text-blue-600 cursor-pointer">Privacy policy</a></li>
            <li><a className="hover:text-blue-600 cursor-pointer">Cookie policy</a></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}



