package net.quintoimpacto.ubuntuapi.chatbot.service.serviceImpl;

import net.quintoimpacto.ubuntuapi.chatbot.dto.AnswerDTO;
import net.quintoimpacto.ubuntuapi.chatbot.dto.QuestionDTO;
import net.quintoimpacto.ubuntuapi.chatbot.entity.Answer;
import net.quintoimpacto.ubuntuapi.chatbot.entity.Question;
import net.quintoimpacto.ubuntuapi.exception.ValidateIntegrity;
import net.quintoimpacto.ubuntuapi.chatbot.repository.IAnswerRepository;
import net.quintoimpacto.ubuntuapi.chatbot.repository.IQuestionRepository;
import net.quintoimpacto.ubuntuapi.chatbot.service.IAnswerService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AnswerImpl implements IAnswerService {

    @Autowired
    private IAnswerRepository answerRepository;

    @Autowired
    private IQuestionRepository questionRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public AnswerDTO create(AnswerDTO answerDTO) {
        Answer answer = modelMapper.map(answerDTO, Answer.class);

        // Asociar la pregunta padre si existe
        if (answerDTO.getParentQuestionId() != null) {
            Question parentQuestion = questionRepository.findById(answerDTO.getParentQuestionId())
                    .orElseThrow(() -> new ValidateIntegrity("Question not found with id " + answerDTO.getParentQuestionId()));
            answer.setParentQuestion(parentQuestion);
        }

        // Guardar la respuesta
        Answer savedAnswer = answerRepository.save(answer);

        // Manejar subpreguntas
        if (answerDTO.getSubQuestions() != null) {
            for (QuestionDTO subQuestionDTO : answerDTO.getSubQuestions()) {
                Question subQuestion = modelMapper.map(subQuestionDTO, Question.class);
                subQuestion.setParentAnswer(savedAnswer); // Establecer la respuesta padre
                savedAnswer.getSubQuestions().add(subQuestion); // Agregar subpregunta a la lista de subpreguntas de la respuesta
            }
            // Guardar la respuesta actualizada con subpreguntas
            answerRepository.save(savedAnswer);
        }

        return modelMapper.map(savedAnswer, AnswerDTO.class);
    }

    @Override
    public List<AnswerDTO> getAllAnswers() {
        List<Answer> answers= answerRepository.findAll();
        return answers.stream().map(answer -> modelMapper.map(answer, AnswerDTO.class))
                .collect(Collectors.toList());
    }
}
