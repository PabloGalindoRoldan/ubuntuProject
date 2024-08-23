package net.quintoimpacto.ubuntuapi.service.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import net.quintoimpacto.ubuntuapi.dto.ContactRequestDTO.ContactRequestDTO;
import net.quintoimpacto.ubuntuapi.dto.ContactRequestDTO.ContactRequestShowDTO;
import net.quintoimpacto.ubuntuapi.entity.ContactRequest;
import net.quintoimpacto.ubuntuapi.exception.ValidateIntegrity;
import net.quintoimpacto.ubuntuapi.repository.IConatctRequestRepository;
import net.quintoimpacto.ubuntuapi.service.IContactRequestService;
import net.quintoimpacto.ubuntuapi.validator.contactRequest.ValidateMicrobusiness;

@Service
public class ContactRequestImpl implements IContactRequestService {
    
    private final IConatctRequestRepository contactRepository;
    private final ModelMapper modelMapper;
    private final ValidateMicrobusiness validateMicrobusiness;

    public ContactRequestImpl(IConatctRequestRepository contactRepository, 
                    ModelMapper modelMapper,
                    ValidateMicrobusiness validateMicrobusiness){
        this.contactRepository = contactRepository;
        this.modelMapper = modelMapper;
        this.validateMicrobusiness = validateMicrobusiness;
    }

    @Override
    public void save(ContactRequestDTO contactDTO) {
        validateMicrobusiness.existMicrobusiness(contactDTO.getMicroBusiness().getId());
        var contactRequest = modelMapper.map(contactDTO, ContactRequest.class);
        contactRepository.save(contactRequest);
    }

    @Override
    public void update(ContactRequestDTO contactDTO, Long id) {
        modelMapper.getConfiguration().setSkipNullEnabled(true);
        var contactRequest = contactRepository.findById(id).get();
        modelMapper.map(contactDTO,contactRequest);
        contactRepository.save(contactRequest);
    }

    @Override
    public Optional<ContactRequestShowDTO> findById(Long id) {
        var contactRequest = contactRepository.findById(id);
        if(!contactRequest.isPresent()){
            throw new ValidateIntegrity("Not found Contact");
        }

        return Optional.of(modelMapper.map(contactRequest.get(), ContactRequestShowDTO.class));
    }

    @Override
    public void delete(Long id) {
        var contactRequest = contactRepository.findById(id);
        if(!contactRequest.isPresent()){
            throw new ValidateIntegrity("Not found Contact");
        }
        contactRepository.delete(contactRequest.get());
    }

    @Override
    public List<ContactRequestShowDTO> findByMicrobusinessId(Long idMicrobussiness) {
        validateMicrobusiness.existMicrobusiness(idMicrobussiness);
        List<ContactRequest> listContactRequests = contactRepository.findByMicroBusinessId(idMicrobussiness);
        return listContactRequests.stream()
                .map(contactRequest -> modelMapper.map(contactRequest, ContactRequestShowDTO.class))
                .toList();
    }

    @Override
    public List<ContactRequestShowDTO> findByManage() {
        var listContactRequests = contactRepository.findByStateRequestTrue();
        return listContactRequests.stream()
                .map(contactRequest -> modelMapper.map(contactRequest, ContactRequestShowDTO.class))
                .toList();
    }

    @Override
    public List<ContactRequestShowDTO> findByNoManage() {
        var listContactRequests = contactRepository.findByStateRequestFalse();
        return listContactRequests.stream()
                .map(contactRequest -> modelMapper.map(contactRequest, ContactRequestShowDTO.class))
                .toList();
    }
}
