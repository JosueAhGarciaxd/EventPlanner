import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome.jsx";
import Home from "./pages/Home.jsx";
import NotFound from "./pages/PageNotFound.jsx";
// ESTO ES PARA MAS TARDE import Users from "./pages/Users";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/home" element={<Home />} />
          {/**  <Route path="/users/:id?" element={<Users />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster
          position="top-right"
          toastOptions={{
            className: "bg-gray-800 text-white",
            duration: 3000,
            style: {
              fontSize: "16px",
            },
          }}
        />
      </Router>
    </>
  );
}

export default App;
