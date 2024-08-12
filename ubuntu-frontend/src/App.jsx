import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ViewMicroEmprendimientos from "./components/view/microEmprendimientos/ViewMicroEmprendimientos";
import LandingPage from "./components/view/landing/LandingPage";
import ViewPublicaciones from "./components/view/publicaciones/ViewPublicaciones";
import SearchResults from "./components/view/searchResults/SearchResults";
import Login from "./components/view/login/Login";
import { SearchProvider } from "./components/shared/searchContext/SearchContext";
import { GoogleOAuthProvider } from '@react-oauth/google'; 
import Navbar from "./components/navbar/Navbar";
import { AuthProvider } from "./token/auth/AuthProvider";
import Microemprendimiento from "./components/view/admin/microemprendimiento/Microemprendimiento";
import LoginSuccess from "./components/view/loginSuccess/LoginSucess";
import Unauthorized from "./components/view/unauthorized/Unauthorized";
import Error from "./components/view/404/404";
import SolicitudContacto from "./components/view/admin/solicitudContacto/SolicitudContacto";
import Dashboard from  "./components/view/admin/dashboard/Dashboard";
import UserContact from "./components/view/contact/UserContact";
import CargarMicroemprendimiento from "./components/view/admin/microemprendimiento/CargarMicroemprendimiento";
import EditarMicroemprendimiento from "./components/view/admin/microemprendimiento/EditarMicroemprendimiento";
import ProtectedRoute from "./token/rutes/ProtectedRoutes";

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <SearchProvider>
          <Router>
            <div>
              <Navbar />
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/microemprendimientos" element={<ViewMicroEmprendimientos />} />
                <Route path="/acceder" element={<Login />} />
                <Route path="/loginsuccess" element={<LoginSuccess />} />
                <Route path="/unauthorized" element={<Unauthorized />} />
                <Route path="/publicaciones" element={<ViewPublicaciones />} />
                <Route path="/contacto/:id" element={<UserContact />} />
                <Route path="/buscar" element={<SearchResults />} />
                <Route path="/admin/microemprendimientos" element={
                  <ProtectedRoute roles={['ADMIN']} element={<Microemprendimiento />} />
                } />
                <Route path="/admin/microemprendimientos/cargar" element={
                  <ProtectedRoute roles={['ADMIN']} element={<CargarMicroemprendimiento />} />
                } />
                <Route path="/admin/microemprendimientos/editar" element={
                  <ProtectedRoute roles={['ADMIN']} element={<EditarMicroemprendimiento />} />
                } />
                <Route path="/admin/solicitudes" element={
                  <ProtectedRoute roles={['ADMIN']} element={<SolicitudContacto />} />
                } />
                <Route path="/admin/dashboard" element={
                  <ProtectedRoute roles={['ADMIN']} element={<Dashboard />} />
                } />
                <Route path="/admin/publicaciones" element={
                  <ProtectedRoute roles={['ADMIN']} element={<div> En desarrollo </div>} />
                } />
                <Route path="/*" element={<Error />} />
              </Routes>
            </div>
          </Router>
        </SearchProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;