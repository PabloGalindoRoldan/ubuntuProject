package net.quintoimpacto.ubuntuapi.service.serviceImpl;

import java.util.List;
import java.util.stream.Collectors;

import net.quintoimpacto.ubuntuapi.dto.PublicationDTO;
import net.quintoimpacto.ubuntuapi.entity.Publications;
import net.quintoimpacto.ubuntuapi.repository.IPublicationsRepository;
import net.quintoimpacto.ubuntuapi.repository.ImageRepository;
import net.quintoimpacto.ubuntuapi.service.IPublicationsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PublicationsServiceImpl implements IPublicationsService {

    @Autowired
    private IPublicationsRepository publicationsRepository;

      @Autowired
        private ImageRepository imageRepository;

    @Override
    @Transactional
    public PublicationDTO createPublication(PublicationDTO publicationDTO) {
        Publications publication = mapToEntity(publicationDTO);
        Publications newPublication = publicationsRepository.save(publication);
        return mapToDTO(newPublication);
    }

    @Override
    @Transactional
    public PublicationDTO updatePublication(Long id, PublicationDTO publicationDTO) {
        Publications publication = publicationsRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Publicación no encontrada"));
        
        publication.setTitle(publicationDTO.getTitle());
        publication.setDescription(publicationDTO.getDescription());

        Publications updatedPublication = publicationsRepository.save(publication);
        return mapToDTO(updatedPublication);
    }

    @Override
    @Transactional(readOnly = true)
    public PublicationDTO getPublicationById(Long id) {
        Publications publication = publicationsRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Publicación no encontrada"));

        publication.setViewCount(publication.getViewCount() + 1);
        publicationsRepository.save(publication);

        return mapToDTO(publication);
    }

    @Override
    @Transactional(readOnly = true)
    public List<PublicationDTO> getAllPublications() {
        return publicationsRepository.findAll().stream()
            .map(this::mapToDTO)
            .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public Page<PublicationDTO> getTopViewedPublications(Pageable pageable) {
        Page<Publications> publicationsPage = publicationsRepository.findAllByOrderByViewCountDesc(pageable);
        
        return publicationsPage.map(this::mapToDTO);
    }

    @Override
    @Transactional
    public void deletePublication(Long id) {
        Publications publication = publicationsRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Publicación no encontrada"));
        
        publicationsRepository.delete(publication);
    }

    private Publications mapToEntity(PublicationDTO publicationDTO) {
        Publications publication = Publications.builder()
            .title(publicationDTO.getTitle())
            .description(publicationDTO.getDescription())
            .viewCount(publicationDTO.getViewCount())
            .user(publicationDTO.getUser())
            .build();
        return publication;
    }

    private PublicationDTO mapToDTO(Publications publication) {
        PublicationDTO publicationDTO = PublicationDTO.builder()
            .id(publication.getId())
            .title(publication.getTitle())
            .description(publication.getDescription())
            .viewCount(publication.getViewCount())
            .user(publication.getUser())
            .build();
        return publicationDTO;
    }
}
