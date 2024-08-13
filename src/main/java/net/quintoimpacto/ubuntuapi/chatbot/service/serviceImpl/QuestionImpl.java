package net.quintoimpacto.ubuntuapi.chatbot.service.serviceImpl;

import net.quintoimpacto.ubuntuapi.chatbot.dto.QuestionDTO;
import net.quintoimpacto.ubuntuapi.chatbot.entity.Answer;
import net.quintoimpacto.ubuntuapi.chatbot.entity.Question;
import net.quintoimpacto.ubuntuapi.chatbot.enums.Hierarchy;
import net.quintoimpacto.ubuntuapi.exception.ValidateIntegrity;
import net.quintoimpacto.ubuntuapi.chatbot.mapper.QuestionMapper;
import net.quintoimpacto.ubuntuapi.chatbot.repository.IAnswerRepository;
import net.quintoimpacto.ubuntuapi.chatbot.repository.IQuestionRepository;
import net.quintoimpacto.ubuntuapi.chatbot.service.IQuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class QuestionImpl implements IQuestionService {

    @Autowired
    private IQuestionRepository questionRepository;

    @Autowired
    private IAnswerRepository answerRepository;

    @Autowired
    private QuestionMapper questionMapper;

    @Override
    public QuestionDTO create(QuestionDTO questionDTO) {
        Question question= questionMapper.questionDTO2Entity(questionDTO);
        Question createQuestion= questionRepository.save(question);
        return questionMapper.question2DTO(createQuestion);
    }

    //Obtener preguntas iniciales
    @Override
    public List<QuestionDTO> getInitialQuestions() {
        List<Question> questions= questionRepository.findByInitial(true);
        return questions.stream().map(questionMapper::question2DTO).collect(Collectors.toList());
    }

    //Obtener subpreguntas de una repuesta
    @Override
    public List<QuestionDTO> getSubQuestions(Long answerId) {
        Answer answer = answerRepository.findById(answerId)
                .orElseThrow(() -> new ValidateIntegrity("Answer not found with id " + answerId));
        return answer.getSubQuestions().stream()
                .map(questionMapper::question2DTO)
                .collect(Collectors.toList());
    }

    @Override
    public QuestionDTO update(QuestionDTO questionDTO, Long id) {
        //busca la pregunta existente
        Question question= questionRepository.findById(id).orElseThrow(() -> new ValidateIntegrity("Question not found with id " + id));
        //Actualiza los campos de la pregunta

        question.setQuestionText(questionDTO.getQuestionText());
        question.setHierarchy(Hierarchy.fromDescription(questionDTO.getHierarchyDescription()));
        question.setActive(questionDTO.isActive());
        question.setInitial(questionDTO.isInitial());

        Question updateQuestion= questionRepository.save(question);//guarda la pregunta actualizada
        return questionMapper.question2DTO(updateQuestion);//convertir la entidad actualizada a DTO y devuelve
    }
}
