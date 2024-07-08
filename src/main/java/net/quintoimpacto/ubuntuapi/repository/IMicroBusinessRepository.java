package net.quintoimpacto.ubuntuapi.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import net.quintoimpacto.ubuntuapi.entity.MicroBusiness;

@Repository
public interface IMicroBusinessRepository extends JpaRepository<MicroBusiness,Long>{
    Set<MicroBusiness> findByNameContainingIgnoreCase(String name);
}
