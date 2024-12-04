import "../src/dist/styles.css";
import Home from "./Pages/Home";
import Models from "./Pages/Models";
import SignIn from "./Pages/SignIn";
import Compare from "./Pages/Compare";
import Register from "./Pages/Register";
import Navbar from "../src/components/Navbar";
import { Route, Routes } from "react-router-dom";
import Transactions from "./Pages/Transactions";

function App() {
  return (
    <div style={{ position: "relative" }}>
      <Navbar />
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="models" element={<Models />} />
        <Route path="compare" element={<Compare />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
