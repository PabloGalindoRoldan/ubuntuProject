package net.quintoimpacto.ubuntuapi.dto;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.quintoimpacto.ubuntuapi.entity.User;

@Data
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PublicationDTO {

    private Long id;

    @NotNull(message = "Titulo no puede estar vacio")
    private String title;

    @NotNull(message = "Descripcion no puede estar vacio")
    @Size (max = 2000, message = "La descripcion no puede ser mayor a 2000 caracteres")
    private String description;

    private LocalDate createdDate;
    private Long viewCount;

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private User user;

    private List<ImageWithoutMicroBusinessDTO> images;
}