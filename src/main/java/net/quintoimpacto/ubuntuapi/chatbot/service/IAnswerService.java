package net.quintoimpacto.ubuntuapi.chatbot.service;

import net.quintoimpacto.ubuntuapi.chatbot.dto.AnswerDTO;

import java.util.List;

public interface IAnswerService {

    AnswerDTO create(AnswerDTO answerDTO);
    List<AnswerDTO> getAllAnswers();
}
