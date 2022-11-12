import {useState} from "react";

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const Menus = [
        { title: "Dashboard", src: "menu_home" },
        { title: "Task ", src: "menu_task" },
        { title: "Schedule ", src: "menu_calendar" },
        { title: "Notes ", src: "menu_notes"  },
        { title: "About", src: "Setting", gap: true},
        { title: "Accounts", src: "menu_account", gap: true },
      ];

    return ( 
        <navbar>
            <div className={` ${open ? "w-64" : "w-20"} 
            bg-dark-blue h-screen p-5  pt-8 relative duration-300 sticky top-0`}>
            <img src=".../asset/controller.png" className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
            border-2 rounded-full  ${!open && "rotate-180"}`} 
            onClick={()=>setOpen(!open)} alt=""
            />
            <div className="flex gap-x-4 items-center">
                <img src=".../asset/controller.png" 
                classname={'cursor-pointer duration-500'} alt=""/>
                <h1 
                className={`text-orange origin-left font-medium text-x1 duration-300 ${!open && "scale-0"}`}>
                    Task Management
                </h1>
            </div>
            <ul className="pt-6">
                {Menus.map((menu, index)=>(
                    <li
                        key={index}
                        className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
                        ${menu.gap ? "mt-9" : "mt-2"} ${
                        index === 0 && "bg-light-white"
                        } `}
                        >
                        <img src={`.../asset/${menu.src}.png`} alt=""/>
                        <span className={`${!open && "hidden"} origin-left duration-200`}>
                            {menu.title}
                        </span>
                    </li>
                ))}
            </ul>
            </div>
        </navbar>
     );
}
 
export default Navbar;