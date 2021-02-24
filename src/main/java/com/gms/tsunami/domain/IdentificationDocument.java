package com.gms.tsunami.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.gms.tsunami.domain.enumeration.Countries;
import com.gms.tsunami.domain.enumeration.IDType;
import java.io.Serializable;
import java.time.Instant;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A IdentificationDocument.
 */
@Entity
@Table(name = "identification_document")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class IdentificationDocument implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "id_type", nullable = false)
    private IDType idType;

    @NotNull
    @Column(name = "unique_document_id", nullable = false, unique = true)
    private String uniqueDocumentID;

    @NotNull
    @Column(name = "date_of_issue", nullable = false)
    private Instant dateOfIssue;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "issueing_country", nullable = false)
    private Countries issueingCountry;

    @Column(name = "date_of_expiry")
    private Instant dateOfExpiry;

    @Lob
    @Column(name = "photo_1", nullable = false)
    private byte[] photo1;

    @Column(name = "photo_1_content_type", nullable = false)
    private String photo1ContentType;

    @Lob
    @Column(name = "photo_2")
    private byte[] photo2;

    @Column(name = "photo_2_content_type")
    private String photo2ContentType;

    @Column(name = "verified")
    private Boolean verified;

    @ManyToOne
    @JsonIgnoreProperties(value = "identificationDocuments", allowSetters = true)
    private GMSUser uniqueDocumentID;

    @ManyToOne
    @JsonIgnoreProperties(value = "userIDS", allowSetters = true)
    private GMSUser gMSUser;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public IDType getIdType() {
        return idType;
    }

    public IdentificationDocument idType(IDType idType) {
        this.idType = idType;
        return this;
    }

    public void setIdType(IDType idType) {
        this.idType = idType;
    }

    public String getUniqueDocumentID() {
        return uniqueDocumentID;
    }

    public IdentificationDocument uniqueDocumentID(String uniqueDocumentID) {
        this.uniqueDocumentID = uniqueDocumentID;
        return this;
    }

    public void setUniqueDocumentID(String uniqueDocumentID) {
        this.uniqueDocumentID = uniqueDocumentID;
    }

    public Instant getDateOfIssue() {
        return dateOfIssue;
    }

    public IdentificationDocument dateOfIssue(Instant dateOfIssue) {
        this.dateOfIssue = dateOfIssue;
        return this;
    }

    public void setDateOfIssue(Instant dateOfIssue) {
        this.dateOfIssue = dateOfIssue;
    }

    public Countries getIssueingCountry() {
        return issueingCountry;
    }

    public IdentificationDocument issueingCountry(Countries issueingCountry) {
        this.issueingCountry = issueingCountry;
        return this;
    }

    public void setIssueingCountry(Countries issueingCountry) {
        this.issueingCountry = issueingCountry;
    }

    public Instant getDateOfExpiry() {
        return dateOfExpiry;
    }

    public IdentificationDocument dateOfExpiry(Instant dateOfExpiry) {
        this.dateOfExpiry = dateOfExpiry;
        return this;
    }

    public void setDateOfExpiry(Instant dateOfExpiry) {
        this.dateOfExpiry = dateOfExpiry;
    }

    public byte[] getPhoto1() {
        return photo1;
    }

    public IdentificationDocument photo1(byte[] photo1) {
        this.photo1 = photo1;
        return this;
    }

    public void setPhoto1(byte[] photo1) {
        this.photo1 = photo1;
    }

    public String getPhoto1ContentType() {
        return photo1ContentType;
    }

    public IdentificationDocument photo1ContentType(String photo1ContentType) {
        this.photo1ContentType = photo1ContentType;
        return this;
    }

    public void setPhoto1ContentType(String photo1ContentType) {
        this.photo1ContentType = photo1ContentType;
    }

    public byte[] getPhoto2() {
        return photo2;
    }

    public IdentificationDocument photo2(byte[] photo2) {
        this.photo2 = photo2;
        return this;
    }

    public void setPhoto2(byte[] photo2) {
        this.photo2 = photo2;
    }

    public String getPhoto2ContentType() {
        return photo2ContentType;
    }

    public IdentificationDocument photo2ContentType(String photo2ContentType) {
        this.photo2ContentType = photo2ContentType;
        return this;
    }

    public void setPhoto2ContentType(String photo2ContentType) {
        this.photo2ContentType = photo2ContentType;
    }

    public Boolean isVerified() {
        return verified;
    }

    public IdentificationDocument verified(Boolean verified) {
        this.verified = verified;
        return this;
    }

    public void setVerified(Boolean verified) {
        this.verified = verified;
    }

    public GMSUser getUniqueDocumentID() {
        return uniqueDocumentID;
    }

    public IdentificationDocument uniqueDocumentID(GMSUser gMSUser) {
        this.uniqueDocumentID = gMSUser;
        return this;
    }

    public void setUniqueDocumentID(GMSUser gMSUser) {
        this.uniqueDocumentID = gMSUser;
    }

    public GMSUser getGMSUser() {
        return gMSUser;
    }

    public IdentificationDocument gMSUser(GMSUser gMSUser) {
        this.gMSUser = gMSUser;
        return this;
    }

    public void setGMSUser(GMSUser gMSUser) {
        this.gMSUser = gMSUser;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof IdentificationDocument)) {
            return false;
        }
        return id != null && id.equals(((IdentificationDocument) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "IdentificationDocument{" +
            "id=" + getId() +
            ", idType='" + getIdType() + "'" +
            ", uniqueDocumentID='" + getUniqueDocumentID() + "'" +
            ", dateOfIssue='" + getDateOfIssue() + "'" +
            ", issueingCountry='" + getIssueingCountry() + "'" +
            ", dateOfExpiry='" + getDateOfExpiry() + "'" +
            ", photo1='" + getPhoto1() + "'" +
            ", photo1ContentType='" + getPhoto1ContentType() + "'" +
            ", photo2='" + getPhoto2() + "'" +
            ", photo2ContentType='" + getPhoto2ContentType() + "'" +
            ", verified='" + isVerified() + "'" +
            "}";
    }
}
