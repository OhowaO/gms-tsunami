package com.gms.tsunami.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.gms.tsunami.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

public class ResidentialPropertyTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ResidentialProperty.class);
        ResidentialProperty residentialProperty1 = new ResidentialProperty();
        residentialProperty1.setId(1L);
        ResidentialProperty residentialProperty2 = new ResidentialProperty();
        residentialProperty2.setId(residentialProperty1.getId());
        assertThat(residentialProperty1).isEqualTo(residentialProperty2);
        residentialProperty2.setId(2L);
        assertThat(residentialProperty1).isNotEqualTo(residentialProperty2);
        residentialProperty1.setId(null);
        assertThat(residentialProperty1).isNotEqualTo(residentialProperty2);
    }
}
