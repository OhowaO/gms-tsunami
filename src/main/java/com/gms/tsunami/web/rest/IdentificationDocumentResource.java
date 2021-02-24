package com.gms.tsunami.web.rest;

import com.gms.tsunami.domain.IdentificationDocument;
import com.gms.tsunami.repository.IdentificationDocumentRepository;
import com.gms.tsunami.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import javax.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

/**
 * REST controller for managing {@link com.gms.tsunami.domain.IdentificationDocument}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class IdentificationDocumentResource {
    private final Logger log = LoggerFactory.getLogger(IdentificationDocumentResource.class);

    private static final String ENTITY_NAME = "identificationDocument";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final IdentificationDocumentRepository identificationDocumentRepository;

    public IdentificationDocumentResource(IdentificationDocumentRepository identificationDocumentRepository) {
        this.identificationDocumentRepository = identificationDocumentRepository;
    }

    /**
     * {@code POST  /identification-documents} : Create a new identificationDocument.
     *
     * @param identificationDocument the identificationDocument to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new identificationDocument, or with status {@code 400 (Bad Request)} if the identificationDocument has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/identification-documents")
    public ResponseEntity<IdentificationDocument> createIdentificationDocument(
        @Valid @RequestBody IdentificationDocument identificationDocument
    )
        throws URISyntaxException {
        log.debug("REST request to save IdentificationDocument : {}", identificationDocument);
        if (identificationDocument.getId() != null) {
            throw new BadRequestAlertException("A new identificationDocument cannot already have an ID", ENTITY_NAME, "idexists");
        }
        IdentificationDocument result = identificationDocumentRepository.save(identificationDocument);
        return ResponseEntity
            .created(new URI("/api/identification-documents/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /identification-documents} : Updates an existing identificationDocument.
     *
     * @param identificationDocument the identificationDocument to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated identificationDocument,
     * or with status {@code 400 (Bad Request)} if the identificationDocument is not valid,
     * or with status {@code 500 (Internal Server Error)} if the identificationDocument couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/identification-documents")
    public ResponseEntity<IdentificationDocument> updateIdentificationDocument(
        @Valid @RequestBody IdentificationDocument identificationDocument
    )
        throws URISyntaxException {
        log.debug("REST request to update IdentificationDocument : {}", identificationDocument);
        if (identificationDocument.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        IdentificationDocument result = identificationDocumentRepository.save(identificationDocument);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, identificationDocument.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /identification-documents} : get all the identificationDocuments.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of identificationDocuments in body.
     */
    @GetMapping("/identification-documents")
    public List<IdentificationDocument> getAllIdentificationDocuments() {
        log.debug("REST request to get all IdentificationDocuments");
        return identificationDocumentRepository.findAll();
    }

    /**
     * {@code GET  /identification-documents/:id} : get the "id" identificationDocument.
     *
     * @param id the id of the identificationDocument to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the identificationDocument, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/identification-documents/{id}")
    public ResponseEntity<IdentificationDocument> getIdentificationDocument(@PathVariable Long id) {
        log.debug("REST request to get IdentificationDocument : {}", id);
        Optional<IdentificationDocument> identificationDocument = identificationDocumentRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(identificationDocument);
    }

    /**
     * {@code DELETE  /identification-documents/:id} : delete the "id" identificationDocument.
     *
     * @param id the id of the identificationDocument to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/identification-documents/{id}")
    public ResponseEntity<Void> deleteIdentificationDocument(@PathVariable Long id) {
        log.debug("REST request to delete IdentificationDocument : {}", id);
        identificationDocumentRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
