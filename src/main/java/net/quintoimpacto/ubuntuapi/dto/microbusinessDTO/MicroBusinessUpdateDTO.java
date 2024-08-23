package net.quintoimpacto.ubuntuapi.dto.microbusinessDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.quintoimpacto.ubuntuapi.entity.Image;
import net.quintoimpacto.ubuntuapi.entity.Province;
import net.quintoimpacto.ubuntuapi.entity.User;
import net.quintoimpacto.ubuntuapi.entity.enums.Category;

import java.util.List;


import jakarta.validation.constraints.NotNull;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MicroBusinessUpdateDTO {

    @NotNull(message = "Name cannot be null")
    private String name;

    private String description;

    private String moreInformation;

    private String subTitle;

    private Category category;

    private User user;

    private Province province;

    private List<Image> images;

    private boolean managed;

    private boolean deleted;
}