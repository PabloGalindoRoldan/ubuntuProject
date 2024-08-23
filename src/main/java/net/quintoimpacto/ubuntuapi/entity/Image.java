package net.quintoimpacto.ubuntuapi.entity;
import jakarta.persistence.*;
import lombok.*;


@Entity
@Table(name = "images")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String publicId;

    @Column(nullable = false)
    private String url;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "micro_business_id")
    private MicroBusiness microBusiness;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "publication_id")
    private Publications publication;

    @Override
    public String toString() {
        return "Image{" +
                "id=" + id +
                ", publicId='" + publicId + '\'' +
                ", url='" + url + '\'' +
                ", microBusiness=" + microBusiness +
                ", publication=" + publication +
                '}';
    }
}
