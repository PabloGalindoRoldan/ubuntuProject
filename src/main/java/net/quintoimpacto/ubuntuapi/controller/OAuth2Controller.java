package net.quintoimpacto.ubuntuapi.controller;

import net.quintoimpacto.ubuntuapi.security.jwt.OAuth2TokenResponse;
import net.quintoimpacto.ubuntuapi.service.serviceImpl.UserAuthImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/login/oauth2")
public class OAuth2Controller {

    private final UserAuthImpl userAuthImpl;

    @Autowired
    public OAuth2Controller(UserAuthImpl userAuthImpl) {
        this.userAuthImpl = userAuthImpl;
    }

    @PostMapping("/google")
    public ResponseEntity<Map<String, Object>> authenticateUser(@RequestParam Map<String, String> request) {
        String code = request.get("code");
        if (code == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "Missing code parameter"));
        }
        try {
            OAuth2TokenResponse tokenResponse = userAuthImpl.getGoogleOauth2AccessToken(code).block();
            if (tokenResponse != null && tokenResponse.getId_token() != null) {
                Map<String, Object> authResponse = userAuthImpl.authUser("Bearer " + tokenResponse.getId_token());
                return ResponseEntity.ok(authResponse);
            } else {
                throw new IllegalArgumentException("Invalid token response");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Authentication failed", "message", e.getMessage()));
        }
    }
}
