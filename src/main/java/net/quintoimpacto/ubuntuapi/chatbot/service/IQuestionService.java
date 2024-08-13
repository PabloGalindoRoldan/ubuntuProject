package net.quintoimpacto.ubuntuapi.chatbot.service;

import net.quintoimpacto.ubuntuapi.chatbot.dto.QuestionDTO;

import java.util.List;

public interface IQuestionService {

    QuestionDTO create(QuestionDTO questionDTO);
    List<QuestionDTO> getInitialQuestions();
    List<QuestionDTO> getSubQuestions(Long answerId);
    QuestionDTO update(QuestionDTO questionDTO, Long id);
}
