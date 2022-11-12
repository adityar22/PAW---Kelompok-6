import { Outlet, Link } from "react-router-dom";
import { useState } from "react";

import controller from "../asset/controller.png";
import menu_about from "../asset/menu_about.png";
import menu_account from "../asset/menu_account.png";
import menu_calendar from "../asset/menu_calendar.png";
import menu_home from "../asset/menu_home.png";
import menu_notes from "../asset/menu_notes.png";
import menu_task from "../asset/menu_task.png";



const Navbar = () => {
    const [open, setOpen] = useState(false);
    const Menus = [
        { title: "Home", src: menu_home, link: "/" },
        { title: "Task ", src: menu_task, link: "/task" },
        { title: "Schedule ", src: menu_calendar, link: "/calendar" },
        { title: "Notes ", src: menu_notes, link: "/notes" },
        { title: "About", src: menu_about, gap: true, link: "/about" },
        { title: "Accounts", src: menu_account, gap: true, link: "/profile" },
    ];

    return (
        <navbar>
            <div className={` ${open ? "w-64" : "w-20"} 
            bg-dark-blue h-screen p-5  pt-8 relative duration-300`}>
                <img src={controller} className={`absolute cursor-pointer -right-3 top-9 w-6 bg-orange border-orange
            border-2 rounded-full rotate-180  ${!open && "rotate-0"}`}
                    onClick={() => setOpen(!open)} alt=""
                />
                <div className="flex gap-x-4 items-center">
                    <img src=""
                        classname="cursor-pointer duration-500" alt="" />
                    <h1
                        className={`text-orange origin-left font-medium text-x1 duration-300 ${!open && "scale-0"}`}>
                        Task Management
                    </h1>
                </div>
                <ul className="pt-6">
                    {Menus.map((menu, index) => (
                        <Link to={menu.link}>
                            <li
                                key={index}
                                className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
                                ${menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white"} `}
                            >
                                <img src={menu.src} className="w-4" alt="" />
                                <span className={`${!open && "hidden"} origin-left duration-200`}>
                                    {menu.title}
                                </span>
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
        </navbar>
    );
}

export default Navbar;