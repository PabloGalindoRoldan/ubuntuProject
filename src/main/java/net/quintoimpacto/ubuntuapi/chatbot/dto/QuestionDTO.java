package net.quintoimpacto.ubuntuapi.chatbot.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class QuestionDTO {

    private Long id;
    @NotNull(message = "The question cannot be null.")
    @Size(min = 1, max = 255, message = "The answer text must be between 1 and 255 characters.")
    private String questionText;
    @NotNull(message = "Category cannot be null")
    private String hierarchyDescription;
    private List<AnswerDTO> answers;
    private Long parentQuestionId; // Para relacionar subpreguntas
    private List<QuestionDTO> subQuestions; // Para las subpreguntas
    private boolean active;
}
