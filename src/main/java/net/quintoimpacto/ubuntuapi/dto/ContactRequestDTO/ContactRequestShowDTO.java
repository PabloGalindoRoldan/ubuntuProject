package net.quintoimpacto.ubuntuapi.dto.ContactRequestDTO;

import java.time.LocalDate;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ContactRequestShowDTO {

    private Long id;
    
    @NotNull(message = "Nombre no puede estar vacío")
    private String fullName;

    @Email
    private String email;

    private String phoneNumber;

    private LocalDate dateCreated;

    private LocalDate dateUpdated;

    @NotNull(message = "Mensaje no puede estar vacío")
    private String message;

    private boolean stateRequest;

    private Long microBusinessId;

    private String microBusinessName;
}
