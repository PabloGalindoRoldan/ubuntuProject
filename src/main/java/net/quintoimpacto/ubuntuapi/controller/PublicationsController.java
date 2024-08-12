package net.quintoimpacto.ubuntuapi.controller;

import net.quintoimpacto.ubuntuapi.entity.Publications;
import net.quintoimpacto.ubuntuapi.service.IPublicationsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

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
        return publicationsService.getPublicationById(id);
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

    @PutMapping("/incrementViewCount/{id}")
    public ResponseEntity<?> incrementViewCount(@PathVariable Long id) {
        publicationsService.incrementViewCount(id);
        return ResponseEntity.ok().build(); //aca debo agregar que al estado me muestre los datos del dto
    }
}
