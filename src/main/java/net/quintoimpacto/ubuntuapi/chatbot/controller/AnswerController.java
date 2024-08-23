package net.quintoimpacto.ubuntuapi.chatbot.controller;

import jakarta.validation.Valid;
import net.quintoimpacto.ubuntuapi.chatbot.dto.AnswerDTO;
import net.quintoimpacto.ubuntuapi.chatbot.service.IAnswerService;
import net.quintoimpacto.ubuntuapi.exception.ValidateIntegrity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/answers")
public class AnswerController {

    @Autowired
    private IAnswerService answerService;

    @PostMapping("/create")
    public ResponseEntity<AnswerDTO> createAnswer(@Valid @RequestBody AnswerDTO answerDTO) {
        if (answerDTO == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        try {
            AnswerDTO createdAnswer = answerService.createAnswer(answerDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdAnswer);
        } catch (ValidateIntegrity e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<AnswerDTO> answerQuestion(@Valid @RequestBody AnswerDTO answerDTO, @PathVariable Long id) {
        if (answerDTO == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        try {
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(answerService.updateAnswer(answerDTO,id));
        } catch (ValidateIntegrity e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Long id) {
        try {
            answerService.deleteAnswer(id);
            return ResponseEntity.noContent().build(); // 204 No Content
        } catch (ValidateIntegrity e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // 404 Not Found
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // 500 Internal Server Error
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<AnswerDTO>> getAllQuestions(){
        return ResponseEntity.status(HttpStatus.OK).body(answerService.getAllAnswers());
    }

    @GetMapping("/getAnswers/{answerId}")
    public ResponseEntity<AnswerDTO> getAnswersId(@PathVariable Long answerId) {
        try {
            return ResponseEntity.ok(answerService.getAnswerById(answerId));
        } catch (ValidateIntegrity e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
