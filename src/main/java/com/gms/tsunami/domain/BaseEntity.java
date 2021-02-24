package com.gms.tsunami.domain;

import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A BaseEntity.
 */
@Entity
@Table(name = "base_entity")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class BaseEntity implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @OneToOne
    @JoinColumn(unique = true)
    private GMSUser iD;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public GMSUser getID() {
        return iD;
    }

    public BaseEntity iD(GMSUser gMSUser) {
        this.iD = gMSUser;
        return this;
    }

    public void setID(GMSUser gMSUser) {
        this.iD = gMSUser;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof BaseEntity)) {
            return false;
        }
        return id != null && id.equals(((BaseEntity) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "BaseEntity{" +
            "id=" + getId() +
            "}";
    }
}
