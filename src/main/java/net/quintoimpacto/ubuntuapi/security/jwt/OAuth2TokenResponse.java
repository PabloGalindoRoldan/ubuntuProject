package net.quintoimpacto.ubuntuapi.security.jwt;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OAuth2TokenResponse {
    private String access_token;
    private String token_type;
    private String expires_in;
    private String refresh_token;
    private String id_token;
    private String scope;
    private String error;
    private String error_description;

}
