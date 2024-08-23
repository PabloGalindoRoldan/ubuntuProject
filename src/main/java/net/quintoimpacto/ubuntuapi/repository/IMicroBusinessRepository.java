package net.quintoimpacto.ubuntuapi.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import net.quintoimpacto.ubuntuapi.entity.enums.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import net.quintoimpacto.ubuntuapi.entity.MicroBusiness;

@Repository
public interface IMicroBusinessRepository extends JpaRepository<MicroBusiness,Long>{
    Set<MicroBusiness> findByNameContainingIgnoreCaseAndDeletedFalse(String name);
    List<MicroBusiness> findByCategoryAndDeletedFalse(Category category);
    Set<MicroBusiness> findByUserEmailAndDeletedFalse(String email);
    Optional<MicroBusiness> findByIdAndUserEmailAndDeletedFalse(long id, String email);
    List<MicroBusiness> findAllByDeletedFalse();
    Optional<MicroBusiness> findByIdAndDeletedFalse(Long id);

    //Obtener nuevos microoemprendimientos
    List<MicroBusiness> findAllByCreatedDateBetweenAndDeletedFalse(LocalDateTime startDate, LocalDateTime endDate);
}
