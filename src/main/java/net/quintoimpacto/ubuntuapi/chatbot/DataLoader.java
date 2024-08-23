package net.quintoimpacto.ubuntuapi.chatbot;

import net.quintoimpacto.ubuntuapi.chatbot.entity.Answer;
import net.quintoimpacto.ubuntuapi.chatbot.entity.Question;
import net.quintoimpacto.ubuntuapi.chatbot.entity.enums.Hierarchy;
import net.quintoimpacto.ubuntuapi.chatbot.repository.IAnswerRepository;
import net.quintoimpacto.ubuntuapi.chatbot.repository.IQuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private IQuestionRepository questionRepository;

    @Autowired
    private IAnswerRepository answerRepository;

    @Override
    public void run(String... args) throws Exception {

        // Categoria Contactos
        // Crear preguntas y respuestas
        Question question1 = new Question();
        question1.setQuestionText("¿Cómo puedo contactar a los emprendedores?");
        question1.setHierarchy(Hierarchy.CONTACT);
        question1.setActive(true);

        Answer answer1 = new Answer();
        answer1.setAnswerText("Puedes contactar a los emprendedores a través de nuestro formulario de contacto.");
        answer1.setActive(true);
        answer1.setQuestion(question1);

        // Crear subpreguntas y subrespuestas
        Question subQuestion1 = new Question();
        subQuestion1.setQuestionText("¿Los emprendedores responden rápidamente?");
        subQuestion1.setHierarchy(Hierarchy.GENERAL);
        subQuestion1.setActive(true);
        subQuestion1.setParentQuestion(question1);

        Answer subAnswer1 = new Answer();
        subAnswer1.setAnswerText("La mayoría de los emprendedores responden dentro de las 48 horas.");
        subAnswer1.setActive(true);
        subAnswer1.setQuestion(subQuestion1);
        subQuestion1.setActive(true);

        subQuestion1.setAnswers(List.of(subAnswer1));

        Answer subAnswer2 = new Answer();
        subAnswer2.setAnswerText("Para asegurarte de recibir una respuesta rápida, proporciona detalles claros en tu mensaje.");
        subAnswer2.setActive(true);
        subAnswer2.setParentAnswer(subAnswer1);
        subAnswer2.setActive(true);

        subAnswer1.setSubAnswers(List.of(subAnswer2));

        // Establecer las relaciones
        question1.setAnswers(List.of(answer1));
        question1.setSubQuestions(List.of(subQuestion1));

        // Guardar en la base de datos
        questionRepository.save(question1);

        // Categoria Sumar su emprendimiento
        // Crear preguntas y respuestas
        Question question2 = new Question();
        question2.setQuestionText("¿Cómo sumar mi emprendimiento a Ubuntu?");
        question2.setHierarchy(Hierarchy.ADD_MICROBUSINESS);
        question2.setActive(true);

        Answer answer2 = new Answer();
        answer2.setAnswerText("Para sumar tu emprendimiento a Ubuntu, completa el formulario de inscripción.");
        answer2.setActive(true);
        answer2.setQuestion(question2);

        // Crear subpreguntas y subrespuestas
        Question subQuestion2 = new Question();
        subQuestion2.setQuestionText("¿Qué requisitos debo cumplir para que mi emprendimiento sea aceptado?");
        subQuestion2.setHierarchy(Hierarchy.ADD_MICROBUSINESS);
        subQuestion2.setActive(true);
        subQuestion2.setParentQuestion(question2);

        Answer subAnswer3 = new Answer();
        subAnswer3.setAnswerText("Tu emprendimiento debe ser un negocio activo y cumplir con las normativas locales de tu país.");
        subAnswer3.setActive(true);
        subAnswer3.setQuestion(subQuestion2);

        subQuestion2.setAnswers(List.of(subAnswer3));

        Answer subAnswer4 = new Answer();
        subAnswer4.setAnswerText("Para más detalles, consulta nuestras guías específicas para cada país.");
        subAnswer4.setActive(true);
        subAnswer4.setParentAnswer(subAnswer3);

        subAnswer3.setSubAnswers(List.of(subAnswer4));

        // Establecer las relaciones
        question2.setAnswers(List.of(answer2));
        question2.setSubQuestions(List.of(subQuestion2));

        // Guardar en la base de datos
        questionRepository.save(question2);

        // Categoria Costos
        // Crear preguntas y respuestas
        Question question3 = new Question();
        question3.setQuestionText("¿Cuáles son los costos de participar en Ubuntu?");
        question3.setHierarchy(Hierarchy.COSTS);
        question3.setActive(true);

        Answer answer3 = new Answer();
        answer3.setAnswerText("La participación en Ubuntu es gratuita.");
        answer3.setActive(true);
        answer3.setQuestion(question3);

        // Crear subpreguntas y subrespuestas
        Question subQuestion3 = new Question();
        subQuestion3.setQuestionText("¿Existen costos adicionales para recibir soporte o servicios adicionales?");
        subQuestion3.setHierarchy(Hierarchy.COSTS);
        subQuestion3.setActive(true);
        subQuestion3.setParentQuestion(question3);

        Answer subAnswer5 = new Answer();
        subAnswer5.setAnswerText("No, todos los servicios básicos y el soporte son gratuitos. Sin embargo, algunos servicios premium pueden tener un costo adicional.");
        subAnswer5.setActive(true);
        subAnswer5.setQuestion(subQuestion3);

        subQuestion3.setAnswers(List.of(subAnswer5));

        Answer subAnswer6 = new Answer();
        subAnswer6.setAnswerText("Puedes consultar la sección de precios en nuestro sitio web para más información sobre los servicios premium.");
        subAnswer6.setActive(true);
        subAnswer6.setParentAnswer(subAnswer5);

        subAnswer5.setSubAnswers(List.of(subAnswer6));

        // Establecer las relaciones
        question3.setAnswers(List.of(answer3));
        question3.setSubQuestions(List.of(subQuestion3));

        // Guardar en la base de datos
        questionRepository.save(question3);
    }
}
