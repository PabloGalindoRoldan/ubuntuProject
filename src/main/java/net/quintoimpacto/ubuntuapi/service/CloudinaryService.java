package net.quintoimpacto.ubuntuapi.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.Map;

@Service
public class CloudinaryService {

    @Autowired
    private Cloudinary cloudinary;

    public Map uploadFile(MultipartFile file) throws IOException {
        return cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
    }

    public Map uploadBase64File(String base64File) throws IOException {
        // Verificar si el string contiene un encabezado de datos Base64 y eliminarlo si es necesario
        if (base64File.contains(",")) {
            base64File = base64File.split(",")[1]; // Extraer solo la parte Base64
        }

        byte[] decodedBytes = Base64.getDecoder().decode(base64File);
        return cloudinary.uploader().upload(decodedBytes, ObjectUtils.emptyMap());
    }

    public Map deleteImageByPublicId(String publicId) throws IOException {
        return cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
    }
}
