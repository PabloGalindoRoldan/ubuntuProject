import { Box } from "@mui/material";
import { useState } from "react";
import UseAuth from "../../token/jwt/UseAuth";
import { useNavigate } from "react-router-dom";

const ShowMyGoogleUserName = () => {
    const [showLogoutButton, setShowLogoutButton] = useState(false);
    const navigate = useNavigate();

    const handlePersonButtonClick = () => {
        setShowLogoutButton(!showLogoutButton);
    };

    const { user, logout } = UseAuth();

    if (!user) {
        return null;
    }

    const handleLogout = () => {
        logout();
        setShowLogoutButton(false);
        navigate('/');
    };

    const handlePerfil = () => {
        setShowLogoutButton(false);
        navigate('/admin/dashboard');
    };

    return (
        <Box className="nav__User" style={{ position: "relative" }}>
            <div className="show-datauser" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <button
                    className="button-person"
                    style={{
                        backgroundColor: "black",
                        border: "none",
                        color: "white",
                        padding: "4px",
                        cursor: "pointer",
                        width: "40px",
                        height: "40px",
                        borderRadius: "100px",
                        margin: "2px"
                    }}
                    onClick={handlePersonButtonClick}
                >
                    {user ? user.firstName.charAt(0).toUpperCase().concat(user.lastName.charAt(0).toUpperCase()) : user.username.charAt(0).toUpperCase().concat(user.username.charAt(1).toUpperCase())}
                </button>
                {showLogoutButton && (
                    <div
                        style={{
                            backgroundColor: "#D2D2D2",
                            textAlign: "center",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "0px 0px 4px 4px",
                            marginTop: "5px",
                            position: "absolute",
                            top: "50px",
                            padding: "30px",
                            right: "0px",
                            zIndex: "30",
                            gap: "10px",
                            width: "115px",
                            height: "50px",
                        }}
                        className="cerrar-sesion">
                        <button className="mi-perfil-button"
                            style={{
                                border: "none",
                                backgroundColor: "transparent",
                                color: "#090909",
                                width: "100px",
                                height: "40px",
                                cursor: "pointer",
                                fontWeight: "600",
                                fontSize: "14px",
                                fontFamily: "Nunito",
                            }}
                            onClick={handlePerfil}
                        >
                            Mi perfil
                        </button>
                        <button
                            onClick={handleLogout}
                            style={{
                                border: "none",
                                backgroundColor: "transparent",
                                color: "#090909",
                                width: "100px",
                                height: "40px",
                                cursor: "pointer",
                                fontWeight: "600",
                                fontSize: "14px",
                                fontFamily: "Nunito",
                            }}
                            className="cerrarS-button"
                        >
                            Cerrar sesión
                        </button>
                    </div>
                )}
            </div>
        </Box>
    );
};

export default ShowMyGoogleUserName;