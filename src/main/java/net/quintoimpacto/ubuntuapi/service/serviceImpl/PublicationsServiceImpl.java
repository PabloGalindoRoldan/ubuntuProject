package net.quintoimpacto.ubuntuapi.service.serviceImpl;

import java.util.List;

import net.quintoimpacto.ubuntuapi.entity.Publications;
import net.quintoimpacto.ubuntuapi.repository.IPublicationsRepository;
import net.quintoimpacto.ubuntuapi.service.IPublicationsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PublicationsServiceImpl implements IPublicationsService {

    private final IPublicationsRepository publicationsRepository;

    @Autowired
    public PublicationsServiceImpl(IPublicationsRepository publicationsRepository) {
        this.publicationsRepository = publicationsRepository;
    }

    @Override
    public List<Publications> getAllActivePublications() {
        return publicationsRepository.findByDeletedFalse(null);
    }

    @Override
    public Publications getPublicationById(Long id) {
        return publicationsRepository.findById(id)
                .orElseThrow();
    }

    @Override
    public Publications createPublication(Publications publication) {
        return publicationsRepository.save(publication);
    }

    @Override
    public void deletePublication(Long id) {
        Publications publication = getPublicationById(id);
        publication.setDeleted(true);
        publicationsRepository.save(publication);
    }

    @Override
    @Transactional
    public void incrementViewCount(Long id) {
        publicationsRepository.incrementViewCount(id);
    }

    @Override
    public List<Publications> searchPublicationsByTitle(String title) {
        return publicationsRepository.findByTitleContaining(title);
    }

    @Override
    public List<Publications> getPublicationsByUserId(Long userId) {
        return publicationsRepository.findByUserId(userId);
    }
}
