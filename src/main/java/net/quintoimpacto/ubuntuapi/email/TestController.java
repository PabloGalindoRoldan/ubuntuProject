package net.quintoimpacto.ubuntuapi.email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
public class TestController {

    @Autowired
    private WeeklyEmailScheduler weeklyEmailScheduler;

    @PostMapping("/sendWeeklyEmails")
    public ResponseEntity<String> triggerWeeklyEmails() {
        try {
            weeklyEmailScheduler.sendWeeklyEmails();
            return ResponseEntity.ok("Emails enviados correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al enviar correos: " + e.getMessage());
        }
    }
}