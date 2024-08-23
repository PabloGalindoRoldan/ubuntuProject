package net.quintoimpacto.ubuntuapi.mapper;

import net.quintoimpacto.ubuntuapi.chatbot.dto.QuestionDTO;
import net.quintoimpacto.ubuntuapi.chatbot.entity.Question;
import net.quintoimpacto.ubuntuapi.dto.CategoryDTO;
import net.quintoimpacto.ubuntuapi.entity.enums.Category;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.spi.MappingContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelMapperConfig {

    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();

        // Configuración para Category
        Converter<Category, CategoryDTO> categoryToDtoConverter = new Converter<Category, CategoryDTO>() {
            @Override
            public CategoryDTO convert(MappingContext<Category, CategoryDTO> context) {
                Category source = context.getSource();
                return new CategoryDTO(source.name(), source.getDescription());
            }
        };
        modelMapper.addConverter(categoryToDtoConverter);

        modelMapper.typeMap(Question.class, QuestionDTO.class).addMappings(mapper -> {
            mapper.map(src -> {
                if (src.getHierarchy() != null) {
                    return src.getHierarchy().getDescription();
                } else {
                    return null;
                }
            }, QuestionDTO::setHierarchyDescription);
        });

        return modelMapper;
    }
}
