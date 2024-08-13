package net.quintoimpacto.ubuntuapi.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import net.quintoimpacto.ubuntuapi.entity.Publications;


public interface IPublicationsRepository extends JpaRepository<Publications, Long> {

    List<Publications> findByDeletedFalse(Long id);

    List<Publications> findByTitleContaining(String title);

    List<Publications> findByUserId(Long  userId);

    List<Publications> findByOrderByCreatedAtDesc();

    @Modifying
    @Query("UPDATE Publications p SET p.viewCount = p.viewCount + 1 WHERE p.id = :id")
    void incrementViewCount(Long id);
    
}
