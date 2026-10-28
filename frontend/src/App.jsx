import { Route, Routes } from "react-router"
import HomePage from "./Pages/HomePage"
import CreatePage from "./Pages/CreatePage"
import NoteDetailsPage from "./Pages/NoteDetailsPage"
const App = () => {
  return (
    <div className="relative w-full h-full">
      <div className="pointer-events-none absolute inset-0 -z-10 h-full w-full px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailsPage />} />
      </Routes>
    </div>
  )
}

export default App