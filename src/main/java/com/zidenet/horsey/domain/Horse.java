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
@Table(name = "horse")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Horse implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Size(max = 500)
    @Column(name = "photo", length = 500)
    private String photo;

    @NotNull
    @Size(max = 100)
    @Column(name = "full_name", length = 100, nullable = false)
    private String fullName;

    @Size(max = 50)
    @Column(name = "phone_number", length = 50)
    private String phoneNumber;

    @Size(max = 50)
    @Column(name = "email", length = 50)
    private String email;

    @Max(value = 150)
    @Column(name = "age")
    private Integer age;

    @Max(value = 99999)
    @Column(name = "height")
    private Integer height;

    @Max(value = 99999)
    @Column(name = "weight")
    private Integer weight;

    @Size(max = 100)
    @Column(name = "breed", length = 100)
    private String breed;

    @Max(value = 99)
    @Column(name = "years_been_ridden")
    private Integer yearsBeenRidden;

    @Size(max = 60)
    @Column(name = "color", length = 60)
    private String color;

    @Size(max = 1500)
    @Column(name = "description", length = 1500)
    private String description;

    @Max(value = 20)
    @Column(name = "appropriate_level_experience")
    private Integer appropriateLevelExperience;

    @Max(value = 99)
    @Column(name = "rider_accepted_age")
    private Integer riderAcceptedAge;

    @Max(value = 99999)
    @Column(name = "rider_accepted_weight")
    private Integer riderAcceptedWeight;

    @Max(value = 99999)
    @Column(name = "rider_accepted_height")
    private Integer riderAcceptedHeight;

    @Max(value = 9000)
    @Column(name = "rate")
    private Integer rate;

    @Column(name = "riding_equipment_included")
    private Boolean ridingEquipmentIncluded;

    @Size(max = 50)
    @Column(name = "gender", length = 50)
    private String gender;

    @Size(max = 50)
    @Column(name = "temperament", length = 50)
    private String temperament;

    @Size(max = 50)
    @Column(name = "horse_type", length = 50)
    private String horseType;

    @Size(max = 999)
    @Column(name = "knowledge_before_ride", length = 999)
    private String knowledgeBeforeRide;

    @Column(name = "insurance")
    private Boolean insurance;

    @Column(name = "show_owner")
    private Boolean showOwner;

    @Column(name = "show_in_public")
    private Boolean showInPublic;

    @Column(name = "show_pictures_in_bank")
    private Boolean showPicturesInBank;

    @JsonIgnoreProperties(value = { "horseOwner", "rider" }, allowSetters = true)
    @OneToOne
    @JoinColumn(unique = true)
    private Address address;

    @OneToOne
    @JoinColumn(unique = true)
    private Fears fears;

    @OneToMany(mappedBy = "horse")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(
        value = { "address", "eventTypes", "activityTypes", "lessonTypes", "horseOwner", "rider", "horse" },
        allowSetters = true
    )
    private Set<Booking> bookings = new HashSet<>();

    @OneToMany(mappedBy = "horse")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "horseOwner", "rider", "horse", "courtyard", "stable", "box" }, allowSetters = true)
    private Set<Image> images = new HashSet<>();

    @OneToMany(mappedBy = "horse")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "horse", "booking", "ridingWishes" }, allowSetters = true)
    private Set<EventType> eventTypes = new HashSet<>();

    @OneToMany(mappedBy = "horse")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "horse", "booking", "ridingWishes" }, allowSetters = true)
    private Set<ActivityType> activityTypes = new HashSet<>();

    @OneToMany(mappedBy = "horse")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "horse", "booking", "ridingWishes" }, allowSetters = true)
    private Set<LessonType> lessonTypes = new HashSet<>();

    @OneToMany(mappedBy = "horse")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "rider", "horse", "ridingWishes" }, allowSetters = true)
    private Set<CompetitionType> competitionTypes = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "user", "horses", "courtyards", "addresses", "images", "bookings" }, allowSetters = true)
    private HorseOwner horseOwner;

    @ManyToOne
    @JsonIgnoreProperties(value = { "horses", "images", "stable" }, allowSetters = true)
    private Box box;

    public Long getId() {
        return this.id;
    }

    public Horse id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPhoto() {
        return this.photo;
    }

    public Horse photo(String photo) {
        this.setPhoto(photo);
        return this;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public String getFullName() {
        return this.fullName;
    }

    public Horse fullName(String fullName) {
        this.setFullName(fullName);
        return this;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getPhoneNumber() {
        return this.phoneNumber;
    }

    public Horse phoneNumber(String phoneNumber) {
        this.setPhoneNumber(phoneNumber);
        return this;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return this.email;
    }

    public Horse email(String email) {
        this.setEmail(email);
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getAge() {
        return this.age;
    }

    public Horse age(Integer age) {
        this.setAge(age);
        return this;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Integer getHeight() {
        return this.height;
    }

    public Horse height(Integer height) {
        this.setHeight(height);
        return this;
    }

    public void setHeight(Integer height) {
        this.height = height;
    }

    public Integer getWeight() {
        return this.weight;
    }

    public Horse weight(Integer weight) {
        this.setWeight(weight);
        return this;
    }

    public void setWeight(Integer weight) {
        this.weight = weight;
    }

    public String getBreed() {
        return this.breed;
    }

    public Horse breed(String breed) {
        this.setBreed(breed);
        return this;
    }

    public void setBreed(String breed) {
        this.breed = breed;
    }

    public Integer getYearsBeenRidden() {
        return this.yearsBeenRidden;
    }

    public Horse yearsBeenRidden(Integer yearsBeenRidden) {
        this.setYearsBeenRidden(yearsBeenRidden);
        return this;
    }

    public void setYearsBeenRidden(Integer yearsBeenRidden) {
        this.yearsBeenRidden = yearsBeenRidden;
    }

    public String getColor() {
        return this.color;
    }

    public Horse color(String color) {
        this.setColor(color);
        return this;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getDescription() {
        return this.description;
    }

    public Horse description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getAppropriateLevelExperience() {
        return this.appropriateLevelExperience;
    }

    public Horse appropriateLevelExperience(Integer appropriateLevelExperience) {
        this.setAppropriateLevelExperience(appropriateLevelExperience);
        return this;
    }

    public void setAppropriateLevelExperience(Integer appropriateLevelExperience) {
        this.appropriateLevelExperience = appropriateLevelExperience;
    }

    public Integer getRiderAcceptedAge() {
        return this.riderAcceptedAge;
    }

    public Horse riderAcceptedAge(Integer riderAcceptedAge) {
        this.setRiderAcceptedAge(riderAcceptedAge);
        return this;
    }

    public void setRiderAcceptedAge(Integer riderAcceptedAge) {
        this.riderAcceptedAge = riderAcceptedAge;
    }

    public Integer getRiderAcceptedWeight() {
        return this.riderAcceptedWeight;
    }

    public Horse riderAcceptedWeight(Integer riderAcceptedWeight) {
        this.setRiderAcceptedWeight(riderAcceptedWeight);
        return this;
    }

    public void setRiderAcceptedWeight(Integer riderAcceptedWeight) {
        this.riderAcceptedWeight = riderAcceptedWeight;
    }

    public Integer getRiderAcceptedHeight() {
        return this.riderAcceptedHeight;
    }

    public Horse riderAcceptedHeight(Integer riderAcceptedHeight) {
        this.setRiderAcceptedHeight(riderAcceptedHeight);
        return this;
    }

    public void setRiderAcceptedHeight(Integer riderAcceptedHeight) {
        this.riderAcceptedHeight = riderAcceptedHeight;
    }

    public Integer getRate() {
        return this.rate;
    }

    public Horse rate(Integer rate) {
        this.setRate(rate);
        return this;
    }

    public void setRate(Integer rate) {
        this.rate = rate;
    }

    public Boolean getRidingEquipmentIncluded() {
        return this.ridingEquipmentIncluded;
    }

    public Horse ridingEquipmentIncluded(Boolean ridingEquipmentIncluded) {
        this.setRidingEquipmentIncluded(ridingEquipmentIncluded);
        return this;
    }

    public void setRidingEquipmentIncluded(Boolean ridingEquipmentIncluded) {
        this.ridingEquipmentIncluded = ridingEquipmentIncluded;
    }

    public String getGender() {
        return this.gender;
    }

    public Horse gender(String gender) {
        this.setGender(gender);
        return this;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getTemperament() {
        return this.temperament;
    }

    public Horse temperament(String temperament) {
        this.setTemperament(temperament);
        return this;
    }

    public void setTemperament(String temperament) {
        this.temperament = temperament;
    }

    public String getHorseType() {
        return this.horseType;
    }

    public Horse horseType(String horseType) {
        this.setHorseType(horseType);
        return this;
    }

    public void setHorseType(String horseType) {
        this.horseType = horseType;
    }

    public String getKnowledgeBeforeRide() {
        return this.knowledgeBeforeRide;
    }

    public Horse knowledgeBeforeRide(String knowledgeBeforeRide) {
        this.setKnowledgeBeforeRide(knowledgeBeforeRide);
        return this;
    }

    public void setKnowledgeBeforeRide(String knowledgeBeforeRide) {
        this.knowledgeBeforeRide = knowledgeBeforeRide;
    }

    public Boolean getInsurance() {
        return this.insurance;
    }

    public Horse insurance(Boolean insurance) {
        this.setInsurance(insurance);
        return this;
    }

    public void setInsurance(Boolean insurance) {
        this.insurance = insurance;
    }

    public Boolean getShowOwner() {
        return this.showOwner;
    }

    public Horse showOwner(Boolean showOwner) {
        this.setShowOwner(showOwner);
        return this;
    }

    public void setShowOwner(Boolean showOwner) {
        this.showOwner = showOwner;
    }

    public Boolean getShowInPublic() {
        return this.showInPublic;
    }

    public Horse showInPublic(Boolean showInPublic) {
        this.setShowInPublic(showInPublic);
        return this;
    }

    public void setShowInPublic(Boolean showInPublic) {
        this.showInPublic = showInPublic;
    }

    public Boolean getShowPicturesInBank() {
        return this.showPicturesInBank;
    }

    public Horse showPicturesInBank(Boolean showPicturesInBank) {
        this.setShowPicturesInBank(showPicturesInBank);
        return this;
    }

    public void setShowPicturesInBank(Boolean showPicturesInBank) {
        this.showPicturesInBank = showPicturesInBank;
    }

    public Address getAddress() {
        return this.address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public Horse address(Address address) {
        this.setAddress(address);
        return this;
    }

    public Fears getFears() {
        return this.fears;
    }

    public void setFears(Fears fears) {
        this.fears = fears;
    }

    public Horse fears(Fears fears) {
        this.setFears(fears);
        return this;
    }

    public Set<Booking> getBookings() {
        return this.bookings;
    }

    public void setBookings(Set<Booking> bookings) {
        if (this.bookings != null) {
            this.bookings.forEach(i -> i.setHorse(null));
        }
        if (bookings != null) {
            bookings.forEach(i -> i.setHorse(this));
        }
        this.bookings = bookings;
    }

    public Horse bookings(Set<Booking> bookings) {
        this.setBookings(bookings);
        return this;
    }

    public Horse addBookings(Booking booking) {
        this.bookings.add(booking);
        booking.setHorse(this);
        return this;
    }

    public Horse removeBookings(Booking booking) {
        this.bookings.remove(booking);
        booking.setHorse(null);
        return this;
    }

    public Set<Image> getImages() {
        return this.images;
    }

    public void setImages(Set<Image> images) {
        if (this.images != null) {
            this.images.forEach(i -> i.setHorse(null));
        }
        if (images != null) {
            images.forEach(i -> i.setHorse(this));
        }
        this.images = images;
    }

    public Horse images(Set<Image> images) {
        this.setImages(images);
        return this;
    }

    public Horse addImages(Image image) {
        this.images.add(image);
        image.setHorse(this);
        return this;
    }

    public Horse removeImages(Image image) {
        this.images.remove(image);
        image.setHorse(null);
        return this;
    }

    public Set<EventType> getEventTypes() {
        return this.eventTypes;
    }

    public void setEventTypes(Set<EventType> eventTypes) {
        if (this.eventTypes != null) {
            this.eventTypes.forEach(i -> i.setHorse(null));
        }
        if (eventTypes != null) {
            eventTypes.forEach(i -> i.setHorse(this));
        }
        this.eventTypes = eventTypes;
    }

    public Horse eventTypes(Set<EventType> eventTypes) {
        this.setEventTypes(eventTypes);
        return this;
    }

    public Horse addEventTypes(EventType eventType) {
        this.eventTypes.add(eventType);
        eventType.setHorse(this);
        return this;
    }

    public Horse removeEventTypes(EventType eventType) {
        this.eventTypes.remove(eventType);
        eventType.setHorse(null);
        return this;
    }

    public Set<ActivityType> getActivityTypes() {
        return this.activityTypes;
    }

    public void setActivityTypes(Set<ActivityType> activityTypes) {
        if (this.activityTypes != null) {
            this.activityTypes.forEach(i -> i.setHorse(null));
        }
        if (activityTypes != null) {
            activityTypes.forEach(i -> i.setHorse(this));
        }
        this.activityTypes = activityTypes;
    }

    public Horse activityTypes(Set<ActivityType> activityTypes) {
        this.setActivityTypes(activityTypes);
        return this;
    }

    public Horse addActivityTypes(ActivityType activityType) {
        this.activityTypes.add(activityType);
        activityType.setHorse(this);
        return this;
    }

    public Horse removeActivityTypes(ActivityType activityType) {
        this.activityTypes.remove(activityType);
        activityType.setHorse(null);
        return this;
    }

    public Set<LessonType> getLessonTypes() {
        return this.lessonTypes;
    }

    public void setLessonTypes(Set<LessonType> lessonTypes) {
        if (this.lessonTypes != null) {
            this.lessonTypes.forEach(i -> i.setHorse(null));
        }
        if (lessonTypes != null) {
            lessonTypes.forEach(i -> i.setHorse(this));
        }
        this.lessonTypes = lessonTypes;
    }

    public Horse lessonTypes(Set<LessonType> lessonTypes) {
        this.setLessonTypes(lessonTypes);
        return this;
    }

    public Horse addLessonTypes(LessonType lessonType) {
        this.lessonTypes.add(lessonType);
        lessonType.setHorse(this);
        return this;
    }

    public Horse removeLessonTypes(LessonType lessonType) {
        this.lessonTypes.remove(lessonType);
        lessonType.setHorse(null);
        return this;
    }

    public Set<CompetitionType> getCompetitionTypes() {
        return this.competitionTypes;
    }

    public void setCompetitionTypes(Set<CompetitionType> competitionTypes) {
        if (this.competitionTypes != null) {
            this.competitionTypes.forEach(i -> i.setHorse(null));
        }
        if (competitionTypes != null) {
            competitionTypes.forEach(i -> i.setHorse(this));
        }
        this.competitionTypes = competitionTypes;
    }

    public Horse competitionTypes(Set<CompetitionType> competitionTypes) {
        this.setCompetitionTypes(competitionTypes);
        return this;
    }

    public Horse addCompetitionTypes(CompetitionType competitionType) {
        this.competitionTypes.add(competitionType);
        competitionType.setHorse(this);
        return this;
    }

    public Horse removeCompetitionTypes(CompetitionType competitionType) {
        this.competitionTypes.remove(competitionType);
        competitionType.setHorse(null);
        return this;
    }

    public HorseOwner getHorseOwner() {
        return this.horseOwner;
    }

    public void setHorseOwner(HorseOwner horseOwner) {
        this.horseOwner = horseOwner;
    }

    public Horse horseOwner(HorseOwner horseOwner) {
        this.setHorseOwner(horseOwner);
        return this;
    }

    public Box getBox() {
        return this.box;
    }

    public void setBox(Box box) {
        this.box = box;
    }

    public Horse box(Box box) {
        this.setBox(box);
        return this;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Horse)) {
            return false;
        }
        return id != null && id.equals(((Horse) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Horse{" +
            "id=" + getId() +
            ", photo='" + getPhoto() + "'" +
            ", fullName='" + getFullName() + "'" +
            ", phoneNumber='" + getPhoneNumber() + "'" +
            ", email='" + getEmail() + "'" +
            ", age=" + getAge() +
            ", height=" + getHeight() +
            ", weight=" + getWeight() +
            ", breed='" + getBreed() + "'" +
            ", yearsBeenRidden=" + getYearsBeenRidden() +
            ", color='" + getColor() + "'" +
            ", description='" + getDescription() + "'" +
            ", appropriateLevelExperience=" + getAppropriateLevelExperience() +
            ", riderAcceptedAge=" + getRiderAcceptedAge() +
            ", riderAcceptedWeight=" + getRiderAcceptedWeight() +
            ", riderAcceptedHeight=" + getRiderAcceptedHeight() +
            ", rate=" + getRate() +
            ", ridingEquipmentIncluded='" + getRidingEquipmentIncluded() + "'" +
            ", gender='" + getGender() + "'" +
            ", temperament='" + getTemperament() + "'" +
            ", horseType='" + getHorseType() + "'" +
            ", knowledgeBeforeRide='" + getKnowledgeBeforeRide() + "'" +
            ", insurance='" + getInsurance() + "'" +
            ", showOwner='" + getShowOwner() + "'" +
            ", showInPublic='" + getShowInPublic() + "'" +
            ", showPicturesInBank='" + getShowPicturesInBank() + "'" +
            "}";
    }
}
