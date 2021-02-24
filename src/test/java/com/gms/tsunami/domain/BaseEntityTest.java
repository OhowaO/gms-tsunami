package com.gms.tsunami.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.gms.tsunami.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

public class BaseEntityTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(BaseEntity.class);
        BaseEntity baseEntity1 = new BaseEntity();
        baseEntity1.setId(1L);
        BaseEntity baseEntity2 = new BaseEntity();
        baseEntity2.setId(baseEntity1.getId());
        assertThat(baseEntity1).isEqualTo(baseEntity2);
        baseEntity2.setId(2L);
        assertThat(baseEntity1).isNotEqualTo(baseEntity2);
        baseEntity1.setId(null);
        assertThat(baseEntity1).isNotEqualTo(baseEntity2);
    }
}
