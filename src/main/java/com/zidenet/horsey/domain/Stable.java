package com.zidenet.horsey.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

@Entity
@Table(name = "stable")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Stable implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Size(max = 500)
    @Column(name = "photo", length = 500)
    private String photo;

    @Size(max = 100)
    @Column(name = "name", length = 100)
    private String name;

    @Size(max = 999)
    @Column(name = "description", length = 999)
    private String description;

    @Max(value = 9000)
    @Column(name = "build_year")
    private Integer buildYear;

    @Size(max = 999)
    @Column(name = "riding_equipment", length = 999)
    private String ridingEquipment;

    @Column(name = "show_in_public")
    private Boolean showInPublic;

    @OneToMany(mappedBy = "stable")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "horseOwner", "rider", "horse", "courtyard", "stable", "box" }, allowSetters = true)
    private Set<Image> images = new HashSet<>();

    @OneToMany(mappedBy = "stable")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "horses", "images", "stable" }, allowSetters = true)
    private Set<Box> boxes = new HashSet<>();

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = { "address", "images", "stables", "horseOwner" }, allowSetters = true)
    private Courtyard courtyard;

    public Long getId() {
        return this.id;
    }

    public Stable id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPhoto() {
        return this.photo;
    }

    public Stable photo(String photo) {
        this.setPhoto(photo);
        return this;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public String getName() {
        return this.name;
    }

    public Stable name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return this.description;
    }

    public Stable description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getBuildYear() {
        return this.buildYear;
    }

    public Stable buildYear(Integer buildYear) {
        this.setBuildYear(buildYear);
        return this;
    }

    public void setBuildYear(Integer buildYear) {
        this.buildYear = buildYear;
    }

    public String getRidingEquipment() {
        return this.ridingEquipment;
    }

    public Stable ridingEquipment(String ridingEquipment) {
        this.setRidingEquipment(ridingEquipment);
        return this;
    }

    public void setRidingEquipment(String ridingEquipment) {
        this.ridingEquipment = ridingEquipment;
    }

    public Boolean getShowInPublic() {
        return this.showInPublic;
    }

    public Stable showInPublic(Boolean showInPublic) {
        this.setShowInPublic(showInPublic);
        return this;
    }

    public void setShowInPublic(Boolean showInPublic) {
        this.showInPublic = showInPublic;
    }

    public Set<Image> getImages() {
        return this.images;
    }

    public void setImages(Set<Image> images) {
        if (this.images != null) {
            this.images.forEach(i -> i.setStable(null));
        }
        if (images != null) {
            images.forEach(i -> i.setStable(this));
        }
        this.images = images;
    }

    public Stable images(Set<Image> images) {
        this.setImages(images);
        return this;
    }

    public Stable addImages(Image image) {
        this.images.add(image);
        image.setStable(this);
        return this;
    }

    public Stable removeImages(Image image) {
        this.images.remove(image);
        image.setStable(null);
        return this;
    }

    public Set<Box> getBoxes() {
        return this.boxes;
    }

    public void setBoxes(Set<Box> boxes) {
        if (this.boxes != null) {
            this.boxes.forEach(i -> i.setStable(null));
        }
        if (boxes != null) {
            boxes.forEach(i -> i.setStable(this));
        }
        this.boxes = boxes;
    }

    public Stable boxes(Set<Box> boxes) {
        this.setBoxes(boxes);
        return this;
    }

    public Stable addBoxes(Box box) {
        this.boxes.add(box);
        box.setStable(this);
        return this;
    }

    public Stable removeBoxes(Box box) {
        this.boxes.remove(box);
        box.setStable(null);
        return this;
    }

    public Courtyard getCourtyard() {
        return this.courtyard;
    }

    public void setCourtyard(Courtyard courtyard) {
        this.courtyard = courtyard;
    }

    public Stable courtyard(Courtyard courtyard) {
        this.setCourtyard(courtyard);
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Stable)) {
            return false;
        }
        return id != null && id.equals(((Stable) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Stable{" +
            "id=" + getId() +
            ", photo='" + getPhoto() + "'" +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", buildYear=" + getBuildYear() +
            ", ridingEquipment='" + getRidingEquipment() + "'" +
            ", showInPublic='" + getShowInPublic() + "'" +
            "}";
    }
}
