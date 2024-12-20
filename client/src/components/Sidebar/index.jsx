import { useState, Fragment } from 'react';
import { IoMdLogOut } from "react-icons/io";
import { NavLink, useNavigate } from 'react-router-dom';

import { sideBarLinks } from '../../utils/sideBarLinks';

export default function SideBar() {
    const navigate = useNavigate();

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleLogoutConfirm = () => {
        localStorage.removeItem("token");
        navigate('/login');
        setIsDialogOpen(false);
    };

    const handleLogoutCancel = () => {
        setIsDialogOpen(false);
    };

    return (
        <div className='shadow-lg shadow-violet-600 bg-yellow-300 w-20 flex flex-col items-center justify-between'>
            <div className='flex flex-col h-[40vh] justify-around items-center'>
                {sideBarLinks.map((sideBarLink) => {
                    const { id, name, icon } = sideBarLink;
                    return (
                        <Fragment key={id}>
                            <NavLink to={`/${name}`} className='flex flex-col items-center p-2'>
                                <span>{icon}</span>
                                <p className='capitalize'>{name}</p>
                            </NavLink>
                        </Fragment>
                    );
                })}
            </div>

            <button onClick={() => setIsDialogOpen(true)} className='text-violet-700 p-2 rounded-md hover:bg-violet-500 hover:text-white'>
                <IoMdLogOut size={20} className='w-full mx-auto text-center' />
                Logout
            </button>

            {isDialogOpen && (
                <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center z-10 bg-black bg-opacity-80'>
                    <div className='bg-slate-100 p-10 rounded shadow-lg border border-yellow-400'>
                        <h1 className='text-lg mb-10'>Are you sure you want to logout?</h1>
                        <section className='flex justify-end gap-4'>
                            <button
                                onClick={handleLogoutCancel}
                                className='px-6 py-2 bg-gray-300 rounded hover:bg-gray-400'
                            >No
                            </button>
                            <button
                                onClick={handleLogoutConfirm}
                                className='px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600'
                            >Yes
                            </button>
                        </section>
                    </div>
                </div>
            )}
        </div>
    );
}
