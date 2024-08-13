package net.quintoimpacto.ubuntuapi.chatbot.mapper;

import net.quintoimpacto.ubuntuapi.chatbot.dto.QuestionDTO;
import net.quintoimpacto.ubuntuapi.chatbot.entity.Question;
import net.quintoimpacto.ubuntuapi.chatbot.enums.Hierarchy;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class QuestionMapper {

    @Autowired
    ModelMapper modelMapper;

    public QuestionDTO question2DTO(Question question){
        QuestionDTO questionDTO= modelMapper.map(question, QuestionDTO.class);
        questionDTO.setHierarchyDescription(question.getHierarchy().getDescription());
        return questionDTO;
    }

    public Question questionDTO2Entity(QuestionDTO questionDTO){
        Question question= modelMapper.map(questionDTO, Question.class);
        question.setHierarchy(Hierarchy.fromDescription(questionDTO.getHierarchyDescription()));
        return question;
    }
}
