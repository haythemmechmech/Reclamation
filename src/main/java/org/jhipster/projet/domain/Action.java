package org.jhipster.projet.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Action.
 */
@Entity
@Table(name = "action")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Action implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "phase_precedente")
    private String phase_precedente;

    @Column(name = "ordre")
    private String ordre;

    @Column(name = "description")
    private String description;

    @Column(name = "phase_actuelle")
    private String phase_actuelle;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "action_nm_phase_suivant",
               joinColumns = @JoinColumn(name = "actions_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "nm_phase_suivants_id", referencedColumnName = "id"))
    private Set<Nm_Phase> nm_PhaseSuivants = new HashSet<>();

    @ManyToMany(mappedBy = "phases")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Reclamation> phases = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPhase_precedente() {
        return phase_precedente;
    }

    public Action phase_precedente(String phase_precedente) {
        this.phase_precedente = phase_precedente;
        return this;
    }

    public void setPhase_precedente(String phase_precedente) {
        this.phase_precedente = phase_precedente;
    }

    public String getOrdre() {
        return ordre;
    }

    public Action ordre(String ordre) {
        this.ordre = ordre;
        return this;
    }

    public void setOrdre(String ordre) {
        this.ordre = ordre;
    }

    public String getDescription() {
        return description;
    }

    public Action description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPhase_actuelle() {
        return phase_actuelle;
    }

    public Action phase_actuelle(String phase_actuelle) {
        this.phase_actuelle = phase_actuelle;
        return this;
    }

    public void setPhase_actuelle(String phase_actuelle) {
        this.phase_actuelle = phase_actuelle;
    }

    public Set<Nm_Phase> getNm_PhaseSuivants() {
        return nm_PhaseSuivants;
    }

    public Action nm_PhaseSuivants(Set<Nm_Phase> nm_Phases) {
        this.nm_PhaseSuivants = nm_Phases;
        return this;
    }

    public Action addNm_PhaseSuivant(Nm_Phase nm_Phase) {
        this.nm_PhaseSuivants.add(nm_Phase);
        nm_Phase.getActions().add(this);
        return this;
    }

    public Action removeNm_PhaseSuivant(Nm_Phase nm_Phase) {
        this.nm_PhaseSuivants.remove(nm_Phase);
        nm_Phase.getActions().remove(this);
        return this;
    }

    public void setNm_PhaseSuivants(Set<Nm_Phase> nm_Phases) {
        this.nm_PhaseSuivants = nm_Phases;
    }

    public Set<Reclamation> getPhases() {
        return phases;
    }

    public Action phases(Set<Reclamation> reclamations) {
        this.phases = reclamations;
        return this;
    }

    public Action addPhase(Reclamation reclamation) {
        this.phases.add(reclamation);
        reclamation.getPhases().add(this);
        return this;
    }

    public Action removePhase(Reclamation reclamation) {
        this.phases.remove(reclamation);
        reclamation.getPhases().remove(this);
        return this;
    }

    public void setPhases(Set<Reclamation> reclamations) {
        this.phases = reclamations;
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
        Action action = (Action) o;
        if (action.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), action.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Action{" +
            "id=" + getId() +
            ", phase_precedente='" + getPhase_precedente() + "'" +
            ", ordre='" + getOrdre() + "'" +
            ", description='" + getDescription() + "'" +
            ", phase_actuelle='" + getPhase_actuelle() + "'" +
            "}";
    }
}
