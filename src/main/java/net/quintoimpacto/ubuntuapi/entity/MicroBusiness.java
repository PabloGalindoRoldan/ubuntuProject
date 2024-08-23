package net.quintoimpacto.ubuntuapi.entity;

import jakarta.persistence.*;
import lombok.NoArgsConstructor;

import java.util.List;

import org.hibernate.annotations.DynamicInsert;
import java.time.LocalDateTime;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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

    private String subTitle;

    @Column(columnDefinition = "boolean default false")
    private boolean deleted;

    @Column(columnDefinition = "boolean default false")
    private boolean managed;

    @NotNull(message = "Category cannot be null")
    @Enumerated(EnumType.STRING)
    private Category category;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false )
    private User user;

    @ManyToOne
    @JoinColumn(name = "country_id", nullable = true)
    private Country country;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "province_id", nullable = false)
    private Province province;

    @OneToMany(mappedBy = "microBusiness")
    private List<Image> images;

    @Column(name = "created_date", nullable = false)
    private LocalDateTime createdDate;

    @PrePersist
    protected void onCreate() {
        createdDate = LocalDateTime.now();
    }
}

