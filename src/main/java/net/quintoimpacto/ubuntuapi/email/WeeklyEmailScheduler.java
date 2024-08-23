package net.quintoimpacto.ubuntuapi.email;

import net.quintoimpacto.ubuntuapi.dto.microbusinessDTO.MicroBusinessDTOEmail;
import net.quintoimpacto.ubuntuapi.entity.User;
import net.quintoimpacto.ubuntuapi.repository.IUserRepository;
import net.quintoimpacto.ubuntuapi.service.IMicroBusinessService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;

@Component
public class WeeklyEmailScheduler {

    @Autowired
    private EmailService emailService;

    @Autowired
    private IMicroBusinessService microBusinessService;

    @Autowired
    private IUserRepository userRepository;

    @Scheduled(cron = "0 0 10 * * MON") // Cada lunes a las 10:00 AM
    public void sendWeeklyEmails() {
        List<MicroBusinessDTOEmail> newMicroBusinesses = microBusinessService.getNewMicroBusinessesForTheWeek();

        try {
            // Envía el email a cada usuario registrado
            List<User> users = userRepository.findAllByDeletedFalse();
            for (User user : users) {
                emailService.sendWeeklyUpdateEmail(user.getEmail(), "d-7c0db16865e84e168c873a9af26e519b", newMicroBusinesses);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
