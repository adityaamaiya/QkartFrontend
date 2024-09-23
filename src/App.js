import Register from "./components/Register";
import { Route, Routes } from "react-router-dom"; // Updated to Routes
import Login from "./components/Login";
import Products from "./components/Products";
import Checkout from "./components/Checkout";
import Thanks from "./components/Thanks";

export const config = {
  endpoint: `https://qkartfrontend-zbs6.onrender.com/api/v1`,
};

function App() {
  return (
    <Routes> {/* Changed from Switch to Routes */}
      <Route path="/" element={<Products />} /> {/* Updated component syntax */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/thanks" element={<Thanks />} />
    </Routes>
  );
}

export default App;
