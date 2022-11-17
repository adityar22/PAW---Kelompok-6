import { Link } from "react-router-dom";
import { useState } from "react";

import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

import controller from "../asset/controller.png";
import menu_about from "../asset/menu_about.png";
import menu_account from "../asset/menu_account.png";
import menu_calendar from "../asset/menu_calendar.png";
import menu_home from "../asset/menu_home.png";
import menu_notes from "../asset/menu_notes.png";
import menu_task from "../asset/menu_task.png";



const Navbar = () => {
    const [open, setOpen] = useState(true);
    const [popup, setPopup] = useState(false);
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

    const togglePopup = () => {
        setPopup(!popup);
    }

    const handleClick = (e) => {
        e.preventDefault();
        logout();
    };

    return (
        <div className={` ${open ? "w-72" : "w-20"} 
            bg-dark-blue h-screen p-5  pt-8  duration-300 relative`}>
            <img src={controller} className={`absolute cursor-pointer -right-3 top-9 w-6 scale-150 rounded-full rotate-180  ${!open && "rotate-0"}`}
                onClick={() => setOpen(!open)} alt=""
            />
            <div className="flex justify-between flex-col h-full">
                <div className="content-top">
                    <div className="flex gap-x-4 items-center">
                        <Link to="/">
                            <h1
                                className={`text-orange cursor-pointer origin-left font-medium text-xl duration-300  ${!open && "scale-0"}`}>
                                Task Management
                            </h1>
                        </Link>
                    </div>
                    <ul className="pt-6">
                        {Menus.map((menu, index) => (
                            <div key={index}>
                                {menu.gap && <div className="inset-0 flex items-center px-2 mt-4"><div className="w-full border-b border-white border-opacity-30"></div></div>}
                                <li
                                    className={`rounded-md p-2 cursor-pointer hover:bg-blue-500 text-gray-300 text-sm items-center transition-all duration-300 gap-x-4 
                                ${menu.gap ? "mt-4" : "mt-2"} ${index === 0 && "bg-light-white"} `}>
                                    <Link className="flex gap-3" to={menu.link}>
                                        <img src={menu.src} className="w-4 h-4" alt="" />
                                        <span className={`${!open && "hidden"} origin-left duration-200`}>
                                            {menu.title}
                                        </span>
                                    </Link>
                                </li>
                            </div>
                        ))}
                    </ul>
                </div>
                <div className="content-bottom">
                    <ul>
                        {user && (
                            <div className="logout">
                                {/* <span>{user.email}</span> */}
                                <button onClick={handleClick} className={`text-white bg-red-500 hover:bg-red-700 focus:scale-90 focus:transition-all rounded-lg px-5 py-2.5 text-center mb-2 w-full transition-all ${!open && "scale-0"}`}>Log out</button>
                            </div>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
