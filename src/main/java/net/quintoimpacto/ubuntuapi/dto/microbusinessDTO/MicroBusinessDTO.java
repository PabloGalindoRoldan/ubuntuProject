package net.quintoimpacto.ubuntuapi.dto.microbusinessDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.quintoimpacto.ubuntuapi.dto.ImageDTO;
import java.time.LocalDateTime;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MicroBusinessDTO {

    private Long id;

    private String name;

    private String description;

    private String moreInformation;

    private String subTitle;

    private String categoryDescription;

    private String userFirst_name;

    private String provinceName;

    private String provinceCountryName;

    private List<ImageDTO> images;

    private LocalDateTime createdDate;

    private boolean managed;

    private boolean deleted;
}