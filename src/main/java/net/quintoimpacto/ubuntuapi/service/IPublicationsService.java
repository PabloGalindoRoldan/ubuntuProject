package net.quintoimpacto.ubuntuapi.service;

import net.quintoimpacto.ubuntuapi.entity.Publications;


import java.util.List;

public interface IPublicationsService {

    List<Publications> getAllActivePublications();

    Publications getPublicationById(Long id);

    Publications createPublication(Publications publication);

    void deletePublication(Long id);

    void incrementViewCount(Long id);

    List<Publications> searchPublicationsByTitle(String title);

    List<Publications> getPublicationsByUserId(Long userId);
    
} 