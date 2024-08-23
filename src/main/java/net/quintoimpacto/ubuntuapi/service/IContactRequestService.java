package net.quintoimpacto.ubuntuapi.service;

import java.util.List;
import java.util.Optional;

import net.quintoimpacto.ubuntuapi.dto.ContactRequestDTO.ContactRequestDTO;
import net.quintoimpacto.ubuntuapi.dto.ContactRequestDTO.ContactRequestShowDTO;

public interface IContactRequestService {
    void save(ContactRequestDTO contact);
    void update(ContactRequestDTO contact, Long id);
    Optional<ContactRequestShowDTO> findById(Long id);
    void delete(Long id);
    List<ContactRequestShowDTO> findByMicrobusinessId(Long idMicrobussiness);
    List<ContactRequestShowDTO> findByManage();
    List<ContactRequestShowDTO> findByNoManage();
}
