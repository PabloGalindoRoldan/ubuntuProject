package net.quintoimpacto.ubuntuapi.service.serviceImpl;

import net.quintoimpacto.ubuntuapi.security.jwt.OAuth2TokenResponse;
import net.quintoimpacto.ubuntuapi.security.jwt.TokenUtil;
import net.quintoimpacto.ubuntuapi.service.IUserAuthService;
import net.quintoimpacto.ubuntuapi.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.http.MediaType;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;

import net.quintoimpacto.ubuntuapi.entity.User;

import reactor.core.publisher.Mono;

@Service
public class UserAuthImpl implements IUserAuthService {

    @Autowired
    private TokenUtil tokenUtil;
    @Autowired
    private IUserService userService;

    private static final String GOOGLE_ISSUER = "https://accounts.google.com";

    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String clientId;
    @Value("${spring.security.oauth2.client.registration.google.client-secret}")
    private String clientSecret;

    @Override
    public Map<String, Object> authUser(String authHeader) throws GeneralSecurityException, IOException {
        var token = tokenUtil.extractTokenFromHeader(authHeader);
        var payload = validateGoogleTokenAndGetPayload(token);
        String email = payload.getEmail();
        User user = userService.findUserByEmail(email);

        if (user == null) {
            throw new RuntimeException("User not found");
        }

        Map<String, Object> responseBody = new HashMap<>();
        responseBody.put("token", tokenUtil.generateToken(user));
        responseBody.put("name", user.getFirst_name());
        responseBody.put("lastName", user.getLast_name());
        responseBody.put("email", user.getEmail());
        responseBody.put("role", user.getRole());
        responseBody.put("id", user.getId());
        return responseBody;
    }

    private GoogleIdToken.Payload validateGoogleTokenAndGetPayload(String token) throws GeneralSecurityException, IOException {
        GoogleIdTokenVerifier verifier = getVerifier();
        GoogleIdToken idToken = verifier.verify(token);

        if (idToken != null) {
            return idToken.getPayload();
        } else {
            throw new IllegalArgumentException("ID token is invalid.");
        }
    }

    private GoogleIdTokenVerifier getVerifier() {
        return new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), GsonFactory.getDefaultInstance())
                .setAudience(Collections.singletonList(clientId))
                .setIssuer(GOOGLE_ISSUER)
                .build();
    }

    @Override
    public Mono<OAuth2TokenResponse> getGoogleOauth2AccessToken(String authorizationCode) {
        WebClient webClient = WebClient.create();
        return webClient.post()
                .uri("https://oauth2.googleapis.com/token")
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .body(BodyInserters
                        .fromFormData("code", authorizationCode)
                        .with("client_id", clientId)
                        .with("client_secret", clientSecret)
                        .with("redirect_uri", "http://localhost:8080/login/oauth2/google")
                        .with("grant_type", "authorization_code"))
                .retrieve()
                .onStatus(status -> status.is4xxClientError() || status.is5xxServerError(),
                        response -> response.bodyToMono(OAuth2TokenResponse.class)
                                .flatMap(errorBody -> Mono.error(new RuntimeException("Error de respuesta: " + errorBody))))
                .bodyToMono(OAuth2TokenResponse.class);
    }
}
