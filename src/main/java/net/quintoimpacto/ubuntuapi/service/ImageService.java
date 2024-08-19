package net.quintoimpacto.ubuntuapi.service;

import net.quintoimpacto.ubuntuapi.dto.ImageDTO;
import net.quintoimpacto.ubuntuapi.entity.Image;
import net.quintoimpacto.ubuntuapi.entity.MicroBusiness;
import net.quintoimpacto.ubuntuapi.entity.Publications;
import net.quintoimpacto.ubuntuapi.mapper.ImageMapper;
import net.quintoimpacto.ubuntuapi.repository.ImageRepository;
import net.quintoimpacto.ubuntuapi.repository.IMicroBusinessRepository;
import net.quintoimpacto.ubuntuapi.repository.IPublicationsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ImageService {

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private IMicroBusinessRepository microBusinessRepository;

    @Autowired
    private IPublicationsRepository publicationsRepository;

    @Autowired
    private ImageMapper imageMapper;

    public ImageDTO saveImage(ImageDTO imageDTO) {
        Image image = imageMapper.toEntity(imageDTO);
        Image savedImage = imageRepository.save(image);
        return imageMapper.toDTO(savedImage);
    }

    public Optional<ImageDTO> findImageById(Long id) {
        return imageRepository.findById(id).map(imageMapper::toDTO);
    }

    public Optional<ImageDTO> findImageByPublicId(String publicId) {
        return imageRepository.findByPublicId(publicId).map(imageMapper::toDTO);
    }

    public List<ImageDTO> findAllImages() {
        return imageRepository.findAll().stream().map(imageMapper::toDTO).collect(Collectors.toList());
    }

    public void deleteImage(Long id) {
        imageRepository.deleteById(id);
    }

    public ImageDTO updateImage(Long id, String newUrl, String newPublicId) {
        Optional<Image> existingImageOptional = imageRepository.findById(id);
        if (!existingImageOptional.isPresent()) {
            throw new RuntimeException("Image not found with ID: " + id);
        }
        Image existingImage = existingImageOptional.get();
        existingImage.setUrl(newUrl);
        existingImage.setPublicId(newPublicId);
        Image updatedImage = imageRepository.save(existingImage);
        return imageMapper.toDTO(updatedImage);
    }

    public ImageDTO saveImageWithMicroBusiness(Long microBusinessId, ImageDTO imageDTO) {
        Optional<MicroBusiness> microBusinessOptional = microBusinessRepository.findById(microBusinessId);
        if (microBusinessOptional.isPresent()) {
            MicroBusiness microBusiness = microBusinessOptional.get();
            Image image = imageMapper.toEntity(imageDTO);
            image.setMicroBusiness(microBusiness);
            Image savedImage = imageRepository.save(image);
            return imageMapper.toDTO(savedImage);
        } else {
            throw new RuntimeException("MicroBusiness not found with ID: " + microBusinessId);
        }
    }

    public ImageDTO saveImageWithPublication(Long publicationId, ImageDTO imageDTO) {
        Optional<Publications> publicationOptional = publicationsRepository.findById(publicationId);
        if (publicationOptional.isPresent()) {
            Publications publication = publicationOptional.get();
            Image image = imageMapper.toEntity(imageDTO);
            image.setPublication(publication);
            Image savedImage = imageRepository.save(image);
            return imageMapper.toDTO(savedImage);
        } else {
            throw new RuntimeException("Publication not found with ID: " + publicationId);
        }
    }
}