import { NavLink } from "react-router-dom";
import { useState } from "react";

import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";

import controller from "../../asset/controller.png";
import menu_about from "../../asset/menu_about.png";
import menu_account from "../../asset/menu_account.png";
import menu_calendar from "../../asset/menu_calendar.png";
import menu_home from "../../asset/menu_home.png";
import menu_notes from "../../asset/menu_notes.png";
import menu_task from "../../asset/menu_task.png";
import logo_tman from "../../asset/logoTman.png";


const Navbar = () => {
    const [open, setOpen] = useState(true);
    const active = "bg-white text-orange"
    const deactive = "text-gray-300"

    const { logout } = useLogout();
    const { user } = useAuthContext();

    const Menus = [
        { title: "Home", src: menu_home, link: "/" },
        { title: "Task ", src: menu_task, link: "/task" },
        { title: "Schedule ", src: menu_calendar, link: "/calendar" },
        { title: "Notes ", src: menu_notes, link: "/notes" },
        { title: "About", src: menu_about, gap: true, link: "/about" },
        { title: "Accounts", src: menu_account, gap: true, link: "/profile" }
    ];

    const handleClick = (e) => {
        e.preventDefault();
        logout();
    };

    return (
        <div className={` ${open ? "w-72" : "w-20"} 
            bg-dark-blue h-full p-5  pt-8  duration-300 relative`}>
            <img src={controller} className={`absolute cursor-pointer -right-3 top-9 w-6 scale-150 rounded-full rotate-180  ${!open && "rotate-0"}`}
                onClick={() => setOpen(!open)} alt=""
            />
            <div className="flex justify-between flex-col h-full">
                <div className="content-top">
                    <div className="flex gap-x-4 justify-center">
                        <NavLink to="/">
                            <img src={logo_tman} className={`w-12 inline-block mr-2 ${!open && "m-3"}`} />
                            <h1
                                className={`text-orange inline-block mb-12 cursor-pointer origin-left font-bold text-2xl duration-300  ${!open && "scale-0"}`}>
                                T'Man
                            </h1>
                        </NavLink>
                    </div>
                    <ul className="pt-6">
                        {Menus.map((menu, index) => (
                            <div>
                                <NavLink key={index} to={menu.link} className={({ isActive }) => isActive ? active : deactive}>
                                    <div>
                                        {menu.gap && <div className="inset-0 flex items-center px-2 mt-4"><div className="w-full border-b border-white border-opacity-30"></div></div>}
                                        <li
                                            className={` flex gap-3 rounded-md p-2 cursor-pointer hover:bg-blue-500 text-sm items-center transition-all duration-300 gap-x-4 
                                ${menu.gap ? "mt-4" : "mt-2"} 
                                ${index === 0 && "bg-light-white"} `}
                                        >
                                            <img src={menu.src} className="w-4 h-4" alt="" />
                                            <span className={`${!open && "hidden"} origin-left duration-200 text-base`}>
                                                {menu.title}
                                            </span>
                                        </li>
                                    </div>
                                </NavLink>
                            </div>
                        ))}
                    </ul>
                </div>
                <div className="content-bottom">
                    <ul className={`flex flex-col items-center mb-3 text-gray-300 transition-all text-sm ${!open && "scale-0"}`}>
                        <p >Logged as <span className="font-semibold text-orange">{user.username ? user.username : 'anonim'}</span></p>
                        <p className="font-semibold text-orange">{user.email}</p>
                    </ul>
                    <ul>
                        {user && (
                            <div className="logout">
                                {/* <span>{user.email}</span> */}
                                {/* <button onClick={handleClick} className={`text-white bg-red-500 hover:bg-red-700 focus:scale-90 focus:transition-all rounded-lg px-5 py-2.5 text-center mb-2 w-full transition-all ${!open && "scale-0"}`}>Log out</button> */}
                            </div>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
