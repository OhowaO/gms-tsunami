package com.gms.tsunami.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.gms.tsunami.domain.enumeration.Gender;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A GMSUser.
 */
@Entity
@Table(name = "gms_user")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class GMSUser implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "user_id", nullable = false)
    private Long userID;

    @NotNull
    @Column(name = "first_names", nullable = false)
    private String firstNames;

    @NotNull
    @Column(name = "last_name", nullable = false)
    private String lastName;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "gender", nullable = false)
    private Gender gender;

    @NotNull
    @Column(name = "email_adress", nullable = false)
    private String emailAdress;

    @NotNull
    @Column(name = "telephone_number", nullable = false)
    private String telephoneNumber;

    @NotNull
    @Column(name = "date_of_birth", nullable = false)
    private Instant dateOfBirth;

    @OneToMany(mappedBy = "gMSUser")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<IdentificationDocument> userIDS = new HashSet<>();

    @OneToOne(mappedBy = "iD")
    @JsonIgnore
    private BaseEntity userID;

    @OneToOne(mappedBy = "userID")
    @JsonIgnore
    private Tenant userID;

    @OneToOne(mappedBy = "userID")
    @JsonIgnore
    private Owner userID;

    @OneToOne(mappedBy = "guest")
    @JsonIgnore
    private Invite userID;

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

    public GMSUser userID(Long userID) {
        this.userID = userID;
        return this;
    }

    public void setUserID(Long userID) {
        this.userID = userID;
    }

    public String getFirstNames() {
        return firstNames;
    }

    public GMSUser firstNames(String firstNames) {
        this.firstNames = firstNames;
        return this;
    }

    public void setFirstNames(String firstNames) {
        this.firstNames = firstNames;
    }

    public String getLastName() {
        return lastName;
    }

    public GMSUser lastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Gender getGender() {
        return gender;
    }

    public GMSUser gender(Gender gender) {
        this.gender = gender;
        return this;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public String getEmailAdress() {
        return emailAdress;
    }

    public GMSUser emailAdress(String emailAdress) {
        this.emailAdress = emailAdress;
        return this;
    }

    public void setEmailAdress(String emailAdress) {
        this.emailAdress = emailAdress;
    }

    public String getTelephoneNumber() {
        return telephoneNumber;
    }

    public GMSUser telephoneNumber(String telephoneNumber) {
        this.telephoneNumber = telephoneNumber;
        return this;
    }

    public void setTelephoneNumber(String telephoneNumber) {
        this.telephoneNumber = telephoneNumber;
    }

    public Instant getDateOfBirth() {
        return dateOfBirth;
    }

    public GMSUser dateOfBirth(Instant dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
        return this;
    }

    public void setDateOfBirth(Instant dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public Set<IdentificationDocument> getUserIDS() {
        return userIDS;
    }

    public GMSUser userIDS(Set<IdentificationDocument> identificationDocuments) {
        this.userIDS = identificationDocuments;
        return this;
    }

    public GMSUser addUserID(IdentificationDocument identificationDocument) {
        this.userIDS.add(identificationDocument);
        identificationDocument.setGMSUser(this);
        return this;
    }

    public GMSUser removeUserID(IdentificationDocument identificationDocument) {
        this.userIDS.remove(identificationDocument);
        identificationDocument.setGMSUser(null);
        return this;
    }

    public void setUserIDS(Set<IdentificationDocument> identificationDocuments) {
        this.userIDS = identificationDocuments;
    }

    public BaseEntity getUserID() {
        return userID;
    }

    public GMSUser userID(BaseEntity baseEntity) {
        this.userID = baseEntity;
        return this;
    }

    public void setUserID(BaseEntity baseEntity) {
        this.userID = baseEntity;
    }

    public Tenant getUserID() {
        return userID;
    }

    public GMSUser userID(Tenant tenant) {
        this.userID = tenant;
        return this;
    }

    public void setUserID(Tenant tenant) {
        this.userID = tenant;
    }

    public Owner getUserID() {
        return userID;
    }

    public GMSUser userID(Owner owner) {
        this.userID = owner;
        return this;
    }

    public void setUserID(Owner owner) {
        this.userID = owner;
    }

    public Invite getUserID() {
        return userID;
    }

    public GMSUser userID(Invite invite) {
        this.userID = invite;
        return this;
    }

    public void setUserID(Invite invite) {
        this.userID = invite;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof GMSUser)) {
            return false;
        }
        return id != null && id.equals(((GMSUser) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "GMSUser{" +
            "id=" + getId() +
            ", userID=" + getUserID() +
            ", firstNames='" + getFirstNames() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", gender='" + getGender() + "'" +
            ", emailAdress='" + getEmailAdress() + "'" +
            ", telephoneNumber='" + getTelephoneNumber() + "'" +
            ", dateOfBirth='" + getDateOfBirth() + "'" +
            "}";
    }
}
