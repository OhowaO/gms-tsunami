package com.gms.tsunami.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.gms.tsunami.domain.enumeration.InviteStatus;
import java.io.Serializable;
import java.time.Instant;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Invite.
 */
@Entity
@Table(name = "invite")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Invite implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "host", nullable = false)
    private String host;

    @NotNull
    @Column(name = "guest", nullable = false)
    private String guest;

    @NotNull
    @Column(name = "valid_from", nullable = false)
    private Instant validFrom;

    @NotNull
    @Column(name = "valid_to", nullable = false)
    private Instant validTo;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "invite_status", nullable = false)
    private InviteStatus inviteStatus;

    @OneToOne
    @JoinColumn(unique = true)
    private Tenant host;

    @OneToOne
    @JoinColumn(unique = true)
    private GMSUser guest;

    @OneToOne(mappedBy = "start")
    @JsonIgnore
    private InviteData validFrom;

    @OneToOne(mappedBy = "stop")
    @JsonIgnore
    private InviteData validTo;

    @OneToOne(mappedBy = "houseNumber")
    @JsonIgnore
    private InviteData residentialProperty;

    @OneToOne(mappedBy = "block")
    @JsonIgnore
    private InviteData residentialProperty;

    @OneToOne(mappedBy = "apartmentName")
    @JsonIgnore
    private InviteData residentialProperty;

    @OneToOne(mappedBy = "streetName")
    @JsonIgnore
    private InviteData residentialProperty;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getHost() {
        return host;
    }

    public Invite host(String host) {
        this.host = host;
        return this;
    }

    public void setHost(String host) {
        this.host = host;
    }

    public String getGuest() {
        return guest;
    }

    public Invite guest(String guest) {
        this.guest = guest;
        return this;
    }

    public void setGuest(String guest) {
        this.guest = guest;
    }

    public Instant getValidFrom() {
        return validFrom;
    }

    public Invite validFrom(Instant validFrom) {
        this.validFrom = validFrom;
        return this;
    }

    public void setValidFrom(Instant validFrom) {
        this.validFrom = validFrom;
    }

    public Instant getValidTo() {
        return validTo;
    }

    public Invite validTo(Instant validTo) {
        this.validTo = validTo;
        return this;
    }

    public void setValidTo(Instant validTo) {
        this.validTo = validTo;
    }

    public InviteStatus getInviteStatus() {
        return inviteStatus;
    }

    public Invite inviteStatus(InviteStatus inviteStatus) {
        this.inviteStatus = inviteStatus;
        return this;
    }

    public void setInviteStatus(InviteStatus inviteStatus) {
        this.inviteStatus = inviteStatus;
    }

    public Tenant getHost() {
        return host;
    }

    public Invite host(Tenant tenant) {
        this.host = tenant;
        return this;
    }

    public void setHost(Tenant tenant) {
        this.host = tenant;
    }

    public GMSUser getGuest() {
        return guest;
    }

    public Invite guest(GMSUser gMSUser) {
        this.guest = gMSUser;
        return this;
    }

    public void setGuest(GMSUser gMSUser) {
        this.guest = gMSUser;
    }

    public InviteData getValidFrom() {
        return validFrom;
    }

    public Invite validFrom(InviteData inviteData) {
        this.validFrom = inviteData;
        return this;
    }

    public void setValidFrom(InviteData inviteData) {
        this.validFrom = inviteData;
    }

    public InviteData getValidTo() {
        return validTo;
    }

    public Invite validTo(InviteData inviteData) {
        this.validTo = inviteData;
        return this;
    }

    public void setValidTo(InviteData inviteData) {
        this.validTo = inviteData;
    }

    public InviteData getResidentialProperty() {
        return residentialProperty;
    }

    public Invite residentialProperty(InviteData inviteData) {
        this.residentialProperty = inviteData;
        return this;
    }

    public void setResidentialProperty(InviteData inviteData) {
        this.residentialProperty = inviteData;
    }

    public InviteData getResidentialProperty() {
        return residentialProperty;
    }

    public Invite residentialProperty(InviteData inviteData) {
        this.residentialProperty = inviteData;
        return this;
    }

    public void setResidentialProperty(InviteData inviteData) {
        this.residentialProperty = inviteData;
    }

    public InviteData getResidentialProperty() {
        return residentialProperty;
    }

    public Invite residentialProperty(InviteData inviteData) {
        this.residentialProperty = inviteData;
        return this;
    }

    public void setResidentialProperty(InviteData inviteData) {
        this.residentialProperty = inviteData;
    }

    public InviteData getResidentialProperty() {
        return residentialProperty;
    }

    public Invite residentialProperty(InviteData inviteData) {
        this.residentialProperty = inviteData;
        return this;
    }

    public void setResidentialProperty(InviteData inviteData) {
        this.residentialProperty = inviteData;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Invite)) {
            return false;
        }
        return id != null && id.equals(((Invite) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Invite{" +
            "id=" + getId() +
            ", host='" + getHost() + "'" +
            ", guest='" + getGuest() + "'" +
            ", validFrom='" + getValidFrom() + "'" +
            ", validTo='" + getValidTo() + "'" +
            ", inviteStatus='" + getInviteStatus() + "'" +
            "}";
    }
}
