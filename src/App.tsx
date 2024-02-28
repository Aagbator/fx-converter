import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import { Layout } from "./hoc/Layout/Layout";
import Home from "./pages/home/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home></Home>} />
            <Route path="/euro-usd-details" element={<></>} />
            <Route path="/euro-gbp-details" element={<></>} />
            <Route path="*" element={<></>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
