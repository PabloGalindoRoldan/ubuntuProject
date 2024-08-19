package net.quintoimpacto.ubuntuapi.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ImageDTO {
    private Long id;
    private String url;
    private String publicId;
    private Long microBusinessId;
    private Long publicationId; // Add this field
    private String fileBase64;
}