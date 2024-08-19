package net.quintoimpacto.ubuntuapi.chatbot.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.quintoimpacto.ubuntuapi.chatbot.entity.enums.Hierarchy;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "questions")
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String questionText;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Hierarchy hierarchy;

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Answer> answers= new ArrayList<>();

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "parent_question_id")
    private Question parentQuestion;

    @OneToMany(mappedBy = "parentQuestion", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Question> subQuestions= new ArrayList<>();

    private boolean active;
}
