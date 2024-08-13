package net.quintoimpacto.ubuntuapi.chatbot.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "answers")
public class Answer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull(message = "The answer cannot be null.")
    private String answerText;

    //relacion con las preguntas
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_question_id")
    @JsonBackReference
    private Question parentQuestion;

    //Una respuesta puede desencadenar nuevas preguntas (OneToMany) (esa repuesta puede desencadenar subpreguntas), y esas preguntas están asociadas con esa respuesta (ManyToOne).
    @OneToMany(mappedBy = "parentAnswer", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Question> subQuestions = new ArrayList<>();
}