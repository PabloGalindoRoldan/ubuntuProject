package net.quintoimpacto.ubuntuapi.service;

import net.quintoimpacto.ubuntuapi.security.jwt.OAuth2TokenResponse;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Map;
import reactor.core.publisher.Mono;

public interface IUserAuthService {
    Map<String, Object> authUser(String authHeader) throws GeneralSecurityException, IOException;
    Mono<OAuth2TokenResponse> getGoogleOauth2AccessToken(String authorizationCode);
}