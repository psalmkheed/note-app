import { PlusIcon, LogOut } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router'
import toast from "react-hot-toast"
import api from "../lib/axios.js";
const Navbar = () => {
      const id  = localStorage.getItem("userId") || "{}";

      const navigate = useNavigate()

      const location = useLocation();

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
                              <Link to={"/"} className="text-3xl font-bold font-mono tracking-tight text-primary">MyNoteApp</Link>
                              {location.pathname === '/dashboard' ?
                                    <div className="flex items-center gap-2">
                                          <Link to={`/dashboard/create/${id}`} className="btn btn-primary">
                                                <PlusIcon className='size-5' />
                                                <span className='ml-2'>New Note</span>
                                          </Link>
                                          <button className="btn btn-error btn-outline" onClick={handleLogOut}>
                                                <LogOut className="size-5"/>
                                          </button>
                                    </div>
                                    : <div className="flex gap-1 items-center">
                                          <span className="size-2 rounded-full bg-success animate-pulse"></span>
                                          <h2 className="text-xl text-success font-mono"> Get Started</h2>
                                    </div>}

                        </div>
                  </div>
            </header>
      )
}

export default Navbar