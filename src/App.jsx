import React from "react";
import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
const Dashboard = React.lazy(() => import("./Pages/Admin/Dashboard"))
const ListUser = React.lazy(() => import("./Pages/Admin/UserManagement/ListUser"))
const ListPostingan = React.lazy(() => import("./Pages/Admin/PostinganManagement/ListPostingan"))
const Komentar = React.lazy(() =>import("./Pages/Admin/LaporanManagement/Komentar"))
const Postingan = React.lazy(() =>import("./Pages/Admin/LaporanManagement/Postingan"))
const Pengguna = React.lazy(() =>import("./Pages/Admin/LaporanManagement/Pengguna"))
const Login = React.lazy(()=>import("./Pages/Auth/Login"))
const Register = React.lazy(()=>import("./Pages/Auth/Register"))
const Forgot = React.lazy(()=>import("./Pages/Auth/Forgot"))
const AuthLayout = React.lazy(()=>import("./Layouts/AuthLayout"))
const MainLayout = React.lazy(() => import("./Layouts/MainLayout"))
const Loading = React.lazy(()=> import("./components/Loading")) 
import "./assets/tailwind.css";

function App() {
  return (


    <Suspense fallback={<Loading />}>
      <Routes>
            
              <Route element={<MainLayout/>}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/listuser" element={<ListUser />} />
                <Route path="/listpostingan" element={<ListPostingan />} />
                <Route path="/laporan/user" element={<Pengguna />} />
                <Route path="/laporan/komentar" element={<Komentar />} />
                <Route path="/laporan/postingan" element={<Postingan />} />              
              </Route>
              <Route element={<AuthLayout/>}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register/>} />
                <Route path="/forgot" element={<Forgot/>} />
              </Route>
              {/* <Route element={<GuestLayout/>}>
                <Route path="/home" element={<Home />} />               
                <Route path="/cekproduk" element={<Cekproduk />} />               
              </Route>
             
              <Route path="/Error400" element={<Error400 />} />
                <Route path="/Error401" element={<Error401 />} />
                <Route path="/Error403" element={<Error403 />} />
                <Route path="*" element={<Error404 />} /> */}
         
            </Routes>
    </Suspense>      
 )}
    
export default App;
