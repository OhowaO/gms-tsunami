package com.gms.tsunami.web.rest;

import com.gms.tsunami.domain.InviteData;
import com.gms.tsunami.repository.InviteDataRepository;
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
 * REST controller for managing {@link com.gms.tsunami.domain.InviteData}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class InviteDataResource {
    private final Logger log = LoggerFactory.getLogger(InviteDataResource.class);

    private static final String ENTITY_NAME = "inviteData";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final InviteDataRepository inviteDataRepository;

    public InviteDataResource(InviteDataRepository inviteDataRepository) {
        this.inviteDataRepository = inviteDataRepository;
    }

    /**
     * {@code POST  /invite-data} : Create a new inviteData.
     *
     * @param inviteData the inviteData to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new inviteData, or with status {@code 400 (Bad Request)} if the inviteData has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/invite-data")
    public ResponseEntity<InviteData> createInviteData(@Valid @RequestBody InviteData inviteData) throws URISyntaxException {
        log.debug("REST request to save InviteData : {}", inviteData);
        if (inviteData.getId() != null) {
            throw new BadRequestAlertException("A new inviteData cannot already have an ID", ENTITY_NAME, "idexists");
        }
        InviteData result = inviteDataRepository.save(inviteData);
        return ResponseEntity
            .created(new URI("/api/invite-data/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /invite-data} : Updates an existing inviteData.
     *
     * @param inviteData the inviteData to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated inviteData,
     * or with status {@code 400 (Bad Request)} if the inviteData is not valid,
     * or with status {@code 500 (Internal Server Error)} if the inviteData couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/invite-data")
    public ResponseEntity<InviteData> updateInviteData(@Valid @RequestBody InviteData inviteData) throws URISyntaxException {
        log.debug("REST request to update InviteData : {}", inviteData);
        if (inviteData.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        InviteData result = inviteDataRepository.save(inviteData);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, inviteData.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /invite-data} : get all the inviteData.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of inviteData in body.
     */
    @GetMapping("/invite-data")
    public List<InviteData> getAllInviteData() {
        log.debug("REST request to get all InviteData");
        return inviteDataRepository.findAll();
    }

    /**
     * {@code GET  /invite-data/:id} : get the "id" inviteData.
     *
     * @param id the id of the inviteData to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the inviteData, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/invite-data/{id}")
    public ResponseEntity<InviteData> getInviteData(@PathVariable Long id) {
        log.debug("REST request to get InviteData : {}", id);
        Optional<InviteData> inviteData = inviteDataRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(inviteData);
    }

    /**
     * {@code DELETE  /invite-data/:id} : delete the "id" inviteData.
     *
     * @param id the id of the inviteData to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/invite-data/{id}")
    public ResponseEntity<Void> deleteInviteData(@PathVariable Long id) {
        log.debug("REST request to delete InviteData : {}", id);
        inviteDataRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
