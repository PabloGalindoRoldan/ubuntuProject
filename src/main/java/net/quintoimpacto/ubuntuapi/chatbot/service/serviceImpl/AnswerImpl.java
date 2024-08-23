package net.quintoimpacto.ubuntuapi.chatbot.service.serviceImpl;

import net.quintoimpacto.ubuntuapi.chatbot.dto.AnswerDTO;
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
    public AnswerDTO createAnswer(AnswerDTO answerDTO) {
        Answer answer = modelMapper.map(answerDTO, Answer.class);
        Question question = questionRepository.findById(answerDTO.getQuestionId())
                .orElseThrow(() -> new ValidateIntegrity("Question not found with id: " + answerDTO.getQuestionId()));

        answer.setQuestion(question);
        answer.setActive(true);

        if (answerDTO.getParentAnswerId() != null) {
            Answer parentAnswer = answerRepository.findById(answerDTO.getParentAnswerId())
                    .orElseThrow(() -> new ValidateIntegrity("Parent Answer not found with id: " + answerDTO.getParentAnswerId()));
            answer.setParentAnswer(parentAnswer);
        }

        // Gestionar subrespuestas
        if (answerDTO.getSubAnswers() != null) {
            List<Answer> subAnswers = answerDTO.getSubAnswers().stream()
                    .map(subAnswerDTO -> {
                        Answer subAnswer = modelMapper.map(subAnswerDTO, Answer.class);
                        subAnswer.setParentAnswer(answer);
                        subAnswer.setQuestion(question);
                        subAnswer.setActive(true);
                        return subAnswer;
                    }).collect(Collectors.toList());

            answer.setSubAnswers(subAnswers);
        }

        Answer savedAnswer = answerRepository.save(answer);
        return modelMapper.map(savedAnswer, AnswerDTO.class);
    }

    @Override
    public AnswerDTO updateAnswer(AnswerDTO answerDTO, Long id) {
        Answer existingAnswer = answerRepository.findById(id)
                .orElseThrow(() -> new ValidateIntegrity("Answer not found with id: " + id));

        existingAnswer.setAnswerText(answerDTO.getAnswerText());
        existingAnswer.setActive(answerDTO.isActive());

        // Gestionar subrespuestas actualizadas
        if (answerDTO.getSubAnswers() != null) {
            List<Answer> updatedSubAnswers = answerDTO.getSubAnswers().stream()
                    .map(subAnswerDTO -> {
                        Answer subAnswer;

                        // Si la subrespuesta ya existe, la actualizamos
                        if (subAnswerDTO.getId() != null) {
                            subAnswer = answerRepository.findById(subAnswerDTO.getId())
                                    .orElseThrow(() -> new ValidateIntegrity("SubAnswer not found with id: " + subAnswerDTO.getId()));
                            subAnswer.setAnswerText(subAnswerDTO.getAnswerText());
                            subAnswer.setActive(subAnswerDTO.isActive());
                        } else {
                            // Si la subrespuesta no existe, la creamos nueva
                            subAnswer = modelMapper.map(subAnswerDTO, Answer.class);
                            subAnswer.setParentAnswer(existingAnswer);
                            subAnswer.setQuestion(existingAnswer.getQuestion());
                            subAnswer.setActive(subAnswerDTO.isActive());
                        }

                        return subAnswer;
                    }).collect(Collectors.toList());

            existingAnswer.setSubAnswers(updatedSubAnswers);
        }

        Answer updatedAnswer = answerRepository.save(existingAnswer);
        return modelMapper.map(updatedAnswer, AnswerDTO.class);
    }

    @Override
    public void deleteAnswer(Long id) {
        Answer existingAnswer = answerRepository.findById(id)
                .orElseThrow(() -> new ValidateIntegrity("Answer not found with id: " + id));
        existingAnswer.setActive(false); // Borrado lógico
        answerRepository.save(existingAnswer);
    }

    @Override
    public List<AnswerDTO> getAllAnswers() {
        List<Answer> answers = answerRepository.findAll();
        return answers.stream()
                .map(answer -> modelMapper.map(answer, AnswerDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public AnswerDTO getAnswerById(Long id) {
        Answer answer = answerRepository.findById(id)
                .orElseThrow(() -> new ValidateIntegrity("Answer not found with id: " + id));
        return modelMapper.map(answer, AnswerDTO.class);
    }
}
