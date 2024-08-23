package net.quintoimpacto.ubuntuapi.chatbot.entity.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum Hierarchy {

    CONTACT("Contacto"),
    ADD_MICROBUSINESS("Sumar mi Microemprendimiento"),
    COSTS("Costo"),

    GENERAL("General");

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
