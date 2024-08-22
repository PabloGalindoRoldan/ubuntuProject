package net.quintoimpacto.ubuntuapi.chatbot.service;

import net.quintoimpacto.ubuntuapi.chatbot.dto.AnswerDTO;

import java.util.List;

public interface IAnswerService {

    AnswerDTO createAnswer(AnswerDTO answerDTO);
    AnswerDTO updateAnswer(AnswerDTO answerDTO,Long id);
    void deleteAnswer(Long id);
    List<AnswerDTO> getAllAnswers();
    AnswerDTO getAnswerById(Long id);
}
