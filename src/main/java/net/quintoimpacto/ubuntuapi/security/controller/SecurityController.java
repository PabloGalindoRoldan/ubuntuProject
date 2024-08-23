package net.quintoimpacto.ubuntuapi.security.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class SecurityController {

    
    @GetMapping("/user")
    public String user() {
        return "Hello world";
    }

    @GetMapping("/admin")
    public String admin() {
        return "Hello world Admin";
    }

}
