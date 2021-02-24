package com.gms.tsunami.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Owner.
 */
@Entity
@Table(name = "owner")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Owner implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "user_id", nullable = false)
    private Long userID;

    @OneToOne
    @JoinColumn(unique = true)
    private GMSUser userID;

    @ManyToMany(mappedBy = "ownerIDS")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnore
    private Set<ResidentialProperty> ownerIDS = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserID() {
        return userID;
    }

    public Owner userID(Long userID) {
        this.userID = userID;
        return this;
    }

    public void setUserID(Long userID) {
        this.userID = userID;
    }

    public GMSUser getUserID() {
        return userID;
    }

    public Owner userID(GMSUser gMSUser) {
        this.userID = gMSUser;
        return this;
    }

    public void setUserID(GMSUser gMSUser) {
        this.userID = gMSUser;
    }

    public Set<ResidentialProperty> getOwnerIDS() {
        return ownerIDS;
    }

    public Owner ownerIDS(Set<ResidentialProperty> residentialProperties) {
        this.ownerIDS = residentialProperties;
        return this;
    }

    public Owner addOwnerID(ResidentialProperty residentialProperty) {
        this.ownerIDS.add(residentialProperty);
        residentialProperty.getOwnerIDS().add(this);
        return this;
    }

    public Owner removeOwnerID(ResidentialProperty residentialProperty) {
        this.ownerIDS.remove(residentialProperty);
        residentialProperty.getOwnerIDS().remove(this);
        return this;
    }

    public void setOwnerIDS(Set<ResidentialProperty> residentialProperties) {
        this.ownerIDS = residentialProperties;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Owner)) {
            return false;
        }
        return id != null && id.equals(((Owner) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Owner{" +
            "id=" + getId() +
            ", userID=" + getUserID() +
            "}";
    }
}
