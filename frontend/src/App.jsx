import { Route, Routes } from "react-router"
import HomePage from "./Pages/HomePage"
import CreatePage from "./Pages/CreatePage"
import NoteDetailsPage from "./Pages/NoteDetailsPage"
import LoginPage from "./Pages/LoginPage"
import RegisterPage from "./Pages/RegisterPage"
import Dashboard from "./Pages/Dashboard"
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";

const App = () => {
  return (
    <div className="relative w-full h-full">
      <div className="pointer-events-none absolute inset-0 -z-10 h-full w-full px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]" />
      <Routes>
        <Route element={<GuestRoute/>}>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/register" element={<RegisterPage />} />
        </Route>
        
        <Route element={<ProtectedRoute/>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/create/:id" element={<CreatePage />} />
            <Route path="/dashboard/note/:id" element={<NoteDetailsPage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App