import React from "react";
import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
const Dashboard = React.lazy(() => import("./Pages/Admin/Dashboard"))
const ListUser = React.lazy(() => import("./Pages/Admin/UserManagement/ListUser"))
const ListPostingan = React.lazy(() => import("./Pages/Admin/PostinganManagement/ListPostingan"))
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
                {/* <Route path="/Orders" element={<Orders />} />
                <Route path="/Customer" element={<Customer />} />
                <Route path="/ListUser" element={<ListUser />} /> */}
                
              </Route>
              {/* <Route element={<AuthLayout/>}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register/>} />
                <Route path="/forgot" element={<Forgot/>} />
              </Route>
              <Route element={<GuestLayout/>}>
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
