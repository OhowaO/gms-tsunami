package com.gms.tsunami.domain;

import com.gms.tsunami.domain.enumeration.ResidentialPropertyType;
import java.io.Serializable;
import java.time.Instant;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A InviteData.
 */
@Entity
@Table(name = "invite_data")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class InviteData implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "start")
    private Instant start;

    @Column(name = "stop")
    private Instant stop;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "property_type", nullable = false)
    private ResidentialPropertyType propertyType;

    @NotNull
    @Column(name = "house_number", nullable = false)
    private String houseNumber;

    @Column(name = "block")
    private String block;

    @Column(name = "apartment_name")
    private String apartmentName;

    @NotNull
    @Column(name = "street_name", nullable = false)
    private String streetName;

    @OneToOne
    @JoinColumn(unique = true)
    private Invite start;

    @OneToOne
    @JoinColumn(unique = true)
    private Invite stop;

    @OneToOne
    @JoinColumn(unique = true)
    private Invite houseNumber;

    @OneToOne
    @JoinColumn(unique = true)
    private Invite block;

    @OneToOne
    @JoinColumn(unique = true)
    private Invite apartmentName;

    @OneToOne
    @JoinColumn(unique = true)
    private Invite streetName;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getStart() {
        return start;
    }

    public InviteData start(Instant start) {
        this.start = start;
        return this;
    }

    public void setStart(Instant start) {
        this.start = start;
    }

    public Instant getStop() {
        return stop;
    }

    public InviteData stop(Instant stop) {
        this.stop = stop;
        return this;
    }

    public void setStop(Instant stop) {
        this.stop = stop;
    }

    public ResidentialPropertyType getPropertyType() {
        return propertyType;
    }

    public InviteData propertyType(ResidentialPropertyType propertyType) {
        this.propertyType = propertyType;
        return this;
    }

    public void setPropertyType(ResidentialPropertyType propertyType) {
        this.propertyType = propertyType;
    }

    public String getHouseNumber() {
        return houseNumber;
    }

    public InviteData houseNumber(String houseNumber) {
        this.houseNumber = houseNumber;
        return this;
    }

    public void setHouseNumber(String houseNumber) {
        this.houseNumber = houseNumber;
    }

    public String getBlock() {
        return block;
    }

    public InviteData block(String block) {
        this.block = block;
        return this;
    }

    public void setBlock(String block) {
        this.block = block;
    }

    public String getApartmentName() {
        return apartmentName;
    }

    public InviteData apartmentName(String apartmentName) {
        this.apartmentName = apartmentName;
        return this;
    }

    public void setApartmentName(String apartmentName) {
        this.apartmentName = apartmentName;
    }

    public String getStreetName() {
        return streetName;
    }

    public InviteData streetName(String streetName) {
        this.streetName = streetName;
        return this;
    }

    public void setStreetName(String streetName) {
        this.streetName = streetName;
    }

    public Invite getStart() {
        return start;
    }

    public InviteData start(Invite invite) {
        this.start = invite;
        return this;
    }

    public void setStart(Invite invite) {
        this.start = invite;
    }

    public Invite getStop() {
        return stop;
    }

    public InviteData stop(Invite invite) {
        this.stop = invite;
        return this;
    }

    public void setStop(Invite invite) {
        this.stop = invite;
    }

    public Invite getHouseNumber() {
        return houseNumber;
    }

    public InviteData houseNumber(Invite invite) {
        this.houseNumber = invite;
        return this;
    }

    public void setHouseNumber(Invite invite) {
        this.houseNumber = invite;
    }

    public Invite getBlock() {
        return block;
    }

    public InviteData block(Invite invite) {
        this.block = invite;
        return this;
    }

    public void setBlock(Invite invite) {
        this.block = invite;
    }

    public Invite getApartmentName() {
        return apartmentName;
    }

    public InviteData apartmentName(Invite invite) {
        this.apartmentName = invite;
        return this;
    }

    public void setApartmentName(Invite invite) {
        this.apartmentName = invite;
    }

    public Invite getStreetName() {
        return streetName;
    }

    public InviteData streetName(Invite invite) {
        this.streetName = invite;
        return this;
    }

    public void setStreetName(Invite invite) {
        this.streetName = invite;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof InviteData)) {
            return false;
        }
        return id != null && id.equals(((InviteData) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "InviteData{" +
            "id=" + getId() +
            ", start='" + getStart() + "'" +
            ", stop='" + getStop() + "'" +
            ", propertyType='" + getPropertyType() + "'" +
            ", houseNumber='" + getHouseNumber() + "'" +
            ", block='" + getBlock() + "'" +
            ", apartmentName='" + getApartmentName() + "'" +
            ", streetName='" + getStreetName() + "'" +
            "}";
    }
}
