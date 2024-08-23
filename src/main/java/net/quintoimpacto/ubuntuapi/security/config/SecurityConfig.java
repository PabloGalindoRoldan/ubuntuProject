package net.quintoimpacto.ubuntuapi.security.config;

import net.quintoimpacto.ubuntuapi.security.CustomAuthenticationSuccessHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import net.quintoimpacto.ubuntuapi.security.jwt.JwtTokenAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

        private final JwtTokenAuthenticationFilter jwtTokenAuthenticationFilter;
        private final CustomAuthenticationSuccessHandler customAuthenticationSuccessHandler;

        @Autowired
        public SecurityConfig(JwtTokenAuthenticationFilter jwtTokenAuthenticationFilter,
                        CustomAuthenticationSuccessHandler customAuthenticationSuccessHandler) {
                this.jwtTokenAuthenticationFilter = jwtTokenAuthenticationFilter;
                this.customAuthenticationSuccessHandler = customAuthenticationSuccessHandler;
        }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http    .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(authorizeRequests ->
                        authorizeRequests
                                .requestMatchers("/", "/login/oauth2/**", "/error").permitAll()
                                .requestMatchers(HttpMethod.GET, "/countries", "/provinces", "/images", "images/{id}", "/microbusiness/findAll", "/microbusiness/", "microbusiness/{id}").permitAll()
                                .requestMatchers(HttpMethod.GET,  "/questions/all", "/questions/getQuestions/{questionId}", "/answers/all", "/answers/getAnswers/{questionId}", "/publications/getAllPublications", "/publications/getAllPublications/{id}").permitAll()
                                .requestMatchers(HttpMethod.POST, "/contact/").permitAll()
                                .requestMatchers("/contact/**").hasRole("ADMIN")
                                .requestMatchers("/user").hasRole("USER")
                                .requestMatchers("/admin").hasRole("ADMIN")
                                .requestMatchers("/microbusiness/**").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.POST, "/questions/create", "/questions/create/{parentQuestionId}/subquestion" ,"/answers/create").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.PUT, "/questions/update/{id}","/answers/update/{id}").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.DELETE, "/questions/delete/{id}", "/answers/delete/{id}").hasRole("ADMIN")
                                .anyRequest().authenticated()

                )
                .sessionManagement(session-> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .oauth2Login(oauth2 -> oauth2
                        .loginPage("/oauth2/authorization/google")
                        .defaultSuccessUrl("/user", true)
                        .successHandler(customAuthenticationSuccessHandler)
                )
                .logout(logout -> logout
                        .logoutSuccessUrl("/").permitAll()
                )
                .addFilterBefore(jwtTokenAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}