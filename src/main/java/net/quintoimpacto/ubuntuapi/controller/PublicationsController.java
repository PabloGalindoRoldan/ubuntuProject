package net.quintoimpacto.ubuntuapi.controller;

import net.quintoimpacto.ubuntuapi.dto.PublicationDTO;
import net.quintoimpacto.ubuntuapi.service.IPublicationsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

@RestController
@RequestMapping("/publications")
public class PublicationsController {

    @Autowired
    private IPublicationsService publicationsService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/createPublication")
    public ResponseEntity<PublicationDTO> createPublication(@RequestBody PublicationDTO publicationDTO) {
        return ResponseEntity.ok(publicationsService.createPublication(publicationDTO));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<PublicationDTO> updatePublication(@PathVariable Long id, @RequestBody PublicationDTO publicationDTO) {
        return ResponseEntity.ok(publicationsService.updatePublication(id, publicationDTO));
    }

    @GetMapping("/getAllPublications/{id}")
    public ResponseEntity<PublicationDTO> getPublicationById(@PathVariable Long id) {
        return ResponseEntity.ok(publicationsService.getPublicationById(id));
    }

    @GetMapping("/getAllPublications")
    public ResponseEntity<List<PublicationDTO>> getAllPublications() {
        return ResponseEntity.ok(publicationsService.getAllPublications());
    }

    @GetMapping("/topViewed")
    public ResponseEntity<Page<PublicationDTO>> getTopViewedPublications(Pageable pageable) {
    return ResponseEntity.ok(publicationsService.getTopViewedPublications(pageable));
}

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deletePublication(@PathVariable Long id) {
        publicationsService.deletePublication(id);
        return ResponseEntity.noContent().build();
    }
}
