package com.gms.tsunami.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.gms.tsunami.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

public class IdentificationDocumentTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(IdentificationDocument.class);
        IdentificationDocument identificationDocument1 = new IdentificationDocument();
        identificationDocument1.setId(1L);
        IdentificationDocument identificationDocument2 = new IdentificationDocument();
        identificationDocument2.setId(identificationDocument1.getId());
        assertThat(identificationDocument1).isEqualTo(identificationDocument2);
        identificationDocument2.setId(2L);
        assertThat(identificationDocument1).isNotEqualTo(identificationDocument2);
        identificationDocument1.setId(null);
        assertThat(identificationDocument1).isNotEqualTo(identificationDocument2);
    }
}
