package com.gms.tsunami.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.gms.tsunami.GmsApp;
import com.gms.tsunami.config.TestSecurityConfiguration;
import com.gms.tsunami.domain.IdentificationDocument;
import com.gms.tsunami.domain.enumeration.Countries;
import com.gms.tsunami.domain.enumeration.IDType;
import com.gms.tsunami.repository.IdentificationDocumentRepository;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;

/**
 * Integration tests for the {@link IdentificationDocumentResource} REST controller.
 */
@SpringBootTest(classes = { GmsApp.class, TestSecurityConfiguration.class })
@AutoConfigureMockMvc
@WithMockUser
public class IdentificationDocumentResourceIT {
    private static final IDType DEFAULT_ID_TYPE = IDType.NationalID;
    private static final IDType UPDATED_ID_TYPE = IDType.Passport;

    private static final String DEFAULT_UNIQUE_DOCUMENT_ID = "AAAAAAAAAA";
    private static final String UPDATED_UNIQUE_DOCUMENT_ID = "BBBBBBBBBB";

    private static final Instant DEFAULT_DATE_OF_ISSUE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_OF_ISSUE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Countries DEFAULT_ISSUEING_COUNTRY = Countries.KENYA;
    private static final Countries UPDATED_ISSUEING_COUNTRY = Countries.OTHER;

    private static final Instant DEFAULT_DATE_OF_EXPIRY = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_OF_EXPIRY = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final byte[] DEFAULT_PHOTO_1 = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_PHOTO_1 = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_PHOTO_1_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_PHOTO_1_CONTENT_TYPE = "image/png";

    private static final byte[] DEFAULT_PHOTO_2 = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_PHOTO_2 = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_PHOTO_2_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_PHOTO_2_CONTENT_TYPE = "image/png";

    private static final Boolean DEFAULT_VERIFIED = false;
    private static final Boolean UPDATED_VERIFIED = true;

    @Autowired
    private IdentificationDocumentRepository identificationDocumentRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restIdentificationDocumentMockMvc;

    private IdentificationDocument identificationDocument;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static IdentificationDocument createEntity(EntityManager em) {
        IdentificationDocument identificationDocument = new IdentificationDocument()
            .idType(DEFAULT_ID_TYPE)
            .uniqueDocumentID(DEFAULT_UNIQUE_DOCUMENT_ID)
            .dateOfIssue(DEFAULT_DATE_OF_ISSUE)
            .issueingCountry(DEFAULT_ISSUEING_COUNTRY)
            .dateOfExpiry(DEFAULT_DATE_OF_EXPIRY)
            .photo1(DEFAULT_PHOTO_1)
            .photo1ContentType(DEFAULT_PHOTO_1_CONTENT_TYPE)
            .photo2(DEFAULT_PHOTO_2)
            .photo2ContentType(DEFAULT_PHOTO_2_CONTENT_TYPE)
            .verified(DEFAULT_VERIFIED);
        return identificationDocument;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static IdentificationDocument createUpdatedEntity(EntityManager em) {
        IdentificationDocument identificationDocument = new IdentificationDocument()
            .idType(UPDATED_ID_TYPE)
            .uniqueDocumentID(UPDATED_UNIQUE_DOCUMENT_ID)
            .dateOfIssue(UPDATED_DATE_OF_ISSUE)
            .issueingCountry(UPDATED_ISSUEING_COUNTRY)
            .dateOfExpiry(UPDATED_DATE_OF_EXPIRY)
            .photo1(UPDATED_PHOTO_1)
            .photo1ContentType(UPDATED_PHOTO_1_CONTENT_TYPE)
            .photo2(UPDATED_PHOTO_2)
            .photo2ContentType(UPDATED_PHOTO_2_CONTENT_TYPE)
            .verified(UPDATED_VERIFIED);
        return identificationDocument;
    }

    @BeforeEach
    public void initTest() {
        identificationDocument = createEntity(em);
    }

    @Test
    @Transactional
    public void createIdentificationDocument() throws Exception {
        int databaseSizeBeforeCreate = identificationDocumentRepository.findAll().size();
        // Create the IdentificationDocument
        restIdentificationDocumentMockMvc
            .perform(
                post("/api/identification-documents")
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(identificationDocument))
            )
            .andExpect(status().isCreated());

        // Validate the IdentificationDocument in the database
        List<IdentificationDocument> identificationDocumentList = identificationDocumentRepository.findAll();
        assertThat(identificationDocumentList).hasSize(databaseSizeBeforeCreate + 1);
        IdentificationDocument testIdentificationDocument = identificationDocumentList.get(identificationDocumentList.size() - 1);
        assertThat(testIdentificationDocument.getIdType()).isEqualTo(DEFAULT_ID_TYPE);
        assertThat(testIdentificationDocument.getUniqueDocumentID()).isEqualTo(DEFAULT_UNIQUE_DOCUMENT_ID);
        assertThat(testIdentificationDocument.getDateOfIssue()).isEqualTo(DEFAULT_DATE_OF_ISSUE);
        assertThat(testIdentificationDocument.getIssueingCountry()).isEqualTo(DEFAULT_ISSUEING_COUNTRY);
        assertThat(testIdentificationDocument.getDateOfExpiry()).isEqualTo(DEFAULT_DATE_OF_EXPIRY);
        assertThat(testIdentificationDocument.getPhoto1()).isEqualTo(DEFAULT_PHOTO_1);
        assertThat(testIdentificationDocument.getPhoto1ContentType()).isEqualTo(DEFAULT_PHOTO_1_CONTENT_TYPE);
        assertThat(testIdentificationDocument.getPhoto2()).isEqualTo(DEFAULT_PHOTO_2);
        assertThat(testIdentificationDocument.getPhoto2ContentType()).isEqualTo(DEFAULT_PHOTO_2_CONTENT_TYPE);
        assertThat(testIdentificationDocument.isVerified()).isEqualTo(DEFAULT_VERIFIED);
    }

    @Test
    @Transactional
    public void createIdentificationDocumentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = identificationDocumentRepository.findAll().size();

        // Create the IdentificationDocument with an existing ID
        identificationDocument.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restIdentificationDocumentMockMvc
            .perform(
                post("/api/identification-documents")
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(identificationDocument))
            )
            .andExpect(status().isBadRequest());

        // Validate the IdentificationDocument in the database
        List<IdentificationDocument> identificationDocumentList = identificationDocumentRepository.findAll();
        assertThat(identificationDocumentList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkIdTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = identificationDocumentRepository.findAll().size();
        // set the field null
        identificationDocument.setIdType(null);

        // Create the IdentificationDocument, which fails.

        restIdentificationDocumentMockMvc
            .perform(
                post("/api/identification-documents")
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(identificationDocument))
            )
            .andExpect(status().isBadRequest());

        List<IdentificationDocument> identificationDocumentList = identificationDocumentRepository.findAll();
        assertThat(identificationDocumentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkUniqueDocumentIDIsRequired() throws Exception {
        int databaseSizeBeforeTest = identificationDocumentRepository.findAll().size();
        // set the field null
        identificationDocument.setUniqueDocumentID(null);

        // Create the IdentificationDocument, which fails.

        restIdentificationDocumentMockMvc
            .perform(
                post("/api/identification-documents")
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(identificationDocument))
            )
            .andExpect(status().isBadRequest());

        List<IdentificationDocument> identificationDocumentList = identificationDocumentRepository.findAll();
        assertThat(identificationDocumentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDateOfIssueIsRequired() throws Exception {
        int databaseSizeBeforeTest = identificationDocumentRepository.findAll().size();
        // set the field null
        identificationDocument.setDateOfIssue(null);

        // Create the IdentificationDocument, which fails.

        restIdentificationDocumentMockMvc
            .perform(
                post("/api/identification-documents")
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(identificationDocument))
            )
            .andExpect(status().isBadRequest());

        List<IdentificationDocument> identificationDocumentList = identificationDocumentRepository.findAll();
        assertThat(identificationDocumentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkIssueingCountryIsRequired() throws Exception {
        int databaseSizeBeforeTest = identificationDocumentRepository.findAll().size();
        // set the field null
        identificationDocument.setIssueingCountry(null);

        // Create the IdentificationDocument, which fails.

        restIdentificationDocumentMockMvc
            .perform(
                post("/api/identification-documents")
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(identificationDocument))
            )
            .andExpect(status().isBadRequest());

        List<IdentificationDocument> identificationDocumentList = identificationDocumentRepository.findAll();
        assertThat(identificationDocumentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllIdentificationDocuments() throws Exception {
        // Initialize the database
        identificationDocumentRepository.saveAndFlush(identificationDocument);

        // Get all the identificationDocumentList
        restIdentificationDocumentMockMvc
            .perform(get("/api/identification-documents?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(identificationDocument.getId().intValue())))
            .andExpect(jsonPath("$.[*].idType").value(hasItem(DEFAULT_ID_TYPE.toString())))
            .andExpect(jsonPath("$.[*].uniqueDocumentID").value(hasItem(DEFAULT_UNIQUE_DOCUMENT_ID)))
            .andExpect(jsonPath("$.[*].dateOfIssue").value(hasItem(DEFAULT_DATE_OF_ISSUE.toString())))
            .andExpect(jsonPath("$.[*].issueingCountry").value(hasItem(DEFAULT_ISSUEING_COUNTRY.toString())))
            .andExpect(jsonPath("$.[*].dateOfExpiry").value(hasItem(DEFAULT_DATE_OF_EXPIRY.toString())))
            .andExpect(jsonPath("$.[*].photo1ContentType").value(hasItem(DEFAULT_PHOTO_1_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].photo1").value(hasItem(Base64Utils.encodeToString(DEFAULT_PHOTO_1))))
            .andExpect(jsonPath("$.[*].photo2ContentType").value(hasItem(DEFAULT_PHOTO_2_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].photo2").value(hasItem(Base64Utils.encodeToString(DEFAULT_PHOTO_2))))
            .andExpect(jsonPath("$.[*].verified").value(hasItem(DEFAULT_VERIFIED.booleanValue())));
    }

    @Test
    @Transactional
    public void getIdentificationDocument() throws Exception {
        // Initialize the database
        identificationDocumentRepository.saveAndFlush(identificationDocument);

        // Get the identificationDocument
        restIdentificationDocumentMockMvc
            .perform(get("/api/identification-documents/{id}", identificationDocument.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(identificationDocument.getId().intValue()))
            .andExpect(jsonPath("$.idType").value(DEFAULT_ID_TYPE.toString()))
            .andExpect(jsonPath("$.uniqueDocumentID").value(DEFAULT_UNIQUE_DOCUMENT_ID))
            .andExpect(jsonPath("$.dateOfIssue").value(DEFAULT_DATE_OF_ISSUE.toString()))
            .andExpect(jsonPath("$.issueingCountry").value(DEFAULT_ISSUEING_COUNTRY.toString()))
            .andExpect(jsonPath("$.dateOfExpiry").value(DEFAULT_DATE_OF_EXPIRY.toString()))
            .andExpect(jsonPath("$.photo1ContentType").value(DEFAULT_PHOTO_1_CONTENT_TYPE))
            .andExpect(jsonPath("$.photo1").value(Base64Utils.encodeToString(DEFAULT_PHOTO_1)))
            .andExpect(jsonPath("$.photo2ContentType").value(DEFAULT_PHOTO_2_CONTENT_TYPE))
            .andExpect(jsonPath("$.photo2").value(Base64Utils.encodeToString(DEFAULT_PHOTO_2)))
            .andExpect(jsonPath("$.verified").value(DEFAULT_VERIFIED.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingIdentificationDocument() throws Exception {
        // Get the identificationDocument
        restIdentificationDocumentMockMvc
            .perform(get("/api/identification-documents/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateIdentificationDocument() throws Exception {
        // Initialize the database
        identificationDocumentRepository.saveAndFlush(identificationDocument);

        int databaseSizeBeforeUpdate = identificationDocumentRepository.findAll().size();

        // Update the identificationDocument
        IdentificationDocument updatedIdentificationDocument = identificationDocumentRepository
            .findById(identificationDocument.getId())
            .get();
        // Disconnect from session so that the updates on updatedIdentificationDocument are not directly saved in db
        em.detach(updatedIdentificationDocument);
        updatedIdentificationDocument
            .idType(UPDATED_ID_TYPE)
            .uniqueDocumentID(UPDATED_UNIQUE_DOCUMENT_ID)
            .dateOfIssue(UPDATED_DATE_OF_ISSUE)
            .issueingCountry(UPDATED_ISSUEING_COUNTRY)
            .dateOfExpiry(UPDATED_DATE_OF_EXPIRY)
            .photo1(UPDATED_PHOTO_1)
            .photo1ContentType(UPDATED_PHOTO_1_CONTENT_TYPE)
            .photo2(UPDATED_PHOTO_2)
            .photo2ContentType(UPDATED_PHOTO_2_CONTENT_TYPE)
            .verified(UPDATED_VERIFIED);

        restIdentificationDocumentMockMvc
            .perform(
                put("/api/identification-documents")
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedIdentificationDocument))
            )
            .andExpect(status().isOk());

        // Validate the IdentificationDocument in the database
        List<IdentificationDocument> identificationDocumentList = identificationDocumentRepository.findAll();
        assertThat(identificationDocumentList).hasSize(databaseSizeBeforeUpdate);
        IdentificationDocument testIdentificationDocument = identificationDocumentList.get(identificationDocumentList.size() - 1);
        assertThat(testIdentificationDocument.getIdType()).isEqualTo(UPDATED_ID_TYPE);
        assertThat(testIdentificationDocument.getUniqueDocumentID()).isEqualTo(UPDATED_UNIQUE_DOCUMENT_ID);
        assertThat(testIdentificationDocument.getDateOfIssue()).isEqualTo(UPDATED_DATE_OF_ISSUE);
        assertThat(testIdentificationDocument.getIssueingCountry()).isEqualTo(UPDATED_ISSUEING_COUNTRY);
        assertThat(testIdentificationDocument.getDateOfExpiry()).isEqualTo(UPDATED_DATE_OF_EXPIRY);
        assertThat(testIdentificationDocument.getPhoto1()).isEqualTo(UPDATED_PHOTO_1);
        assertThat(testIdentificationDocument.getPhoto1ContentType()).isEqualTo(UPDATED_PHOTO_1_CONTENT_TYPE);
        assertThat(testIdentificationDocument.getPhoto2()).isEqualTo(UPDATED_PHOTO_2);
        assertThat(testIdentificationDocument.getPhoto2ContentType()).isEqualTo(UPDATED_PHOTO_2_CONTENT_TYPE);
        assertThat(testIdentificationDocument.isVerified()).isEqualTo(UPDATED_VERIFIED);
    }

    @Test
    @Transactional
    public void updateNonExistingIdentificationDocument() throws Exception {
        int databaseSizeBeforeUpdate = identificationDocumentRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restIdentificationDocumentMockMvc
            .perform(
                put("/api/identification-documents")
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(identificationDocument))
            )
            .andExpect(status().isBadRequest());

        // Validate the IdentificationDocument in the database
        List<IdentificationDocument> identificationDocumentList = identificationDocumentRepository.findAll();
        assertThat(identificationDocumentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteIdentificationDocument() throws Exception {
        // Initialize the database
        identificationDocumentRepository.saveAndFlush(identificationDocument);

        int databaseSizeBeforeDelete = identificationDocumentRepository.findAll().size();

        // Delete the identificationDocument
        restIdentificationDocumentMockMvc
            .perform(
                delete("/api/identification-documents/{id}", identificationDocument.getId()).with(csrf()).accept(MediaType.APPLICATION_JSON)
            )
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<IdentificationDocument> identificationDocumentList = identificationDocumentRepository.findAll();
        assertThat(identificationDocumentList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
