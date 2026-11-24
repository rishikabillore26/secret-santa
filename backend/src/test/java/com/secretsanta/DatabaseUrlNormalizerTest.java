package com.secretsanta;

import com.secretsanta.config.DatabaseUrlNormalizer;
import org.junit.jupiter.api.Test;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class DatabaseUrlNormalizerTest {

    @Test
    void testNormalizesMysqlUrlWithoutJdbcPrefix() {
        DataSourceProperties properties = new DataSourceProperties();
        String raw = "mysql://secret-santa-skjsyj.db.enzonic.com:3306/main?sslMode=REQUIRED";
        String normalized = DatabaseUrlNormalizer.normalize(raw, properties);

        assertTrue(normalized.startsWith("jdbc:mysql://secret-santa-skjsyj.db.enzonic.com:3306/main?sslMode=REQUIRED"));
        assertTrue(normalized.contains("allowPublicKeyRetrieval=true"));
        assertTrue(normalized.contains("serverTimezone=UTC"));
    }

    @Test
    void testExtractsCredentialsAndNormalizes() {
        DataSourceProperties properties = new DataSourceProperties();
        String raw = "mysql://dbuser:secretpass@secret-santa-skjsyj.db.enzonic.com:3306/main";
        String normalized = DatabaseUrlNormalizer.normalize(raw, properties);

        assertEquals("dbuser", properties.getUsername());
        assertEquals("secretpass", properties.getPassword());
        assertTrue(normalized.startsWith("jdbc:mysql://secret-santa-skjsyj.db.enzonic.com:3306/main"));
        assertTrue(normalized.contains("allowPublicKeyRetrieval=true"));
        assertTrue(normalized.contains("serverTimezone=UTC"));
    }

    @Test
    void testDoesNotTouchH2Url() {
        DataSourceProperties properties = new DataSourceProperties();
        String raw = "jdbc:h2:mem:testdb;DB_CLOSE_DELAY=-1";
        String normalized = DatabaseUrlNormalizer.normalize(raw, properties);

        assertEquals("jdbc:h2:mem:testdb;DB_CLOSE_DELAY=-1", normalized);
    }
}
