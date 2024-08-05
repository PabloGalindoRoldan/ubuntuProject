package net.quintoimpacto.ubuntuapi.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ManageError {
    @ExceptionHandler(ValidateIntegrity.class)
    public ResponseEntity<?> ValidateIntegrity(ValidateIntegrity e){
        return ResponseEntity.badRequest().body(e.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> tratarError400(MethodArgumentNotValidException e){
        var errores = e.getFieldErrors().stream().map(DatosErrorValidation::new).toList();
        return ResponseEntity.badRequest().body(errores);
    }

     private record DatosErrorValidation(String campo, String error) {
        public DatosErrorValidation(FieldError error){
            this(error.getField(), error.getDefaultMessage());
        }
    }
}
