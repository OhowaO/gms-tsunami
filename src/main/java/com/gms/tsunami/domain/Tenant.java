package com.gms.tsunami.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Tenant.
 */
@Entity
@Table(name = "tenant")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Tenant implements Serializable {
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

    @ManyToOne
    @JsonIgnoreProperties(value = "tenants", allowSetters = true)
    private ResidentialProperty userID;

    @OneToOne(mappedBy = "host")
    @JsonIgnore
    private Invite userID;

    @ManyToOne
    @JsonIgnoreProperties(value = "residentialPropertyIDS", allowSetters = true)
    private ResidentialProperty residentialProperty;

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

    public Tenant userID(Long userID) {
        this.userID = userID;
        return this;
    }

    public void setUserID(Long userID) {
        this.userID = userID;
    }

    public GMSUser getUserID() {
        return userID;
    }

    public Tenant userID(GMSUser gMSUser) {
        this.userID = gMSUser;
        return this;
    }

    public void setUserID(GMSUser gMSUser) {
        this.userID = gMSUser;
    }

    public ResidentialProperty getUserID() {
        return userID;
    }

    public Tenant userID(ResidentialProperty residentialProperty) {
        this.userID = residentialProperty;
        return this;
    }

    public void setUserID(ResidentialProperty residentialProperty) {
        this.userID = residentialProperty;
    }

    public Invite getUserID() {
        return userID;
    }

    public Tenant userID(Invite invite) {
        this.userID = invite;
        return this;
    }

    public void setUserID(Invite invite) {
        this.userID = invite;
    }

    public ResidentialProperty getResidentialProperty() {
        return residentialProperty;
    }

    public Tenant residentialProperty(ResidentialProperty residentialProperty) {
        this.residentialProperty = residentialProperty;
        return this;
    }

    public void setResidentialProperty(ResidentialProperty residentialProperty) {
        this.residentialProperty = residentialProperty;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Tenant)) {
            return false;
        }
        return id != null && id.equals(((Tenant) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Tenant{" +
            "id=" + getId() +
            ", userID=" + getUserID() +
            "}";
    }
}
