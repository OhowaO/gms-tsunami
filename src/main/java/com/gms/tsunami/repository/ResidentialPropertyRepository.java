package com.gms.tsunami.repository;

import com.gms.tsunami.domain.ResidentialProperty;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the ResidentialProperty entity.
 */
@Repository
public interface ResidentialPropertyRepository extends JpaRepository<ResidentialProperty, Long> {
    @Query(
        value = "select distinct residentialProperty from ResidentialProperty residentialProperty left join fetch residentialProperty.ownerIDS",
        countQuery = "select count(distinct residentialProperty) from ResidentialProperty residentialProperty"
    )
    Page<ResidentialProperty> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct residentialProperty from ResidentialProperty residentialProperty left join fetch residentialProperty.ownerIDS")
    List<ResidentialProperty> findAllWithEagerRelationships();

    @Query(
        "select residentialProperty from ResidentialProperty residentialProperty left join fetch residentialProperty.ownerIDS where residentialProperty.id =:id"
    )
    Optional<ResidentialProperty> findOneWithEagerRelationships(@Param("id") Long id);
}
