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
@RequestMapping("/answer")
public class AnswerController {

    @Autowired
    private IAnswerService answerService;

    @PostMapping("/create")
    public ResponseEntity<AnswerDTO> createAnswer(@Valid @RequestBody AnswerDTO answerDTO) {
        if (answerDTO == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        try {
            AnswerDTO createdAnswer = answerService.create(answerDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdAnswer);
        } catch (ValidateIntegrity e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<AnswerDTO>> getAllAnswers(){
        return ResponseEntity.status(HttpStatus.OK).body(answerService.getAllAnswers());
    }
}
