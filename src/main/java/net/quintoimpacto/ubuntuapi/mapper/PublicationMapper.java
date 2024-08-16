package net.quintoimpacto.ubuntuapi.mapper;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import net.quintoimpacto.ubuntuapi.dto.PublicationDTO;
import net.quintoimpacto.ubuntuapi.entity.Publications;

@Component
public class PublicationMapper {

    private final ModelMapper modelMapper;

    public PublicationMapper() {
        this.modelMapper = new ModelMapper();
    }

    public Publications toPublicationEntity(PublicationDTO publicationDTO) {
        return modelMapper.map(publicationDTO, Publications.class);
    }

    public PublicationDTO toPublicationDTO(Publications publication) {
        return modelMapper.map(publication, PublicationDTO.class);
    }
}


//Para que sirve - facilita la conversion de DTO a entidad y viceversa. Detalles especificios se crea y se configura de acuerdo a lo que necesito.
