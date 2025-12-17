import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Register from "./components/Register";
import MyPets from "./components/MyPets";
import CreateEditPet from "./components/CreateEditPet";
import PetDetails from "./components/PetDetails";
import PrivateRoute from "./components/common/PrivateRoute/PrivateRoute";

import "bootstrap/dist/css/bootstrap.min.css";

import { AuthContextProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthContextProvider>
      <div id="container">
        <Header />

        <main id="site-content">
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/logout"
              element={
                <PrivateRoute>
                  <Logout />
                </PrivateRoute>
              }
            />
            <Route
              path="/my-pets"
              element={
                <PrivateRoute>
                  <MyPets />
                </PrivateRoute>
              }
            />
            <Route
              path="/create"
              element={
                <PrivateRoute>
                  <CreateEditPet />
                </PrivateRoute>
              }
            />
            <Route
              path="/pets/:petId"
              element={
                <PrivateRoute>
                  <PetDetails />
                </PrivateRoute>
              }
            />
            <Route
              path="/pets/edit/:petId"
              element={
                <PrivateRoute>
                  <CreateEditPet />
                </PrivateRoute>
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </AuthContextProvider>
  );
}

export default App;
