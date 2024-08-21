package net.quintoimpacto.ubuntuapi.controller;

import net.quintoimpacto.ubuntuapi.dto.ImageDTO;
import net.quintoimpacto.ubuntuapi.service.CloudinaryService;
import net.quintoimpacto.ubuntuapi.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/images")
public class ImageController {

    @Autowired
    private ImageService imageService;

    @Autowired
    private CloudinaryService cloudinaryService;

    @PostMapping("/uploadBase64")
    public ResponseEntity<?> uploadBase64File(@RequestBody() ImageDTO imageDTO) {
        try {
            Map<String, Object> result = cloudinaryService.uploadBase64File(imageDTO.getFileBase64());

            ImageDTO image2DTO = new ImageDTO();
            image2DTO.setPublicId((String) result.get("public_id"));
            image2DTO.setUrl((String) result.get("url"));

            ImageDTO savedImage = imageService.saveImageWithMicroBusiness(imageDTO.getMicroBusinessId(), image2DTO);

            System.out.println("Imagen Base64 subida y guardada en la base de datos con ID: " + savedImage.getId()
                    + " y asociada al microemprendimiento con ID: " + imageDTO.getMicroBusinessId());

            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("No se pudo subir el archivo: " + e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<ImageDTO> createImage(@RequestBody ImageDTO imageDTO) {
        ImageDTO savedImage;
        if (imageDTO.getMicroBusinessId() != null) {
            savedImage = imageService.saveImageWithMicroBusiness(imageDTO.getMicroBusinessId(), imageDTO);
        } else {
            savedImage = imageService.saveImageWithPublication(imageDTO.getPublicationId(), imageDTO);
        }

        return ResponseEntity.ok(savedImage);
    }

    @PostMapping("/uploadForPublication")
    public ResponseEntity<?> uploadImageForPublication(@RequestBody ImageDTO imageDTO) {
        try {
            Map<String, Object> result = cloudinaryService.uploadBase64File(imageDTO.getFileBase64());

            ImageDTO image2DTO = new ImageDTO();
            image2DTO.setPublicId((String) result.get("public_id"));
            image2DTO.setUrl((String) result.get("url"));

            ImageDTO savedImage = imageService.saveImageWithPublication(imageDTO.getPublicationId(), image2DTO);

            Map<String, Object> response = new HashMap<>();
            response.put("internalId", savedImage.getId()); 
            response.put("publicId", savedImage.getPublicId());
            response.put("url", savedImage.getUrl());

            System.out.println("Imagen Base64 subida y guardada en la base de datos con ID: " + savedImage.getId()
                    + " y asociada a la publicación con ID: " + imageDTO.getPublicationId());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("No se pudo subir el archivo: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ImageDTO> getImageById(@PathVariable Long id) {
        Optional<ImageDTO> imageDTO = imageService.findImageById(id);
        return imageDTO.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<ImageDTO>> getAllImages() {
        List<ImageDTO> images = imageService.findAllImages();
        return ResponseEntity.ok(images);
    }

    @PutMapping("/updateBase64/{id}")
    public ResponseEntity<?> updateImageBase64(@PathVariable Long id, @RequestBody ImageDTO imageDTO) {
        try {
            String fileBase64 = imageDTO.getFileBase64();

            Optional<ImageDTO> existingImageOptional = imageService.findImageById(id);
            if (!existingImageOptional.isPresent()) {
                return ResponseEntity.notFound().build();
            }

            ImageDTO existingImage = existingImageOptional.get();

            // Eliminar la imagen anterior de Cloudinary
            cloudinaryService.deleteImageByPublicId(existingImage.getPublicId());

            // Subir la nueva imagen a Cloudinary
            Map<String, Object> result = cloudinaryService.uploadBase64File(fileBase64);

            // Actualizar los detalles de la imagen en la base de datos
            existingImage.setPublicId((String) result.get("public_id"));
            existingImage.setUrl((String) result.get("url"));

            ImageDTO updatedImage = imageService.updateImage(id, existingImage.getUrl(), existingImage.getPublicId());

            return ResponseEntity.ok(updatedImage);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("No se pudo actualizar la imagen: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteImage(@PathVariable Long id) {
        try {
            // Eliminar la imagen de la base de datos y de Cloudinary
            imageService.deleteImage(id);
            System.out.println("Imagen eliminada con ID: " + id);

            // Devolver una respuesta 200 OK con un mensaje personalizado
            return ResponseEntity.ok("Imagen eliminada con ID: " + id);
        } catch (Exception e) {
            // Si ocurre algún error, devolver una respuesta 400 con el mensaje de error
            return ResponseEntity.badRequest()
                    .body("No se pudo eliminar la imagen con ID: " + id + ". Error: " + e.getMessage());
        }
    }
}