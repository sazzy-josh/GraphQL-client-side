import { NavLink } from "react-router-dom"



const Navbar = () => {
  return (
  <div className="w-full h-auto py-8 flex justify-center items-center gap-x-4">
    <div>
     <NavLink to={'/'}
      className={({ isActive }) => ( isActive ? 'font-bold text-blue-500 underline' : "" )}
     >
       Home
     </NavLink>
    </div>

    <div>
     <NavLink to={'/newLink'}
      className={({ isActive }) => ( isActive ? 'font-bold text-blue-500 underline' : "" )}
     >
       Create Link
     </NavLink>
    </div>

    <div>
     <NavLink to={'/login'}
      className={({ isActive }) => ( isActive ? 'font-bold text-blue-500 underline' : "")}
     >
       Login
     </NavLink>
    </div>
  </div>
  )
}

export default Navbar