package net.quintoimpacto.ubuntuapi.controller;

import net.quintoimpacto.ubuntuapi.entity.Publications;
import net.quintoimpacto.ubuntuapi.service.IPublicationsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/publications")
public class PublicationsController {

    private final IPublicationsService publicationsService;

    @Autowired
    public PublicationsController(IPublicationsService publicationsService) {
        this.publicationsService = publicationsService;
    }

    @GetMapping("/getAllPublications")
    public List<Publications> getAllPublications() {
        return publicationsService.getAllActivePublications();
    }

    @GetMapping("/getAllPublications/{id}")
    public Publications getPublicationById(@PathVariable Long id) {
        Publications publication = publicationsService.getPublicationById(id);
        publicationsService.incrementViewCount(id);
        return publication;
    }

    @PostMapping("/createPublication")
    public Publications createPublication(@RequestBody Publications publication) {
        return publicationsService.createPublication(publication);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePublication(@PathVariable Long id) {
        publicationsService.deletePublication(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/editPublication/{id}")
    public ResponseEntity<Publications> editPublication(@PathVariable Long id, @RequestBody Publications updatedPublication) {
        Publications existingPublication = publicationsService.getPublicationById(id);

        existingPublication.setTitle(updatedPublication.getTitle());
        existingPublication.setDescription(updatedPublication.getDescription());
        existingPublication.setImages(updatedPublication.getImages());

        Publications savedPublication = publicationsService.createPublication(existingPublication);
        return ResponseEntity.ok(savedPublication);
    }
}
