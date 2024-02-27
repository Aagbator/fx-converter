import {
  Route,
  Routes,
  BrowserRouter
} from "react-router-dom";
import "./App.css";
import { Layout } from "./hoc/Layout/Layout";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<></>} />
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
