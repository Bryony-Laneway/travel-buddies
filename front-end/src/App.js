// import { BrowserRouter } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Past from "./pages/Past";
import UpdateProfile from "./pages/Profile";
// import { MyHeader } from "./components/header";
// import Login from "./components/Login";

var loggin = true;
//condition needs to be inside a function. If the if/else statement is not inside a function, it won't work.
function LogIn() {
  if (loggin) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route exact path="/Past" element={<Past />} />
            <Route exact path="/Profile" element={<UpdateProfile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  } else {
    return (
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route exact path="/SignUp" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default function App() {
  return <div className="App">{LogIn()}</div>;
}

// export default function App() {
//   return <div className="App">{LogIn()}</div>;
// }

// function App() {
//   return (
//     <div className="App">
//       <MyHeader />
//     </div>
//   );
// }

// export default App;
