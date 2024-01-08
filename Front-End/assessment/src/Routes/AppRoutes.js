import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllProducts from "../pages/AllProducts/AllProducts";
import Dashbaord from "../pages/Dashboard/Dashboard";
import ViewProduct from "../pages/ViewProduct/ViewProduct";
import Login from '../pages/Login/Login'

function AppRoutes() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
              index
              element={
                  <AllProducts />
              }
            />
            <Route
              path="/"
              element={
                  <AllProducts />
              }
            />
                        <Route
              path="/dashboard"
              element={
                  <Dashbaord />
              }
            />
            <Route
              path="/product/:id"
              element={
                  <ViewProduct />
              }
            />
            <Route
              path="/login"
              element={
                  <Login />
              }
            />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default AppRoutes;
