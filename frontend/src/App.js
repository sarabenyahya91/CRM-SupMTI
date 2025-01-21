import { Routes, Route, useLocation } from "react-router-dom";
import Register from './pages/Register';
import Login from "./pages/Login";
import HomePage from "./pages/Home";
import Navbar from "./components/Navbar";
import ClientList from "./pages/Clients";
import ProtectedRoute from "./components/ProtectedRoute";
import AddClientPage from "./pages/AddClient";
import EditClientPage from "./pages/EditClient";

function App() {
  const location = useLocation();
  const isLandingPage = location.pathname === "/" || location.pathname === "/register" || location.pathname === "/login";
  return (
    <div className="flex flex-col min-h-screen">
      {!isLandingPage && <Navbar />}

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/clients"
          element={
            <ProtectedRoute>
              <ClientList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/clients/add"
          element={
            <ProtectedRoute>
              <AddClientPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/clients/edit/:id"
          element={
            <ProtectedRoute>
              <EditClientPage />
            </ProtectedRoute>
          }
        />

        <Route path="/" element={<HomePage />} />
      </Routes>

    </div>
  );
}

export default App;
