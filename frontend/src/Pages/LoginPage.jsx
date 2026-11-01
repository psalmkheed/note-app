import { useState } from "react";
import Navbar from "../Components/Navbar";
import { Link, useNavigate } from "react-router";
import { NotebookIcon } from "lucide-react";
import toast from "react-hot-toast";
import api from "../lib/axios";

const LoginPage = () => {
      const [username, setUsername] = useState("");
      const [password, setPassword] = useState("");
      const [loading, setLoading] = useState(false);

      const navigate = useNavigate();

      const handleSubmit = async (e) => {
            e.preventDefault();

            if (!username.trim() || !password.trim()) {
                  toast.error("All fields are required")
            }
            setLoading(true)
            try {
                  const res = await api.post("/users/auth/login", {
                        username: username.toLowerCase(),
                        password: password
                  })

                  localStorage.setItem("userId", res.data.userId);
                  localStorage.setItem("token", res.data.token);

                  toast.success(res.data.message);

                  navigate("/dashboard");

            } catch (error) {
                  toast.error(error.response.data.message || "Login failed. Please try again.")
            } finally {
                  setLoading(false)
            }

      }

      return (
                  <div className="min-h-screen container">
                        <Navbar />
                        <div className="flex items-center justify-center h-[88vh] w-full">
                              <div className="card bg-base-200 p-4 w-100">
                                    <div className="mx-auto flex flex-col gap-1 items-center mb-4">
                                          <div className="bg-primary/10 rounded-full p-4">
                                                <NotebookIcon className="size-8 text-primary" />
                                          </div>
                                          <h2 className="card-title text-success text-2xl font-mono ">Login</h2>
                                          <p className="text-base-content text-sm">Login to access your dashboard</p>
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                          <div className="flex flex-col gap-2 mb-4">
                                                <label className="label">
                                                      <span className="label-text">
                                                            Username
                                                      </span>
                                                </label>
                                                <input type="text"
                                                      placeholder="Enter your username"
                                                      className="input input-bordered w-full"
                                                      value={username}
                                                      onChange={(e) => setUsername(e.target.value)}
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
                                                      value={password}
                                                      onChange={(e) => setPassword(e.target.value)}
                                                />
                                          </div>

                                          <div className="card-actions">
                                                <button type="submit" className=" w-full btn btn-primary" disabled={loading}>
                                                      {loading ? "Loging in..." : "Login"}
                                                </button>
                                          </div>
                                    </form>
                                    <div className="text-center mt-4">
                                          <p className="text-sm">Don't have an account? <Link to={"/auth/register"} className="text-success font-bold">Register</Link></p>
                                    </div>

                              </div>
                        </div>
                  </div>
      )
}

export default LoginPage