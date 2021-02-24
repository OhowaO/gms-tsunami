package com.gms.tsunami.web.rest;

import com.gms.tsunami.domain.ResidentialProperty;
import com.gms.tsunami.repository.ResidentialPropertyRepository;
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
 * REST controller for managing {@link com.gms.tsunami.domain.ResidentialProperty}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ResidentialPropertyResource {
    private final Logger log = LoggerFactory.getLogger(ResidentialPropertyResource.class);

    private static final String ENTITY_NAME = "residentialProperty";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ResidentialPropertyRepository residentialPropertyRepository;

    public ResidentialPropertyResource(ResidentialPropertyRepository residentialPropertyRepository) {
        this.residentialPropertyRepository = residentialPropertyRepository;
    }

    /**
     * {@code POST  /residential-properties} : Create a new residentialProperty.
     *
     * @param residentialProperty the residentialProperty to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new residentialProperty, or with status {@code 400 (Bad Request)} if the residentialProperty has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/residential-properties")
    public ResponseEntity<ResidentialProperty> createResidentialProperty(@Valid @RequestBody ResidentialProperty residentialProperty)
        throws URISyntaxException {
        log.debug("REST request to save ResidentialProperty : {}", residentialProperty);
        if (residentialProperty.getId() != null) {
            throw new BadRequestAlertException("A new residentialProperty cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ResidentialProperty result = residentialPropertyRepository.save(residentialProperty);
        return ResponseEntity
            .created(new URI("/api/residential-properties/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /residential-properties} : Updates an existing residentialProperty.
     *
     * @param residentialProperty the residentialProperty to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated residentialProperty,
     * or with status {@code 400 (Bad Request)} if the residentialProperty is not valid,
     * or with status {@code 500 (Internal Server Error)} if the residentialProperty couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/residential-properties")
    public ResponseEntity<ResidentialProperty> updateResidentialProperty(@Valid @RequestBody ResidentialProperty residentialProperty)
        throws URISyntaxException {
        log.debug("REST request to update ResidentialProperty : {}", residentialProperty);
        if (residentialProperty.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ResidentialProperty result = residentialPropertyRepository.save(residentialProperty);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, residentialProperty.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /residential-properties} : get all the residentialProperties.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of residentialProperties in body.
     */
    @GetMapping("/residential-properties")
    public List<ResidentialProperty> getAllResidentialProperties(
        @RequestParam(required = false, defaultValue = "false") boolean eagerload
    ) {
        log.debug("REST request to get all ResidentialProperties");
        return residentialPropertyRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /residential-properties/:id} : get the "id" residentialProperty.
     *
     * @param id the id of the residentialProperty to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the residentialProperty, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/residential-properties/{id}")
    public ResponseEntity<ResidentialProperty> getResidentialProperty(@PathVariable Long id) {
        log.debug("REST request to get ResidentialProperty : {}", id);
        Optional<ResidentialProperty> residentialProperty = residentialPropertyRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(residentialProperty);
    }

    /**
     * {@code DELETE  /residential-properties/:id} : delete the "id" residentialProperty.
     *
     * @param id the id of the residentialProperty to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/residential-properties/{id}")
    public ResponseEntity<Void> deleteResidentialProperty(@PathVariable Long id) {
        log.debug("REST request to delete ResidentialProperty : {}", id);
        residentialPropertyRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
