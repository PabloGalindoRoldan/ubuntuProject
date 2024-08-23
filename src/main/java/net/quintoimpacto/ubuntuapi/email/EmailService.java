package net.quintoimpacto.ubuntuapi.email;

import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.Response;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Email;
import com.sendgrid.helpers.mail.objects.Personalization;
import net.quintoimpacto.ubuntuapi.dto.microbusinessDTO.MicroBusinessDTOEmail;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class EmailService {

    @Value("${sendgrid.api-key}")
    private String apiKey;

    public void sendWeeklyUpdateEmail(String toEmail, String templateId, List<MicroBusinessDTOEmail> newMicroBusinesses) throws IOException {
        Email from = new Email("ubuntuorganizationproyect@gmail.com");
        Email to = new Email(toEmail);
        Mail mail = new Mail();
        mail.setFrom(from);
        mail.setTemplateId(templateId);

        Personalization personalization = new Personalization();
        personalization.addTo(to);

        List<Map<String, String>> businessesData = new ArrayList<>();
        for (MicroBusinessDTOEmail mb : newMicroBusinesses) {
            Map<String, String> dynamicData = new HashMap<>();
            dynamicData.put("micro_business_name", mb.getName());
            dynamicData.put("description", mb.getDescription());
            dynamicData.put("more_information", mb.getMoreInformation());
            dynamicData.put("sub_title", mb.getSubTitle());
            businessesData.add(dynamicData);
        }
        personalization.addDynamicTemplateData("businesses", businessesData);
        personalization.addDynamicTemplateData("subject", "Actualizate con los nuevos Microemprendimientos");
        mail.addPersonalization(personalization);

        SendGrid sg = new SendGrid(apiKey);
        Request request = new Request();
        try {
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());
            Response response = sg.api(request);
            System.out.println(response.getStatusCode());
            System.out.println(response.getBody());
            System.out.println(response.getHeaders());
        } catch (IOException ex) {
            throw ex;
        }
    }
}
