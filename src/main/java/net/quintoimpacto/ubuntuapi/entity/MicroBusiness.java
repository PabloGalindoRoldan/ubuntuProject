package net.quintoimpacto.ubuntuapi.entity;

import lombok.NoArgsConstructor;

import java.util.List;

import org.hibernate.annotations.DynamicInsert;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import lombok.Setter;
import net.quintoimpacto.ubuntuapi.entity.enums.Category;

@Entity
@Table(name = "micro_businesses")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@DynamicInsert
public class MicroBusiness {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Name cannot be null")
    @NotBlank(message = "Name is mandatory")
    private String name;

    private String description;

    private String moreInformation;

    @Column(columnDefinition = "boolean default false")
    private boolean deleted;

    @Column(columnDefinition = "boolean default false")
    private boolean managed;

    @NotNull(message = "Category cannot be null")
    @NotBlank(message = "Category is mandatory")
    private Category category;

    @Transient
    private String city;

    @Transient
    private List<String>  urlImage;

    @Transient
    private String contactMessage;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false )
    private User user;

    @ManyToOne
    @JoinColumn(name = "country_id", nullable = false)
    private Country country;

    @ManyToOne
    @JoinColumn(name = "province_id", nullable = false)
    private Province province;

}
