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
public class AnswerDTO {

    private Long id;
    @NotNull(message = "The answer cannot be null.")
    @Size(min = 1, max = 255, message = "The answer text must be between 1 and 255 characters.")
    private String answerText;
    @NotNull(message = "The question ID cannot be null.")
    private Long questionId;
    private List<AnswerDTO> subAnswers;
    private Long parentAnswerId;
    private boolean active;
}
