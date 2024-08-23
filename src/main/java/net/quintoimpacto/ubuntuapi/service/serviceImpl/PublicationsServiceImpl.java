package net.quintoimpacto.ubuntuapi.service.serviceImpl;

import java.util.List;
import java.util.stream.Collectors;

import net.quintoimpacto.ubuntuapi.dto.PublicationDTO;
import net.quintoimpacto.ubuntuapi.entity.Image;
import net.quintoimpacto.ubuntuapi.entity.Publications;
import net.quintoimpacto.ubuntuapi.mapper.PublicationMapper;
import net.quintoimpacto.ubuntuapi.repository.IPublicationsRepository;
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
    private PublicationMapper publicationMapper; 

    @Override
    public PublicationDTO createPublication(PublicationDTO publicationDTO) {
        Publications publication = publicationMapper.toPublicationEntity(publicationDTO);
        
        List<Image> images = publicationDTO.getImages().stream()
            .map(imageDTO -> {
                Image image = new Image();
                image.setUrl(imageDTO.getUrl());
                image.setPublicId(imageDTO.getPublicId());
                image.setPublication(publication);
                return image;
            }).collect(Collectors.toList());
        
        publication.setImages(images); 
        
        Publications newPublication = publicationsRepository.save(publication);
        return publicationMapper.toPublicationDTO(newPublication);
    }

    @Override
    public PublicationDTO updatePublication(Long id, PublicationDTO publicationDTO) {
        Publications publication = publicationsRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Publicación no encontrada"));
        
        publication.setTitle(publicationDTO.getTitle());
        publication.setDescription(publicationDTO.getDescription());

        Publications updatedPublication = publicationsRepository.save(publication);
        return publicationMapper.toPublicationDTO(updatedPublication);
    }

    @Override
    public PublicationDTO getPublicationById(Long id) {
        Publications publication = publicationsRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Publicación no encontrada"));

        publication.setViewCount(publication.getViewCount() + 1);
        publicationsRepository.save(publication);

        return publicationMapper.toPublicationDTO(publication);
    }

    @Override
    public List<PublicationDTO> getAllPublications() {
        return publicationsRepository.findAllByDeletedFalse()
            .stream()
            .map(publicationMapper::toPublicationDTO)
            .collect(Collectors.toList());
    }
    
    @Override
    public Page<PublicationDTO> getTopViewedPublications(Pageable pageable) {
        Page<Publications> publicationsPage = publicationsRepository.findAllByDeletedFalseOrderByViewCountDesc(pageable);
        return publicationsPage.map(publicationMapper::toPublicationDTO);
    }

    @Override
    @Transactional
    public void deletePublication(Long id) {
        Publications publication = publicationsRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Publicación no encontrada"));
        
        publication.setDeleted(true);
        publicationsRepository.save(publication);
    }
}
