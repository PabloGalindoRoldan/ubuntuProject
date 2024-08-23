import Card from "@mui/material/Card";
import { Box } from "@mui/material";
import logoRegistro from "../../../assets/img/logo card ingreso registro.png";
import ButtonLogin from "./ButtonLogin";
import "./Login.css";

function Login() {

  const handleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/oauth2/authorization/google`;
  };

  return (
    <Box className="login__container">
      <Card className="login__container__card">
        <h2 className="login__container__card__titulo">Ingreso Administrador</h2>
        <Box className="login__container__card__logoContainer">
          <img src={logoRegistro} alt="logo registro" />
        </Box>
        <ButtonLogin onClick={handleLogin} />
      </Card>
    </Box>
  );
}

export default Login;