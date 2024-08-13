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
public class QuestionDTO {

    private Long id;
    @NotNull(message = "The question cannot be null.")
    private String questionText;
    private String hierarchyDescription;
    private boolean active;
    private boolean initial;
    private List<AnswerDTO> answers;
}
