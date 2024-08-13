package net.quintoimpacto.ubuntuapi.chatbot;

import net.quintoimpacto.ubuntuapi.chatbot.entity.Answer;
import net.quintoimpacto.ubuntuapi.chatbot.entity.Question;
import net.quintoimpacto.ubuntuapi.chatbot.enums.Hierarchy;
import net.quintoimpacto.ubuntuapi.chatbot.repository.IAnswerRepository;
import net.quintoimpacto.ubuntuapi.chatbot.repository.IQuestionRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class DataLoader {

    @Bean
    public CommandLineRunner loadData(IQuestionRepository questionRepository, IAnswerRepository answerRepository) {
        return args -> {
            // Crear preguntas iniciales
            Question contactQuestion = new Question();
            contactQuestion.setQuestionText(Hierarchy.CONTACT.getDescription());
            contactQuestion.setHierarchy(Hierarchy.CONTACT);
            contactQuestion.setActive(true);
            contactQuestion.setInitial(true);

            Question addMicrobusinessQuestion = new Question();
            addMicrobusinessQuestion.setQuestionText(Hierarchy.ADD_MICROBUSINESS.getDescription());
            addMicrobusinessQuestion.setHierarchy(Hierarchy.ADD_MICROBUSINESS);
            addMicrobusinessQuestion.setActive(true);
            addMicrobusinessQuestion.setInitial(true);

            Question costsQuestion = new Question();
            costsQuestion.setQuestionText(Hierarchy.COSTS.getDescription());
            costsQuestion.setHierarchy(Hierarchy.COSTS);
            costsQuestion.setActive(true);
            costsQuestion.setInitial(true);

            questionRepository.saveAll(Arrays.asList(contactQuestion, addMicrobusinessQuestion, costsQuestion));

            // Crear respuestas y subpreguntas para "CONTACT"
            Answer contactAnswer = new Answer();
            contactAnswer.setAnswerText("Puedes contactar a los emprendedores a través de la sección de contacto en nuestra web.");
            contactAnswer.setParentQuestion(contactQuestion);

            Question contactSubQuestion = new Question();
            contactSubQuestion.setQuestionText("¿Hay algún costo asociado al contacto?");
            contactSubQuestion.setHierarchy(Hierarchy.CONTACT);
            contactSubQuestion.setActive(true);
            contactSubQuestion.setInitial(false);
            contactSubQuestion.setParentAnswer(contactAnswer);

            contactAnswer.setSubQuestions(Arrays.asList(contactSubQuestion));
            answerRepository.save(contactAnswer);

            // Crear respuestas y subpreguntas para "ADD_MICROBUSINESS"
            Answer addMicrobusinessAnswer = new Answer();
            addMicrobusinessAnswer.setAnswerText("Para sumar tu emprendimiento, completa el formulario en la sección 'Sumar Emprendimiento'.");
            addMicrobusinessAnswer.setParentQuestion(addMicrobusinessQuestion);

            Question addMicrobusinessSubQuestion = new Question();
            addMicrobusinessSubQuestion.setQuestionText("¿Qué información necesito proporcionar?");
            addMicrobusinessSubQuestion.setHierarchy(Hierarchy.ADD_MICROBUSINESS);
            addMicrobusinessSubQuestion.setActive(true);
            addMicrobusinessSubQuestion.setInitial(false);
            addMicrobusinessSubQuestion.setParentAnswer(addMicrobusinessAnswer);

            addMicrobusinessAnswer.setSubQuestions(Arrays.asList(addMicrobusinessSubQuestion));
            answerRepository.save(addMicrobusinessAnswer);

            // Crear respuestas y subpreguntas para "COSTS"
            Answer costsAnswer = new Answer();
            costsAnswer.setAnswerText("Participar en Ubuntu es gratuito, pero hay costos opcionales para servicios adicionales.");
            costsAnswer.setParentQuestion(costsQuestion);

            Question costsSubQuestion = new Question();
            costsSubQuestion.setQuestionText("¿Cuáles son los servicios adicionales?");
            costsSubQuestion.setHierarchy(Hierarchy.COSTS);
            costsSubQuestion.setActive(true);
            costsSubQuestion.setInitial(false);
            costsSubQuestion.setParentAnswer(costsAnswer);

            costsAnswer.setSubQuestions(Arrays.asList(costsSubQuestion));
            answerRepository.save(costsAnswer);
        };
    }
}
