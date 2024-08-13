package net.quintoimpacto.ubuntuapi.chatbot.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum Hierarchy {

    CONTACT("¿Cómo puedo contactar a los emprendedores?"),
    ADD_MICROBUSINESS("¿Cómo sumar mi emprendimiento a Ubuntu?"),
    COSTS("¿Cúales son los costos de participar en Ubuntu?"),

    GENERAL("Otras preguntas");

    private String description;

    public static Hierarchy fromDescription(String description) {
        for (Hierarchy hierarchy : Hierarchy.values()) {
            if (hierarchy.getDescription().equals(description)) {
                return hierarchy;
            }
        }
        throw new IllegalArgumentException("No matching hierarchy for description: " + description);
    }
}
