import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Businesses from "./pages/Businesses";
import BusinessDetails from "./pages/BusinessDetails";
import AddBusiness from "./pages/AddBusiness";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <BrowserRouter basename="/Ashraya_Business_Hub">
      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/businesses"
          element={<Businesses />}
        />

        <Route
          path="/business/:id"
          element={<BusinessDetails />}
        />

        <Route
          path="/add-business"
          element={<AddBusiness />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/reset-password/:token"
          element={<ResetPassword />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
