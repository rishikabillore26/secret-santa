package com.secretsanta.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.BeanPostProcessor;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.context.annotation.Configuration;

/**
 * Normalizes database URLs at startup.
 * Automatically adds the required 'jdbc:' prefix if the user supplies 'mysql://...',
 * extracts credentials if embedded in the URL (e.g. mysql://user:pass@host:port/db),
 * and ensures essential connection parameters (allowPublicKeyRetrieval, serverTimezone)
 * are configured for cloud MySQL hosts (such as Enzonic).
 */
@Configuration
public class DatabaseUrlNormalizer implements BeanPostProcessor {

    private static final Logger log = LoggerFactory.getLogger(DatabaseUrlNormalizer.class);

    @Override
    public Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {
        if (bean instanceof DataSourceProperties properties) {
            String rawUrl = properties.getUrl();
            if (rawUrl != null && !rawUrl.isBlank()) {
                String normalized = normalize(rawUrl, properties);
                if (!normalized.equals(rawUrl)) {
                    log.info("Auto-corrected database URL format from '{}' to '{}'", rawUrl, normalized);
                    properties.setUrl(normalized);
                }
            }
        }
        return bean;
    }

    public static String normalize(String rawUrl, DataSourceProperties properties) {
        if (rawUrl == null) return null;
        String url = rawUrl.trim();

        // 1. If it starts with mysql://, prepend jdbc:
        if (url.startsWith("mysql://")) {
            url = "jdbc:" + url;
        }

        // 2. Extract embedded credentials if present (e.g. jdbc:mysql://username:password@host:port/dbname)
        if (url.startsWith("jdbc:mysql://")) {
            String afterPrefix = url.substring("jdbc:mysql://".length());
            int atIndex = afterPrefix.indexOf('@');
            int slashIndex = afterPrefix.indexOf('/');

            if (atIndex != -1 && (slashIndex == -1 || atIndex < slashIndex)) {
                String userInfo = afterPrefix.substring(0, atIndex);
                String rest = afterPrefix.substring(atIndex + 1);

                String[] parts = userInfo.split(":", 2);
                if (properties != null) {
                    if ((properties.getUsername() == null || properties.getUsername().isBlank()) && parts.length > 0) {
                        properties.setUsername(parts[0]);
                    }
                    if ((properties.getPassword() == null || properties.getPassword().isBlank()) && parts.length > 1) {
                        properties.setPassword(parts[1]);
                    }
                }
                url = "jdbc:mysql://" + rest;
            }

            // 3. Ensure required MySQL 8 parameters exist to prevent handshake / timezone failures
            if (!url.contains("allowPublicKeyRetrieval")) {
                url += (url.contains("?") ? "&" : "?") + "allowPublicKeyRetrieval=true";
            }
            if (!url.contains("serverTimezone")) {
                url += (url.contains("?") ? "&" : "?") + "serverTimezone=UTC";
            }
        }

        return url;
    }
}
