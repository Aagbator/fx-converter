import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import { Layout } from "./hoc/Layout/Layout";
import Home from "./pages/home/Home";
import { ConverterProvider } from "./contexts/Converter.context";
import Details from "./pages/details/Details";

function App() {
  return (
    <div className="App">
      <ConverterProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home></Home>} />
              <Route path="/details" element={<Details />} />
              <Route path="*" element={<></>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ConverterProvider>
    </div>
  );
}

export default App;
