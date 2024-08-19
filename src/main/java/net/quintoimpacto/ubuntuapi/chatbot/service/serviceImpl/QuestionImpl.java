package net.quintoimpacto.ubuntuapi.chatbot.service.serviceImpl;

import net.quintoimpacto.ubuntuapi.chatbot.dto.QuestionDTO;
import net.quintoimpacto.ubuntuapi.chatbot.entity.Answer;
import net.quintoimpacto.ubuntuapi.chatbot.entity.Question;
import net.quintoimpacto.ubuntuapi.exception.ValidateIntegrity;
import net.quintoimpacto.ubuntuapi.chatbot.repository.IAnswerRepository;
import net.quintoimpacto.ubuntuapi.chatbot.repository.IQuestionRepository;
import net.quintoimpacto.ubuntuapi.chatbot.service.IQuestionService;
import org.modelmapper.ModelMapper;
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
    private ModelMapper modelMapper;

    @Override
    public QuestionDTO createQuestion(QuestionDTO questionDTO) {
        Question question = modelMapper.map(questionDTO, Question.class);
        question.setActive(true);

        // Manejo de subpreguntas
        if (questionDTO.getSubQuestions() != null) {
            List<Question> subQuestions = questionDTO.getSubQuestions().stream()
                    .map(subQuestionDTO -> {
                        Question subQuestion = modelMapper.map(subQuestionDTO, Question.class);
                        subQuestion.setParentQuestion(question);
                        subQuestion.setActive(true);
                        return subQuestion;
                    }).collect(Collectors.toList());

            question.setSubQuestions(subQuestions);
        }

        Question savedQuestion = questionRepository.save(question);
        return modelMapper.map(savedQuestion, QuestionDTO.class);
    }

    @Override
    public QuestionDTO updateQuestion(QuestionDTO questionDTO, Long id) {
        Question existingQuestion = questionRepository.findById(id)
                .orElseThrow(() -> new ValidateIntegrity("Question not found with id: " + id));

        existingQuestion.setQuestionText(questionDTO.getQuestionText());
        existingQuestion.setActive(questionDTO.isActive());

        // Manejo de subpreguntas actualizadas
        if (questionDTO.getSubQuestions() != null) {
            List<Question> subQuestions = questionDTO.getSubQuestions().stream()
                    .map(subQuestionDTO -> {
                        Question subQuestion;

                        // Si la subpregunta ya existe, la actualizamos
                        if (subQuestionDTO.getId() != null) {
                            subQuestion = questionRepository.findById(subQuestionDTO.getId())
                                    .orElseThrow(() -> new ValidateIntegrity("SubQuestion not found with id: " + subQuestionDTO.getId()));
                            subQuestion.setQuestionText(subQuestionDTO.getQuestionText());
                            subQuestion.setActive(subQuestionDTO.isActive());
                        } else {
                            // Si la subpregunta no existe, la creamos nueva
                            subQuestion = modelMapper.map(subQuestionDTO, Question.class);
                            subQuestion.setParentQuestion(existingQuestion);
                            subQuestion.setActive(subQuestionDTO.isActive());
                        }

                        return subQuestion;
                    }).collect(Collectors.toList());

            existingQuestion.setSubQuestions(subQuestions);
        }

        Question updatedQuestion = questionRepository.save(existingQuestion);
        return modelMapper.map(updatedQuestion, QuestionDTO.class);
    }

    // Nuevo método para crear subpreguntas con sus subrespuestas
    public QuestionDTO createSubQuestionWithSubAnswers(QuestionDTO subQuestionDTO, Long parentQuestionId) {
        Question parentQuestion = questionRepository.findById(parentQuestionId)
                .orElseThrow(() -> new ValidateIntegrity("Parent Question not found with id: " + parentQuestionId));

        Question subQuestion = modelMapper.map(subQuestionDTO, Question.class);
        subQuestion.setParentQuestion(parentQuestion);
        subQuestion.setActive(true);

        // Manejo de subrespuestas
        if (subQuestionDTO.getAnswers() != null) {
            List<Answer> subAnswers = subQuestionDTO.getAnswers().stream()
                    .map(answerDTO -> {
                        Answer answer = modelMapper.map(answerDTO, Answer.class);
                        answer.setQuestion(subQuestion);
                        answer.setActive(true);
                        return answer;
                    }).collect(Collectors.toList());
            subQuestion.setAnswers(subAnswers);
        }

        Question savedSubQuestion = questionRepository.save(subQuestion);
        return modelMapper.map(savedSubQuestion, QuestionDTO.class);
    }

    @Override
    public void deleteQuestion(Long id) {
        Question existingQuestion = questionRepository.findById(id)
                .orElseThrow(() -> new ValidateIntegrity("Question not found with id: " + id));
        existingQuestion.setActive(false); // Borrado lógico
        questionRepository.save(existingQuestion);
    }

    @Override
    public QuestionDTO getQuestionById(Long id) {
        Question question = questionRepository.findById(id)
                .orElseThrow(() -> new ValidateIntegrity("Question not found with id: " + id));
        return modelMapper.map(question, QuestionDTO.class);
    }

    @Override
    public List<QuestionDTO> getAllQuestions() {
        List<Question> questions = questionRepository.findAllByActive(true);
        return questions.stream()
                .map(question -> modelMapper.map(question, QuestionDTO.class))
                .collect(Collectors.toList());
    }
}
