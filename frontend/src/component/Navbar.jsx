import { Link } from "react-router-dom";
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
        <div>
            <div className={` ${open ? "w-64" : "w-20"} 
            bg-dark-blue h-screen p-5  pt-8 relative duration-300`}>
                <img src={controller} className={`absolute cursor-pointer -right-3 top-9 w-6 scale-150 rounded-full rotate-180  ${!open && "rotate-0"}`}
                    onClick={() => setOpen(!open)} alt=""
                />
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
                        <div>
                            {menu.gap && <div class="inset-0 flex items-center px-2 mt-4"><div class="w-full border-b border-white border-opacity-30"></div></div>}
                            <li
                                key={index}
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
        </div>
    );
}

export default Navbar;
