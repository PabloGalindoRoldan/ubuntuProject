package net.quintoimpacto.ubuntuapi.chatbot.service;

import net.quintoimpacto.ubuntuapi.chatbot.dto.QuestionDTO;

import java.util.List;

public interface IQuestionService {

    QuestionDTO createQuestion(QuestionDTO questionDTO);
    QuestionDTO createSubQuestionWithSubAnswers(QuestionDTO subQuestionDTO, Long parentQuestionId);
    public QuestionDTO updateQuestion(QuestionDTO questionDTO,Long id);
    public void deleteQuestion(Long id);
    public QuestionDTO getQuestionById(Long id);
    public List<QuestionDTO> getAllQuestions();
}
