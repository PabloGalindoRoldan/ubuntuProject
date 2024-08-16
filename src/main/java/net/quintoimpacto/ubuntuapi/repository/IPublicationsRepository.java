package net.quintoimpacto.ubuntuapi.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import net.quintoimpacto.ubuntuapi.entity.Publications;

@Repository
public interface IPublicationsRepository extends JpaRepository<Publications, Long> {
    List<Publications> findAllByDeletedFalse();
    Page<Publications> findAllByDeletedFalseOrderByViewCountDesc(Pageable pageable);
    
}
