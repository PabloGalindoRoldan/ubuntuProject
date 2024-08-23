package net.quintoimpacto.ubuntuapi.dto.microbusinessDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MicroBusinessDTOEmail {
    
    private String name;

    private String description;

    private String moreInformation;

    private String subTitle;

    private String categoryDescription;
}
