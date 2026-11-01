import { useState } from "react";
import { Link, useNavigate } from "react-router";
import Navbar from "../Components/Navbar";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { NotebookIcon } from "lucide-react";

const RegisterPage = () => {

      const [formData, setFormData] = useState({
            fullname: "",
            username: "",
            password: ""
      });

      const [loading, setLoading] = useState(false);

      const navigate = useNavigate();

      const handleSubmit = async (e) => {
            e.preventDefault();

            if (!formData.fullname.trim() || !formData.username.trim() || !formData.password.trim()) {
                  toast.error("All fields are required")
                  return
            }

            const nameParts = formData.fullname.trim().split(/\s+/);

            if (nameParts.length < 2 || nameParts[0] === "" || nameParts[1] === "") {
                  toast.error("Full name must include both a first and last name");
                  return;
            }
            if (formData.username.length < 3) {
                  toast.error("Username must be at least 3 characters")
                  return;
            }

            if (formData.password.length < 6) {
                  toast.error("Password must be atleast 6 characters")
                  return;
            }
            setLoading(true);
            try {
                  const res = await api.post("/users", {
                        ...formData
                  })

                  toast.success(res.data.message);
                  navigate("/auth/login")

            } catch (error) {
                  toast.error(error.response.data.message)
            } finally {
                  setLoading(false)
            }

      }

      return (
            <div className="min-h-screen container">
                  <Navbar />
                  <div className="flex items-center justify-center py-8 md:h-[88vh] w-full">
                        <div className="card bg-base-200 p-4 w-100">
                              <div className="mx-auto flex flex-col gap-1 items-center mb-4">
                                    <div className="bg-primary/10 rounded-full p-4">
                                          <NotebookIcon className="size-8 text-primary" />
                                    </div>
                                    <h2 className="card-title text-success text-2xl font-mono">Create Account</h2>
                                    <p className="text-base-content text-sm">Login to access your dashboard</p>
                              </div>
                              <form onSubmit={handleSubmit}>
                                    <div className="flex flex-col gap-2 mb-4">
                                          <label className="label">
                                                <span className="label-text">
                                                      Fullname
                                                </span>
                                          </label>
                                          <input type="text"
                                                placeholder="Enter your fullname"
                                                className="input input-bordered w-full"
                                                value={formData.fullname}
                                                onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                                          />
                                    </div>
                                    <div className="flex flex-col gap-2 mb-4">
                                          <label className="label">
                                                <span className="label-text">
                                                      Username
                                                </span>
                                          </label>
                                          <input type="text"
                                                placeholder="Enter your username"
                                                className="input input-bordered w-full"
                                                value={formData.username}
                                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                          />
                                    </div>
                                    <div className="flex flex-col gap-2 mb-4 w-full">
                                          <label className="label">
                                                <span className="label-text">
                                                      Password
                                                </span>
                                          </label>
                                          <input type="password"
                                                placeholder="********"
                                                className="input input-bordered w-full"
                                                value={formData.password}
                                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                          />
                                    </div>

                                    <div className="card-actions">
                                          <button type="submit" className=" w-full btn btn-primary font-bold" disabled={loading}>
                                                {loading ? "Creating Account..." : "Register"}
                                          </button>
                                    </div>
                              </form>
                              <div className="text-center mt-4">
                                    <p className="text-sm">Already have an account? <Link to={"/auth/login"} className="text-success font-bold">Login</Link></p>
                              </div>
                        </div>
                  </div>
            </div>
      )
}

export default RegisterPage