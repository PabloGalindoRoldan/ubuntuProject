package net.quintoimpacto.ubuntuapi.chatbot.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.quintoimpacto.ubuntuapi.chatbot.enums.Hierarchy;

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

    @NotNull(message = "The question cannot be null.")
    private String questionText;

    //relacion con las categorias:
    @Enumerated(EnumType.STRING)
    private Hierarchy hierarchy;

    @Column(columnDefinition = "boolean default true")
    private boolean active;

    @Column(columnDefinition = "boolean default false")
    private boolean initial;// Campo para indicar si es una pregunta es inicial o no

    //relacion con las repuestas
    //Una pregunta puede tener muchas respuestas (OneToMany), pero una respuesta está asociada con una sola pregunta (ManyToOne)
    @OneToMany(mappedBy = "parentQuestion", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Answer> answers= new ArrayList<>();

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "parent_answer_id")
    @JsonBackReference
    private Answer parentAnswer;
}
