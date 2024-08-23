package net.quintoimpacto.ubuntuapi.chatbot.controller;

import jakarta.validation.Valid;
import net.quintoimpacto.ubuntuapi.chatbot.dto.QuestionDTO;
import net.quintoimpacto.ubuntuapi.exception.ValidateIntegrity;
import net.quintoimpacto.ubuntuapi.chatbot.service.IQuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/questions")
public class QuestionController {
    @Autowired
    private IQuestionService questionService;

    @PostMapping("/create")
    public ResponseEntity<QuestionDTO> createQuestion(@Valid @RequestBody QuestionDTO questionDTO){
        //verifica si el dto de entrada es valido o nulo
        //maneno posibles excepciones de validacion y otras excepciones, devuleve la entidad creada o un msj de error adecuado
        if(questionDTO == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }try {
            return ResponseEntity.status(HttpStatus.CREATED).body(questionService.createQuestion(questionDTO));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Controlador para crear subpreguntas con subrespuestas
    @PostMapping("/create/{parentQuestionId}/subquestion")
    public ResponseEntity<QuestionDTO> createSubQuestionWithSubAnswers(@Valid @RequestBody QuestionDTO subQuestionDTO, @PathVariable Long parentQuestionId) {
        if (subQuestionDTO == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(questionService.createSubQuestionWithSubAnswers(subQuestionDTO, parentQuestionId));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<QuestionDTO> updateQuestion(@Valid @RequestBody QuestionDTO questionDTO,@PathVariable Long id) {
        if (questionDTO == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        try {
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(questionService.updateQuestion(questionDTO,id));
        } catch (ValidateIntegrity e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Long id) {
        try {
            questionService.deleteQuestion(id);
            return ResponseEntity.noContent().build(); // 204 No Content
        } catch (ValidateIntegrity e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // 404 Not Found
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // 500 Internal Server Error
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<QuestionDTO>> getAllQuestions(){
        return ResponseEntity.status(HttpStatus.OK).body(questionService.getAllQuestions());
    }

    @GetMapping("/getQuestions/{questionId}")
    public ResponseEntity<QuestionDTO> getQuestionById(@PathVariable Long questionId) {
        try {
            return ResponseEntity.ok(questionService.getQuestionById(questionId));
        } catch (ValidateIntegrity e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

}
