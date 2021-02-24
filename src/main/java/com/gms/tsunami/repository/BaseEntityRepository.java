package com.gms.tsunami.repository;

import com.gms.tsunami.domain.BaseEntity;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the BaseEntity entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BaseEntityRepository extends JpaRepository<BaseEntity, Long> {}
