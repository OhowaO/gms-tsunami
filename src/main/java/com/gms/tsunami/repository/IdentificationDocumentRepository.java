package com.gms.tsunami.repository;

import com.gms.tsunami.domain.IdentificationDocument;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the IdentificationDocument entity.
 */
@SuppressWarnings("unused")
@Repository
public interface IdentificationDocumentRepository extends JpaRepository<IdentificationDocument, Long> {}
