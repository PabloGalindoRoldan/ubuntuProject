package net.quintoimpacto.ubuntuapi.service;

import java.util.List;

import net.quintoimpacto.ubuntuapi.dto.PublicationDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IPublicationsService {
    PublicationDTO createPublication(PublicationDTO publicationDTO);
    PublicationDTO updatePublication(Long id, PublicationDTO publicationDTO);
    List<PublicationDTO> getAllPublications();
    void deletePublication(Long id);
    PublicationDTO getPublicationById(Long id);
    Page<PublicationDTO> getTopViewedPublications(Pageable pageable);

}