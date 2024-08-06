package net.quintoimpacto.ubuntuapi.controller;

import jakarta.validation.Valid;
import net.quintoimpacto.ubuntuapi.dto.QuestionDTO;
import net.quintoimpacto.ubuntuapi.exception.ValidateIntegrity;
import net.quintoimpacto.ubuntuapi.service.IQuestionService;
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
            return ResponseEntity.status(HttpStatus.CREATED).body(questionService.create(questionDTO));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<QuestionDTO>> getAllQuestions(){
        return ResponseEntity.status(HttpStatus.OK).body(questionService.getAllQuestion());
    }

    @GetMapping("/initial")
    public ResponseEntity<List<QuestionDTO>> getInitialQuestions(){
        return ResponseEntity.status(HttpStatus.OK).body(questionService.getInitialQuestion());
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<QuestionDTO> updateQuestion(@Valid @RequestBody QuestionDTO questionDTO,@PathVariable Long id) {
        if (questionDTO == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        try {
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(questionService.update(questionDTO,id));
        } catch (ValidateIntegrity e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
