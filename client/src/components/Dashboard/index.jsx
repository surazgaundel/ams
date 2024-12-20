import NavBar from '../Navigation';
import SideBar from '../Sidebar';
import { Outlet, useLocation } from 'react-router-dom';

export default function Dashboard() {
  const location = useLocation();
  return (
    <>
    <div className="flex flex-col min-h-screen">
            <NavBar />
            <div className="flex flex-1"> 
                <SideBar />
                <div id="main-container" className="flex-1">
                  {location.pathname === '/' && 
                    <div className="flex flex-col gap-2 items-center justify-center bg-slate-300 h-[100%]">
                      <h1 className="text-4xl font-bold">Welcome to Artist Management System (AMS).</h1>
                      <h2 className="font-semibold text-xl">Manage your artist,users and songs.</h2>
                      <p>Please check out features for more information.</p>
                    </div>
                  }
                    <Outlet/>
                </div>
            </div>
        </div>
    </>
  )
}
