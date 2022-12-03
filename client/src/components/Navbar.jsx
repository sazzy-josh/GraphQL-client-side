import { NavLink , useNavigate} from "react-router-dom"
import { AUTH_TOKEN } from "../constants"


const Navbar = () => {
  const navigate = useNavigate()
 const AuthToken = localStorage.getItem(AUTH_TOKEN)

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
     {!AuthToken ? <NavLink to={'/login'}
      className={({ isActive }) => ( isActive ? 'font-bold text-blue-500 underline' : "")}
     >
       Login
     </NavLink> : <span
         className="cursor-pointer"
         onClick={() => {
         localStorage.removeItem(AUTH_TOKEN);
         navigate("/")
     } }>Logout </span> }
    </div>
  </div>
  )
}

export default Navbar