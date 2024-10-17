// import { BrowserRouter } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
// import { MyHeader } from "./components/header";
import Login from "./components/Login";

var loggin = true;
//condition needs to be inside a function. If the if/else statement is not inside a function, it won't work.
function LogIn() {
  if (loggin) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />

            {/* <Route path="contact" element={<Contact />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    );
  } else {
    return <Login />;
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
