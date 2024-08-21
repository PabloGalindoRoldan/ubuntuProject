package net.quintoimpacto.ubuntuapi.service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import net.quintoimpacto.ubuntuapi.dto.CategoryDTO;
import net.quintoimpacto.ubuntuapi.dto.microbusinessDTO.MicroBusinessDTO;
import net.quintoimpacto.ubuntuapi.dto.microbusinessDTO.MicroBusinessDTOEmail;
import net.quintoimpacto.ubuntuapi.dto.microbusinessDTO.MicroBusinessRegisterDTO;
import net.quintoimpacto.ubuntuapi.dto.microbusinessDTO.MicroBusinessShowDto;
import net.quintoimpacto.ubuntuapi.dto.microbusinessDTO.MicroBusinessUpdateDTO;
import net.quintoimpacto.ubuntuapi.entity.MicroBusiness;
import net.quintoimpacto.ubuntuapi.entity.enums.Category;

public interface IMicroBusinessService {
    
    public MicroBusinessShowDto save(MicroBusinessRegisterDTO microBusinessDTO);
    public void update(MicroBusinessUpdateDTO microBusinessDTO, Long id);
    public Optional<MicroBusinessDTO> findById(Long id);
    public Set<MicroBusinessDTO> findByName(String name);
    public List<MicroBusinessDTO> findByCategory(Category category);
    public List<CategoryDTO> getAllCategory();
    public Set<MicroBusinessDTO> findByUserEmailMicroBusiness(String email);
    public Optional<MicroBusiness> findByIdAndUserEmail(Long id, String email);
    public void delete(Long id);
    public List<MicroBusinessDTO> findAll();
    public List<MicroBusinessDTOEmail> getNewMicroBusinessesForTheWeek();
}