package net.quintoimpacto.ubuntuapi.security.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

//Este es tu filtro personalizado que maneja la autenticación basada en tokens JWT.
//Asegura que cada solicitud HTTP autenticada con un JWT pase primero por el filtro personalizado.
//Si el token es válido, el contexto de seguridad se establece antes de que otros filtros(como el de autenticación por nombre de usuario y contraseña) sean ejecutados.
@Component
public class JwtTokenAuthenticationFilter extends OncePerRequestFilter {

    @Value("${SECRET_KEY}")
    private String secretKeyConfig;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = request.getHeader("Authorization");
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
            try {
                Claims claims = getClaims(secretKeyConfig, token);
                String username = claims.getSubject();
                String rolesString = claims.get("role", String.class);
                List<GrantedAuthority> authorities = getAuthorities(rolesString);

                if (username != null) {
                    UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(username, null, authorities);
                    SecurityContextHolder.getContext().setAuthentication(auth);
                }
            } catch (Exception e) {
                SecurityContextHolder.clearContext();
            }
        }

        filterChain.doFilter(request, response);
    }

    private List<GrantedAuthority> getAuthorities(String rolesString) {
        return Arrays.stream(rolesString.split(","))
                .map(role -> new SimpleGrantedAuthority("ROLE_"+ role))
                .collect(Collectors.toList());
    }

    private Claims getClaims(String signingKey, String token) {
        return Jwts.parser()
                .setSigningKey(signingKey)
                .parseClaimsJws(token)
                .getBody();
    }
}