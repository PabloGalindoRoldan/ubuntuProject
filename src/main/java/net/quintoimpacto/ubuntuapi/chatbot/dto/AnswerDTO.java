package net.quintoimpacto.ubuntuapi.chatbot.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AnswerDTO {

    private Long id;
    @NotNull(message = "The answer cannot be null.")
    private String answerText;
    private Long parentQuestionId;
    private List<QuestionDTO> subQuestions;
}
