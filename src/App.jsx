import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./components/style.css/"

import LoginLogout from "./components/LoginLogout";
import Homepage from "./components/Homepage";
import DataVisual from "./components/DataVisual";
import Anime from "./components/Anime"
import Manga from "./components/Manga"
import Novel from "./components/Novel"



function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<LoginLogout />} />
          <Route path="/anime" element={<Anime />} />
          <Route path="/manga" element={<Manga />} />"
          <Route path="/Light Novel" element={<Novel />} />
          <Route path="/data visualization" element={<DataVisual />} />
        </Routes>
      </Router>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
    </div>
  );
}

export default App;