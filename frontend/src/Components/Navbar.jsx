import { PlusIcon, LogOut } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router'
import toast from "react-hot-toast"
import api from "../lib/axios.js";
const Navbar = () => {
      const id  = localStorage.getItem("userId") || "{}";

      const navigate = useNavigate()
      const location = useLocation();

      // Logout button handler
      const handleLogOut = async (e) => {
            e.preventDefault();

            if(!window.confirm("Are you sure you want to logout?")) return;
            try {
                 const res = await api.post("/users/auth/logout"); 
                 toast.success(res.data.message);

            } catch (error) {
                  toast.error(error.response?.data?.message ||"An error occured. Please try again");
            } finally {
                  localStorage.removeItem("userId");
        localStorage.removeItem("token");

        navigate("/auth/login", { replace: true });
            }
      }
      return (
            <header className="bg-base-300 border-b border-base-content/10 sticky z-100 top-0">
                  <div className="mx-auto max-w-6xl p-4">
                        <div className="flex items-center justify-between">
                              <Link to={"/"} className="md:text-3xl text-2xl font-bold font-mono tracking-tight text-primary">MyNoteApp</Link> {location.pathname === "/" ? <a href="#hero" className="btn btn-primary text-base-100 font-mono">Get Started </a>
                               : 
                              location.pathname === '/dashboard' ?
                                    <div className="flex items-center gap-2">
                                          <Link to={`/dashboard/create/${id}`} className="btn btn-primary">
                                                <PlusIcon className='size-5' />
                                                <span className='md:block hidden'>New Note</span>
                                          </Link>
                                          <button className="btn btn-error btn-outline" onClick={handleLogOut}>
                                                <LogOut className="size-5"/>
                                          </button>
                                    </div>
                                    : (location.pathname !== '/auth/login' ? <div className="flex gap-1 items-center">
                                          <Link to={"/auth/login"} className="btn btn-primary text-base-100 font-mono"><span className="size-2 rounded-full bg-success-content animate-pulse"></span> Login</Link>
                                    </div> : <div className="">
                                    
                                      <Link to={"/auth/register"} className="btn btn-primary text-base-100 font-mono"><span className="size-2 rounded-full bg-success-content animate-pulse"></span> Register</Link>
                                    </div> )
}

                        </div>
                  </div>
            </header>
      )
}

export default Navbar