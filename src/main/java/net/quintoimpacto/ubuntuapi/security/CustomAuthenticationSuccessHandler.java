package net.quintoimpacto.ubuntuapi.security;

import java.io.IOException;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import net.quintoimpacto.ubuntuapi.entity.User;
import net.quintoimpacto.ubuntuapi.service.IUserService;

@Component
public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    @Value("${SECRET_KEY}")
    private String secretKey;

    @Value("${FRONTEND_URL}")
    private String frontendUrl;

    @Value("${FRONTEND_URL_UNAUTHORIZED}")
    private String frontendUrlUnauthorized;

    @Autowired
    private IUserService userService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        OidcUser oidcUser = (OidcUser) authentication.getPrincipal();
        String email = oidcUser.getEmail();

        User user = userService.findUserByEmail(email);

        if (user != null) {
            String token = Jwts.builder()
                    .setSubject(email)
                    .claim("id", user.getId())
                    .claim("first_name", user.getFirst_name())
                    .claim("last_name", user.getLast_name())
                    .claim("role", user.getRole())
                    .setIssuedAt(new Date())
                    .setExpiration(new Date(System.currentTimeMillis() + 3600000)) // 1 hora
                    .signWith(SignatureAlgorithm.HS512, secretKey)
                    .compact();
                    response.sendRedirect(frontendUrl + "/?token=" + token);
                    // response.setContentType("application/json");
                    // response.setCharacterEncoding("UTF-8");
                    // response.getWriter().write("{\"token\": \"" + token + "\"}");
        } else {
            response.sendRedirect(frontendUrlUnauthorized);
        }
    }
}