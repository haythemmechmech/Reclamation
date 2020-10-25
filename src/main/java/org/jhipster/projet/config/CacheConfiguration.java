package org.jhipster.projet.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import io.github.jhipster.config.jcache.BeanClassLoaderAwareJCacheRegionFactory;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(org.jhipster.projet.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(org.jhipster.projet.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(org.jhipster.projet.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(org.jhipster.projet.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(org.jhipster.projet.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(org.jhipster.projet.domain.Reclamation.class.getName(), jcacheConfiguration);
            cm.createCache(org.jhipster.projet.domain.Nm_Etat.class.getName(), jcacheConfiguration);
            cm.createCache(org.jhipster.projet.domain.Reclamation.class.getName() + ".nm_Etats", jcacheConfiguration);
            cm.createCache(org.jhipster.projet.domain.Nm_Etat.class.getName() + ".reclamations", jcacheConfiguration);
            cm.createCache(org.jhipster.projet.domain.Nm_Phase.class.getName(), jcacheConfiguration);
            cm.createCache(org.jhipster.projet.domain.Nm_Phase.class.getName() + ".reclamations", jcacheConfiguration);
            cm.createCache(org.jhipster.projet.domain.Reclamation.class.getName() + ".nm_Phases", jcacheConfiguration);
            cm.createCache(org.jhipster.projet.domain.Nm_TypeReclamation.class.getName(), jcacheConfiguration);
            cm.createCache(org.jhipster.projet.domain.Action.class.getName(), jcacheConfiguration);
            cm.createCache(org.jhipster.projet.domain.Action.class.getName() + ".nm_PhaseSuivants", jcacheConfiguration);
            cm.createCache(org.jhipster.projet.domain.Nm_Phase.class.getName() + ".actions", jcacheConfiguration);
            cm.createCache(org.jhipster.projet.domain.HistoriqueReclamation.class.getName(), jcacheConfiguration);
            cm.createCache(org.jhipster.projet.domain.Reclamation.class.getName() + ".phases", jcacheConfiguration);
            cm.createCache(org.jhipster.projet.domain.Action.class.getName() + ".phases", jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
