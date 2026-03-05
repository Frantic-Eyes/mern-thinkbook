import { useEffect } from "react";
import { Route, Routes } from "react-router";
import { HomePage } from "./Pages/HomePage";
import { CreatePage } from "./Pages/CreatePage";
import { NoteDetailPage } from "./Pages/NoteDetailPage";
import { Navbar } from "./components/Navbar/Navbar";

export const App = () => {
  // useEffect(() => {
  //   const savedTheme = localStorage.getItem("theme") || "default";
  //   document.documentElement.setAttribute("data-theme", savedTheme);
  // }, []);
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
      </Routes>
    </div>
  );
};
