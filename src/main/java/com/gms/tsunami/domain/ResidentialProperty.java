package com.gms.tsunami.domain;

import com.gms.tsunami.domain.enumeration.Countries;
import com.gms.tsunami.domain.enumeration.ResidentialPropertyType;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A ResidentialProperty.
 */
@Entity
@Table(name = "residential_property")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class ResidentialProperty implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "residential_property_id", nullable = false)
    private Long residentialPropertyID;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private ResidentialPropertyType type;

    @NotNull
    @Column(name = "owner_id", nullable = false)
    private Long ownerID;

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

    @NotNull
    @Column(name = "city", nullable = false)
    private String city;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "country", nullable = false)
    private Countries country;

    @OneToMany(mappedBy = "residentialProperty")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Tenant> residentialPropertyIDS = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JoinTable(
        name = "residential_property_ownerid",
        joinColumns = @JoinColumn(name = "residential_property_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "ownerid_id", referencedColumnName = "id")
    )
    private Set<Owner> ownerIDS = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getResidentialPropertyID() {
        return residentialPropertyID;
    }

    public ResidentialProperty residentialPropertyID(Long residentialPropertyID) {
        this.residentialPropertyID = residentialPropertyID;
        return this;
    }

    public void setResidentialPropertyID(Long residentialPropertyID) {
        this.residentialPropertyID = residentialPropertyID;
    }

    public ResidentialPropertyType getType() {
        return type;
    }

    public ResidentialProperty type(ResidentialPropertyType type) {
        this.type = type;
        return this;
    }

    public void setType(ResidentialPropertyType type) {
        this.type = type;
    }

    public Long getOwnerID() {
        return ownerID;
    }

    public ResidentialProperty ownerID(Long ownerID) {
        this.ownerID = ownerID;
        return this;
    }

    public void setOwnerID(Long ownerID) {
        this.ownerID = ownerID;
    }

    public String getHouseNumber() {
        return houseNumber;
    }

    public ResidentialProperty houseNumber(String houseNumber) {
        this.houseNumber = houseNumber;
        return this;
    }

    public void setHouseNumber(String houseNumber) {
        this.houseNumber = houseNumber;
    }

    public String getBlock() {
        return block;
    }

    public ResidentialProperty block(String block) {
        this.block = block;
        return this;
    }

    public void setBlock(String block) {
        this.block = block;
    }

    public String getApartmentName() {
        return apartmentName;
    }

    public ResidentialProperty apartmentName(String apartmentName) {
        this.apartmentName = apartmentName;
        return this;
    }

    public void setApartmentName(String apartmentName) {
        this.apartmentName = apartmentName;
    }

    public String getStreetName() {
        return streetName;
    }

    public ResidentialProperty streetName(String streetName) {
        this.streetName = streetName;
        return this;
    }

    public void setStreetName(String streetName) {
        this.streetName = streetName;
    }

    public String getCity() {
        return city;
    }

    public ResidentialProperty city(String city) {
        this.city = city;
        return this;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public Countries getCountry() {
        return country;
    }

    public ResidentialProperty country(Countries country) {
        this.country = country;
        return this;
    }

    public void setCountry(Countries country) {
        this.country = country;
    }

    public Set<Tenant> getResidentialPropertyIDS() {
        return residentialPropertyIDS;
    }

    public ResidentialProperty residentialPropertyIDS(Set<Tenant> tenants) {
        this.residentialPropertyIDS = tenants;
        return this;
    }

    public ResidentialProperty addResidentialPropertyID(Tenant tenant) {
        this.residentialPropertyIDS.add(tenant);
        tenant.setResidentialProperty(this);
        return this;
    }

    public ResidentialProperty removeResidentialPropertyID(Tenant tenant) {
        this.residentialPropertyIDS.remove(tenant);
        tenant.setResidentialProperty(null);
        return this;
    }

    public void setResidentialPropertyIDS(Set<Tenant> tenants) {
        this.residentialPropertyIDS = tenants;
    }

    public Set<Owner> getOwnerIDS() {
        return ownerIDS;
    }

    public ResidentialProperty ownerIDS(Set<Owner> owners) {
        this.ownerIDS = owners;
        return this;
    }

    public ResidentialProperty addOwnerID(Owner owner) {
        this.ownerIDS.add(owner);
        owner.getOwnerIDS().add(this);
        return this;
    }

    public ResidentialProperty removeOwnerID(Owner owner) {
        this.ownerIDS.remove(owner);
        owner.getOwnerIDS().remove(this);
        return this;
    }

    public void setOwnerIDS(Set<Owner> owners) {
        this.ownerIDS = owners;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ResidentialProperty)) {
            return false;
        }
        return id != null && id.equals(((ResidentialProperty) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ResidentialProperty{" +
            "id=" + getId() +
            ", residentialPropertyID=" + getResidentialPropertyID() +
            ", type='" + getType() + "'" +
            ", ownerID=" + getOwnerID() +
            ", houseNumber='" + getHouseNumber() + "'" +
            ", block='" + getBlock() + "'" +
            ", apartmentName='" + getApartmentName() + "'" +
            ", streetName='" + getStreetName() + "'" +
            ", city='" + getCity() + "'" +
            ", country='" + getCountry() + "'" +
            "}";
    }
}
