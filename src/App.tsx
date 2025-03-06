import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Login from "./components/pages/auth/Login";
import Register from "./components/pages/auth/Register";
import User from './components/pages/user/User';
import { PrivateLogin } from "./components/views/PrivateLogin";
import { PrivateUser } from "./components/views/PrivateUser";

function App() {
  return (
    <>
      {/* Toast notification */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Navigation */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PrivateLogin element={<Login />} />}>
          </Route>
          <Route path="/login" element={<PrivateLogin element={<Login />} />}>
          </Route>
          <Route path="/register" element={<Register />}>
          </Route>
          <Route path="/user/*" element={<PrivateUser element={<User />} />}>
          </Route>
          {/* <Route path="*" element={<PrivateUser element={<NotFound/>} />}>
          </Route> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
