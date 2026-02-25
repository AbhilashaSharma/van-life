import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Vans from "./pages/Van/Vans.jsx";
import VansDetails from "./pages/Van/VansDetails.jsx";
import Dashboard from "./pages/Host/Dashboard.jsx";
import Layout from "./components/Layout.jsx";
import Income from "./pages/Host/Income.jsx";
import Reviews from "./pages/Host/Reviews.jsx";
import "./server.js";
import HostLayout from "./pages/Host/HostLayout.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="vans" element={<Vans />} />
          <Route path="vans/:id" element={<VansDetails />} />

          <Route path="host" element={<HostLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="income" element={<Income />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
