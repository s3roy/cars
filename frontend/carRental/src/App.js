import "../src/dist/styles.css";
import Home from "./Pages/Home";
import Models from "./Pages/Models";
import SignIn from "./Pages/SignIn";
import Register from "./Pages/Register";
import Navbar from "../src/components/Navbar";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div style={{ position: "relative" }}>
      <Navbar />
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="models" element={<Models />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
