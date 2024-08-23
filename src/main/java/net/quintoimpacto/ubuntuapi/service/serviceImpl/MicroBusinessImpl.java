package net.quintoimpacto.ubuntuapi.service.serviceImpl;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.temporal.TemporalAdjusters;
import java.util.*;
import java.util.stream.Collectors;

import net.quintoimpacto.ubuntuapi.dto.CategoryDTO;
import net.quintoimpacto.ubuntuapi.dto.microbusinessDTO.MicroBusinessDTO;
import net.quintoimpacto.ubuntuapi.dto.microbusinessDTO.MicroBusinessDTOEmail;
import net.quintoimpacto.ubuntuapi.dto.microbusinessDTO.MicroBusinessRegisterDTO;
import net.quintoimpacto.ubuntuapi.dto.microbusinessDTO.MicroBusinessShowDto;
import net.quintoimpacto.ubuntuapi.dto.microbusinessDTO.MicroBusinessUpdateDTO;
import net.quintoimpacto.ubuntuapi.entity.MicroBusiness;
import net.quintoimpacto.ubuntuapi.entity.enums.Category;
import net.quintoimpacto.ubuntuapi.repository.ImageRepository;
import net.quintoimpacto.ubuntuapi.repository.IMicroBusinessRepository;
import net.quintoimpacto.ubuntuapi.service.IMicroBusinessService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MicroBusinessImpl implements IMicroBusinessService {

    @Autowired
    private IMicroBusinessRepository microBusinessRepository;

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public MicroBusinessShowDto save(MicroBusinessRegisterDTO microBusinessDTO) {
        var microBusiness = modelMapper.map(microBusinessDTO, MicroBusiness.class);
        microBusiness = microBusinessRepository.save(microBusiness);
        return modelMapper.map(microBusiness, MicroBusinessShowDto.class);
    }

    @Override
    public void update(MicroBusinessUpdateDTO microBusinessDTO, Long id) {
        var microBusinessToUpdate = microBusinessRepository.findByIdAndDeletedFalse(id).get();
        modelMapper.getConfiguration().setSkipNullEnabled(true);
        modelMapper.map(microBusinessDTO, microBusinessToUpdate);
        microBusinessRepository.save(microBusinessToUpdate);
    }

    @Override
    public Optional<MicroBusinessDTO> findById(Long id) {
        Optional<MicroBusiness> microBusinessOptional = microBusinessRepository.findByIdAndDeletedFalse(id);
        if (microBusinessOptional.isPresent()) {
            var microBusiness = microBusinessOptional.get();
            var dto = modelMapper.map(microBusiness, MicroBusinessDTO.class);
            return Optional.of(dto);
        } else {
            return Optional.empty();
        }
    }

    @Override
    public Set<MicroBusinessDTO> findByName(String name) {
        return microBusinessRepository.findByNameContainingIgnoreCaseAndDeletedFalse(name).stream()
                .map(micro -> modelMapper.map(micro, MicroBusinessDTO.class))
                .collect(Collectors.toSet());
    }

    @Override
    public List<MicroBusinessDTO> findByCategory(Category category) {
        List<MicroBusiness> microBusinesses = microBusinessRepository.findByCategoryAndDeletedFalse(category);
        return microBusinesses.stream()
                .map(microBusiness -> modelMapper.map(microBusiness, MicroBusinessDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<CategoryDTO> getAllCategory() {
        return Arrays.stream(Category.values())
                .map(category -> modelMapper.map(category, CategoryDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public Set<MicroBusinessDTO> findByUserEmailMicroBusiness(String email) {
        var setMicroBusiness = microBusinessRepository.findByUserEmailAndDeletedFalse(email);
        return setMicroBusiness.stream()
                .map(microBusiness -> modelMapper.map(microBusiness, MicroBusinessDTO.class))
                .collect(Collectors.toSet());
    }

    @Override
    public Optional<MicroBusiness> findByIdAndUserEmail(Long id, String email) {
        return microBusinessRepository.findByIdAndUserEmailAndDeletedFalse(id, email);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        var micro = microBusinessRepository.findByIdAndDeletedFalse(id).get();
        micro.setDeleted(true);
    }

    @Override
    public List<MicroBusinessDTO> findAll() {
        return microBusinessRepository.findAllByDeletedFalse().stream()
                .map(micro -> modelMapper.map(micro, MicroBusinessDTO.class))
                .toList();
    }

    //busqueda de nuevos microemprendimientos añadidos durante la semana para email
    @Override
    public List<MicroBusinessDTOEmail> getNewMicroBusinessesForTheWeek() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime startOfWeek = now.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY)).toLocalDate().atStartOfDay();
        LocalDateTime endOfWeek = startOfWeek.plusDays(7).with(TemporalAdjusters.nextOrSame(DayOfWeek.SUNDAY)).plusDays(1).toLocalDate().atStartOfDay();
        List<MicroBusiness> microBusinesses = microBusinessRepository.findAllByCreatedDateBetweenAndDeletedFalse(startOfWeek, endOfWeek);
        return microBusinesses.stream()
                .map(micro -> modelMapper.map(micro, MicroBusinessDTOEmail.class))
                .collect(Collectors.toList());
    }
}