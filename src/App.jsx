import "./styles.css";

import { LoginVer2 } from "./LoginVer2/LoginVer2";

/*import { BrowserRouter as Router, Routes, Route } from "react-router-dom";*/

export default function App() {
  return (
    <div>
      <LoginVer2 />
    </div>
  );
}

/*
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={< LoginVer2 />} />
        <Route path="/detail" element={<Detail />} />
      </Routes>
    </Router>
  );
}
export default App;
*/
