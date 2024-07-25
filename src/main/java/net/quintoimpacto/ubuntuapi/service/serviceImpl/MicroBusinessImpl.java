package net.quintoimpacto.ubuntuapi.service.serviceImpl;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import net.quintoimpacto.ubuntuapi.dto.CategoryDTO;
import net.quintoimpacto.ubuntuapi.dto.ImageDTO;
import net.quintoimpacto.ubuntuapi.dto.microbusinessDTO.MicroBusinessDTO;
import net.quintoimpacto.ubuntuapi.dto.microbusinessDTO.MicroBusinessRegisterDTO;
import net.quintoimpacto.ubuntuapi.dto.microbusinessDTO.MicroBusinessShowDto;
import net.quintoimpacto.ubuntuapi.dto.microbusinessDTO.MicroBusinessUpdateDTO;
import net.quintoimpacto.ubuntuapi.entity.Image;
import net.quintoimpacto.ubuntuapi.entity.MicroBusiness;
import net.quintoimpacto.ubuntuapi.entity.enums.Category;
import net.quintoimpacto.ubuntuapi.repository.ImageRepository;
import net.quintoimpacto.ubuntuapi.repository.IMicroBusinessRepository;
import net.quintoimpacto.ubuntuapi.service.IMicroBusinessService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    public void update(MicroBusinessUpdateDTO microBusinessUpdateDTO) {
        modelMapper.getConfiguration().setSkipNullEnabled(true);
        var microToUpdate = microBusinessRepository.findById(microBusinessUpdateDTO.getId()).get();
        modelMapper.map(microBusinessUpdateDTO, microToUpdate);
        microBusinessRepository.save(microToUpdate);
    }

    @Override
    public Optional<MicroBusinessDTO> findById(Long id) {
        Optional<MicroBusiness> microBusinessOptional = microBusinessRepository.findById(id);
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
        return microBusinessRepository.findByNameContainingIgnoreCase(name).stream()
                .map(micro -> modelMapper.map(micro, MicroBusinessDTO.class))
                .collect(Collectors.toSet());
    }

    @Override
    public List<MicroBusinessDTO> findByCategory(Category category) {
        List<MicroBusiness> microBusinesses = microBusinessRepository.findByCategory(category);
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
}