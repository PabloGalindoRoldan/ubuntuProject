package net.quintoimpacto.ubuntuapi.chatbot.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "question_id")
    private Question question;

    @OneToMany(mappedBy = "parentAnswer", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Answer> subAnswers;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "parent_answer_id")
    private Answer parentAnswer;

    private boolean active;
}