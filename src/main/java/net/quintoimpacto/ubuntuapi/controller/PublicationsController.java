package net.quintoimpacto.ubuntuapi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import net.quintoimpacto.ubuntuapi.dto.PublicationDTO;
import net.quintoimpacto.ubuntuapi.service.IPublicationsService;
import net.quintoimpacto.ubuntuapi.service.IUserService;

@RestController
@RequestMapping("/publications")
public class PublicationsController {

    @Autowired
    private IPublicationsService publicationsService;

    @Autowired
    private IUserService userService;

    @PostMapping("/createPublication")
    public ResponseEntity<PublicationDTO> createPublication(@RequestBody PublicationDTO publicationDTO) {
        return ResponseEntity.ok(publicationsService.createPublication(publicationDTO));
    }

    @PutMapping("/updatepubs/{id}")
    public ResponseEntity<PublicationDTO> updatePublication(@PathVariable Long id, @RequestBody PublicationDTO publicationDTO) {
        return ResponseEntity.ok(publicationsService.updatePublication(id, publicationDTO));
    }

    @GetMapping("/getAllPublications/{id}")
    public ResponseEntity<PublicationDTO> getPublicationById(@PathVariable Long id) {
        return ResponseEntity.ok(publicationsService.getPublicationById(id));
    }

    @GetMapping("/getAllPublications")
    public ResponseEntity<?> getPublications(
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer size) {
    
        if (page != null && size != null) {
            Pageable pageable = PageRequest.of(page, size);
            Page<PublicationDTO> topViewedPublications = publicationsService.getTopViewedPublications(pageable);
            return ResponseEntity.ok(topViewedPublications);
        } else {
            List<PublicationDTO> allPublications = publicationsService.getAllPublications();
            return ResponseEntity.ok(allPublications);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deletePublication(@PathVariable Long id) {
        publicationsService.deletePublication(id);
        return ResponseEntity.noContent().build();
    }
}