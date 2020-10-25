package org.jhipster.projet.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Reclamation.
 */
@Entity
@Table(name = "reclamation")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Reclamation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "description")
    private String description;

    @Column(name = "titre")
    private String titre;

    @Column(name = "created_at")
    private ZonedDateTime created_at;

    @Column(name = "created_by")
    private String created_by;

    @Column(name = "updated_at")
    private ZonedDateTime updated_at;

    @Column(name = "affected_to")
    private String affected_to;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "reclamation_nm_etat",
               joinColumns = @JoinColumn(name = "reclamations_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "nm_etats_id", referencedColumnName = "id"))
    private Set<Nm_Etat> nm_Etats = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("")
    private Nm_TypeReclamation nm_TypeReclamation;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "reclamation_phase",
               joinColumns = @JoinColumn(name = "reclamations_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "phases_id", referencedColumnName = "id"))
    private Set<Action> phases = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public Reclamation description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTitre() {
        return titre;
    }

    public Reclamation titre(String titre) {
        this.titre = titre;
        return this;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public ZonedDateTime getCreated_at() {
        return created_at;
    }

    public Reclamation created_at(ZonedDateTime created_at) {
        this.created_at = created_at;
        return this;
    }

    public void setCreated_at(ZonedDateTime created_at) {
        this.created_at = created_at;
    }

    public String getCreated_by() {
        return created_by;
    }

    public Reclamation created_by(String created_by) {
        this.created_by = created_by;
        return this;
    }

    public void setCreated_by(String created_by) {
        this.created_by = created_by;
    }

    public ZonedDateTime getUpdated_at() {
        return updated_at;
    }

    public Reclamation updated_at(ZonedDateTime updated_at) {
        this.updated_at = updated_at;
        return this;
    }

    public void setUpdated_at(ZonedDateTime updated_at) {
        this.updated_at = updated_at;
    }

    public String getAffected_to() {
        return affected_to;
    }

    public Reclamation affected_to(String affected_to) {
        this.affected_to = affected_to;
        return this;
    }

    public void setAffected_to(String affected_to) {
        this.affected_to = affected_to;
    }

    public Set<Nm_Etat> getNm_Etats() {
        return nm_Etats;
    }

    public Reclamation nm_Etats(Set<Nm_Etat> nm_Etats) {
        this.nm_Etats = nm_Etats;
        return this;
    }

    public Reclamation addNm_Etat(Nm_Etat nm_Etat) {
        this.nm_Etats.add(nm_Etat);
        nm_Etat.getReclamations().add(this);
        return this;
    }

    public Reclamation removeNm_Etat(Nm_Etat nm_Etat) {
        this.nm_Etats.remove(nm_Etat);
        nm_Etat.getReclamations().remove(this);
        return this;
    }

    public void setNm_Etats(Set<Nm_Etat> nm_Etats) {
        this.nm_Etats = nm_Etats;
    }

    public Nm_TypeReclamation getNm_TypeReclamation() {
        return nm_TypeReclamation;
    }

    public Reclamation nm_TypeReclamation(Nm_TypeReclamation nm_TypeReclamation) {
        this.nm_TypeReclamation = nm_TypeReclamation;
        return this;
    }

    public void setNm_TypeReclamation(Nm_TypeReclamation nm_TypeReclamation) {
        this.nm_TypeReclamation = nm_TypeReclamation;
    }

    public Set<Action> getPhases() {
        return phases;
    }

    public Reclamation phases(Set<Action> actions) {
        this.phases = actions;
        return this;
    }

    public Reclamation addPhase(Action action) {
        this.phases.add(action);
        action.getPhases().add(this);
        return this;
    }

    public Reclamation removePhase(Action action) {
        this.phases.remove(action);
        action.getPhases().remove(this);
        return this;
    }

    public void setPhases(Set<Action> actions) {
        this.phases = actions;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Reclamation reclamation = (Reclamation) o;
        if (reclamation.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), reclamation.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Reclamation{" +
            "id=" + getId() +
            ", description='" + getDescription() + "'" +
            ", titre='" + getTitre() + "'" +
            ", created_at='" + getCreated_at() + "'" +
            ", created_by='" + getCreated_by() + "'" +
            ", updated_at='" + getUpdated_at() + "'" +
            ", affected_to='" + getAffected_to() + "'" +
            "}";
    }
}
