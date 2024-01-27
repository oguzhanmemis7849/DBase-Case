import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/main";
import Home from "./pages/Home";
import Sports from "./pages/Sports";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sports" element={<Sports />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
